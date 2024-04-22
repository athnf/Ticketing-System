**Proyek Ticketing Bot Discord**

This Discord bot allows users to create and manage tickets for their Discord server.

## **Author**
- [Fircode](https://github.com/athnf)

![Kinerja Bot](https://media.discordapp.net/attachments/1216063554424406088/1232010427706376212/image.png?ex=6627e69f&is=6626951f&hm=885e6452af6d5e064b2009eb3904c826f79193289340adcff002faa6deb54fae&=&format=webp&quality=lossless&width=550&height=165)

## **Installation**

### Requirements

Make sure you have Node.js and npm installed on your system. If not, you can download them [here](https://nodejs.org/).

### Clone the Repository

Clone this repository to your system by running the following command:

git clone https://github.com/athnf/Ticketing-System.git

csharp
Copy code

### Install Dependencies

Navigate to the project directory and install dependencies by running:

npm install

css
Copy code

### Configuration

Create a `config.json` file in your project directory with the following content:

```json
{
  "token": "YOUR_DISCORD_BOT_TOKEN",
  "prefix": "!"
}
```
Make sure to replace YOUR_DISCORD_BOT_TOKEN with your Discord bot token.

Run the Bot
Start the bot by running:

Copy code
node index.js
The bot will now be active on your Discord server.

### Usage
To use the ticketing system, use the following commands:

!ticket: Opens a new ticket.
!close: Closes the current ticket (only available to the ticket owner and administrators).

### License
This project is licensed under the MIT (License).
