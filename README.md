Password-Manager
================
A chrome extension manages passwords.

Introduction
------------
Use different passwords for different websites is good.

Use strong passwords is good.

The Password-Manager generates different passwords for different websites.

Generated passwords are form of letters, numbers and special charecters.

The default password length is set to 16(some websites do not support passwords more than 16 characters), if you want a longer password you can change the default settings(see Configuration).


The Password-Manager can be used to generate or get the existing password of the visiting website.

When sign up a website, use it to generate a new password. Generated password is saved in dropbox. Next time when login into this website, use it to retrieve the password.

Generated passwords are encrypted(AES) and saved into dropbox. Both encrypt and decrypt process are runs in local machine, only encrypted passwords are transport in the net.

Passwords are linked to website url, so every website can have only one password.

Usage
-----
When register a new user, click the extension icon, input password(used to encrypt and decrypt managed passwords), click "Enter" key, it will ask you to enter the password again(passwords inputed in two times should be the same).


Dependencies
------------
* ruby
* compass
* git
* Nodejs


Local Development Setup
-----------------------
Grunt & Bower are used to manage the project.


Start working with Password-Manager:

1. install ruby and compass.

2. install git.

3. install nodejs.

4. Change to the project's root directory.

5. Install project dependencies with "npm install".

6. Fetch dependencies with "bower install".

7. Run Grunt with "grunt build".


Configuration
-------------
Edit app/scripts/common/config.js

Deploy
------
Run "grunt build", see the "dist" directory.
# password-client
