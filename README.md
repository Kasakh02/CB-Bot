# My first Discord Bot!

Built with JavaScript

- <strong>Functionalities</strong>:

-Deletes -* commands (e.g. -p, -skip) for Vxera bot interactions after 1 second

-Deletes Vxera messages after 5 seconds

-Changes Voice Channel name when a specific user gets online or offline

-Sends a message to a specific channel when a specific user gets online

-Deletes duplicates of a specific message

- <strong>Commands</strong>:

  - <strong>Fun</strong>

    - ``/send-msg {user} {message}``

    Sends a message to the user, for example:

    >input:
    >
    >/send-msg {Kasakh} {Hello World!}
    >
    >output:
    >
    >@Kasakh! Message from Kasakh:
    >
    >Hello World!
    
    - ``/ping``
    
    Gets the bot's ping

  - <strong>Moderation</strong>

    - ``/vc-disconnect {timer} ({user} || {voice-channel})``

    Disconnects {user} from wherever he's connected, after {timer} minutes or disconnects everyone from a {voice-channel} after {timer} minutes. Sends a message to a specified chanel saying _*"Disconnecting {user} from wherever he might be connected after {timer}hours/minutes/seconds (LIVE timer)"*_ or _*"Disconnecting everyone from {channel} after {timer}hours/minutes/seconds (LIVE timer)"*_
  
  - <strong>Games</strong>
                          
    - ``/akinator {game-type}``
             
    Well known Akinator game, he tries to guess who or what you are thinking based on the {game-type} provided (character, object or animal)
  
  - <strong>Useful</strong>
                           
    - ``/help``
                           
    Replies to your message with a list of the bot's commands and functionalities
    
    - ``/suggest``

    Allows you to send me a suggestion about the bot (linked to a Data Base). It can be a suggestion about new features or commands, a bug report or you an suggest changes to the existing commands and functionalities
    
    - ``/weather {location} {unit}``

    This command gets the weather for a given {location} in a given unit type ({unit}). Disclaimer: It can sometimes be slow and timeout, simply wait a moment and execute the command again

# To create a Discord Bot:

https://discord.com/developers/applications

# Useful documentation about discord.js

https://discord.js.org/

# To have your Discord Bot online 24/7:

https://discloudbot.com/
