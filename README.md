# Study-Buddy-A-Learning-Tool
Study Buddy is an online web platform that caters to those in need of a place to study, make use of the various tools or just chat. Study Buddy emulates the feel of a group study with your friends no matter how far you are away from them, just log in and begin with a few clicks!

This project was made using **Mongodb** for the database, **Nodejs** for the Backend, **Expressjs** for the server-side framework and **Jquery** for the frontend Javascript library. An *MEJN* stack of sorts. We have also taken the help of the popular frontend CDN, Bootstrap to help us in our endeavour. Initially, we had created a folder and initialized the express modules using the GitBash terminal and had Node preinstalled. We then proceeded to work on the code. 

We will walk you through on how to understand your Study Buddy, first things first, navigate to the master branch. You will find:
- 📁 .vscode : 
- 📁 models : 
- 📁 node-modules : A collection of modules installed using GitBash. Some examples include Express, Nodemon, Passport, SocketIO, etc. 
- 📁 public : Includes the corresponding folders:
                         1. 📁 css : Contains the CSS for each corresponding EJS file. 
                         2. 📁 images : Contains the images you see that pertain to the website. (Except the login pages, more info on that later )
                         3. 📁 js : Contains the JavaScript files that define the dynamic aspects of the website.
- 📁 routes : Contains the server-side Javascript files that help navigate the webpages from one page to the next and how they interact with the server.  
- 📁 views : Contains the EJS files that are read by the browser. *(Note : For why we use EJS and not HTML, please refer here : https://stackoverflow.com/questions/64144316/what-is-ejs-what-is-the-use-of-ejs)*

Furthermore, we use a node-module called Nodemon, because it enables us to edit code and not have to restart the server everytime we make a change to one of the files, it does it automatically for us. This helps keep the workflow efficient and conserve time.

## Starting off with the ejs files:
The **admin** and **adminlogin** ejs files are reserved for the first person that enters a particular room, he/she being the *"admin"*. Similarly the **index** and **loginpage** files are meant for the *"users"*. Incase you haven't registered, the register file allows you to enter your credentials that get stored in the Mongodb cloud. All the users or the **admin** will be able to join and meet up together if they have the same room code. Finally, the **chat** file contains the lobby or the home page where all the magic happens.

To understand the interesting aspects of each module, let us cover them one by one:
🍅 **Pomodoro Timer** : The Pomodoro timer is a modern study technique utilizing short bursts of productivity and quick breaks. We have programmed our timer to work for 25 mins and break for either 5 mins or 15 mins to conclude one cycle. The first 4 cycles are usually utilized for short breaks, while the work time stays constant throughout the process. The whole module is displayed on a stylized Bootstrap card. To add an extra layer of immersiveness, we have also included an inspirational quote generator API *(Source: https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373)* that randomly generates quotes from an array of approximately 843 quotes. We send an ajax request as demonstrated below:

 **_$.ajax(settings).done(function (response) {
            const data = JSON.parse(response);_**      *(Reference: sample.js, Line 68, 69)*
           
After the response has been parsed, we embed the quote on the card like so,

***$("#quote").html(data[randomNum].text);***      *(Reference: sample.js, Line 71)*

📋 **To-Do List** : This was probably the easiest module to develop. It is nothing but a Bootstrap modal that we had incorporated some fancy programming into to make it behave more like a To-Do List. The inclusion of features such as the *Add* and *Remove* buttons enable the user to interact with his/her tasks more efficiently, basically adding tasks and removing them akin to striking them off of an actual physical list.

