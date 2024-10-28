# Roblox Player Tracker

A Node.js project to monitor the activity of a Roblox group member. This tracker observes the player’s status and checks if they are playing a specified game, as configured in the data.json file. When the player joins or leaves the game, a Discord notification is sent via a webhook, as shown in the example image below.

# Table of Contents

1. [Features](#features)
2. [Set up](#set-up)
3. [Privacy & Compliance](#privacy--compliance)
4. [Class Diagram](#class-diagram)
5. [Possible updates](#possible-updates)


# Features

* Track Roblox group members: Monitors a player’s activity within Roblox, detecting when they join or leave a specific game.
* Configurable notifications: Sends alerts via Discord webhook, keeping group members informed of player activity.
* Roblox ToS Compliant: The tracker respects Roblox’s Terms of Service. Tracked players can prevent tracking by adjusting their privacy settings to restrict who can join them (e.g., "Friends only" or "No one").
  
![Example of notification]([https://i.ibb.co/2Zj2v0X/kikatue.png](https://i.ibb.co/BCdftfM/tracked-Embed.png))

# Set up

1 Clone the repository
```bash
git clone <repository-url>
```

2 Navigate to the project directory
```bash
cd roblox-player-tracker
```

3 Install dependencies:
```bash
npm install
```
Your `package.json` file should look like this :
```json
{
  "dependencies": {
    "discord.js": "^14.16.3",
    "dotenv": "^16.4.5",
    "noblox.js": "^6.0.2"
  }
}
```

4 Create a `data.json` file and configure it like so:


```json
{
    "groups" : {
        "<GROUP_ID>" : {
            "id" : <GROUP_ID>,
            "name" : "<GROUP_NAME>",
            "integration" : "<DISCORD_WEBHOOK_LINK>",
            "notify" : true,
            "pingRole" : "<DISCORD_ROLE_ID>",
            "trackedRolesets" : [<ROLESET_1>,<ROLESET_2>, etc]
        }

    },
    "trackedGames" : {
        "<GAME_ID>" : {
            "id" : <GAME_ID>,
            "name" : "<GAME_NAME>"
        }
    }

}
```

5 Create a `.env` file and configure it like so:

```
ROBLOX_COOKIE = <ROBLOX_COOKIE>
```

❗If you want to host this on a VPS, check this out: [VPS Authentication
Retrieving a .ROBLOSECURITY cookie ](https://noblox.js.org/tutorial-VPS%20Authentication.html)



# Privacy & Compliance

This project respects player privacy and adheres to Roblox’s Terms of Service. Tracked players have control over this functionality and can prevent tracking by adjusting their privacy settings:
* Friends only can join me
* No one can join me


# Class Diagram
Below is the UML Class Diagram representing the main structure of the application.

![Class Diagram](https://i.ibb.co/N2Ngz0X/uml-plr-Tracker.png)

# Possible updates
* [`GetPresences`](https://noblox.js.org/global.html#getPresences) won't work if you try it on a roleset with a lot of members
* Only one game can be used to track players for now, having multiples could be a good update
* Handle players that are in two tracked groups
