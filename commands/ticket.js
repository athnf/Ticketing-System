const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'ticket',
    description: 'Membuka ticket baru',
    execute(message) {
        const existingTicket = message.client.tickets.get(message.author.id);
        if (existingTicket) {
            return message.channel.send('Anda sudah memiliki ticket yang terbuka!');
        }

        const openEmbed = new MessageEmbed()
            .setTitle('Buka Ticket')
            .setDescription('Klik tombol di bawah ini untuk membuka ticket.')
            .addField('Bagaimana cara membuka tiket?', 'Klik tombol "Buka Ticket" di bawah ini untuk membuat tiket baru.')
            .setColor('#00ff00')
            .setFooter('Ini adalah tiket bot');

        const openButton = new MessageButton()
            .setCustomId('open_ticket')
            .setLabel('Buka Ticket')
            .setStyle('PRIMARY');

        const row = new MessageActionRow()
            .addComponents(openButton);

        message.reply({ embeds: [openEmbed], components: [row] });
    },
};
