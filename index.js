const fs = require('fs');
const { Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token, prefix } = require('./config.json');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

client.commands = new Collection();
client.tickets = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bot is ready');
});

client.on('messageCreate', async message => {
    if (!message.guild || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);

    if (!command) return;

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Terjadi kesalahan saat menjalankan perintah!');
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'open_ticket') {
        const existingTicket = interaction.client.tickets.get(interaction.user.id);
        if (existingTicket) {
            return interaction.reply('Anda sudah memiliki ticket yang terbuka!');
        }

        // Buat ticket baru
        interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'text',
            parent: '1232005681884954624', // Ganti dengan ID kategori tempat membuat ticket
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ],
        }).then(ticketChannel => {
            interaction.client.tickets.set(interaction.user.id, ticketChannel.id);

            const embed = new MessageEmbed()
                .setTitle('Ticket')
                .setDescription('Silakan sampaikan pertanyaan atau masalah Anda di sini.')
                .addField('Cara menutup tiket:', 'Klik tombol "Tutup Ticket" di bawah ini.')
                .setColor('#ff0000')
                .setFooter('Ini adalah tiket bot');

            const closeButton = new MessageButton()
                .setCustomId('close_ticket')
                .setLabel('Tutup Ticket')
                .setStyle('DANGER');

            const row = new MessageActionRow()
                .addComponents(closeButton);

            ticketChannel.send({ embeds: [embed], components: [row] });
        }).catch(console.error);
    } else if (interaction.customId === 'close_ticket') {
        const ticketChannelId = interaction.channelId;
        if (!ticketChannelId) {
            return interaction.reply('Ticket tidak ditemukan!');
        }

        const ticketChannel = interaction.guild.channels.cache.get(ticketChannelId);
        if (!ticketChannel) {
            return interaction.reply('Ticket tidak ditemukan!');
        }

        ticketChannel.send('Ticket ditutup oleh pengguna.');
        ticketChannel.delete();
        interaction.client.tickets.delete(interaction.user.id);
    }
});

client.login(token);