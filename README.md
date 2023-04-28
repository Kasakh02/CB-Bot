# My first Discord Bot!

Built with JavaScript

- <strong>Functionalities</strong>:

-Deletes -* commands (e.g. -p, -skip) for Vxera bot interactions after 1 second

-Deletes Vxera messages after 5 seconds

-Changes Voice Channel name when a specific user gets online or offline

-Sends a message to a specific channel when a specific user gets online

- <strong>Commands</strong>:

  - <strong>Fun</strong>

    - ``/send-msg {user} {message}``

    Sends a message to the user, for example:

    >input: 
    >/send-msg {Kasakh} {Hello World!}
    >
    >output:
    >@Kasakh! Message from Kasakh:
    >
    >Hello World!
    
    - ``/ping``
    
    Gets the bot's ping

  - <strong>Moderation</strong>

    - ``/vc-disconnect {timer} ({user} || {voice-channel})``

    Disconnects {user} from wherever he's connected, after {timer} minutes or disconnects everyone from a {voice-channel} after {timer} minutes
  
  - <strong>Games</strong>
                          
    - ``/akinator``
             
    Well known Akinator game, he tries to guess who or what you are thinking about (character, object or animal)
  
  - <strong>Useful</strong>
                           
    - ``/help``
                           
    Replies to your message with a list of the bot's commands and functionalities

# To create a Discord Bot:

https://discord.com/developers/applications

# Useful documentation about discord.js

https://discord.js.org/

# To have your Discord Bot online 24/7:

https://discloudbot.com/
