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
- 📁 views : Contains the EJS files that are read by the browser. *(Note : For why we use EJS and not HTML, please refer [this stack overflow answer](https://stackoverflow.com/questions/64144316/what-is-ejs-what-is-the-use-of-ejs))*

Furthermore, we use a node-module called Nodemon, because it enables us to edit code and not have to restart the server everytime we make a change to one of the files, it does it automatically for us. This helps keep the workflow efficient and conserve time.

## Starting off with the ejs files:

The **admin** and **adminlogin** ejs files are reserved for the first person that enters a particular room, he/she being the *"admin"*. Similarly the **index** and **loginpage** files are meant for the *"users"*. Incase you haven't registered, the register file allows you to enter your credentials that get stored in the Mongodb cloud. All the users or the **admin** will be able to join and meet up together if they have the same room code. Finally, the **chat** file contains the lobby or the home page where all the magic happens.

To understand the interesting aspects of each module, let us cover them one by one:

🔲 **Whiteboard** : A Whiteboard that not only helps you note down formulas and expressions, but also allows you to share them with your friends in the same room. The Whiteboard was implemented using a canvas, customizable colours coupled with 5 different width options, both implemented using CSS and JavaScript. The user's activity is transmitted to the others in the room using Socket.io. 

🍅 **Pomodoro Timer** : The Pomodoro timer is a modern study technique utilizing short bursts of productivity and quick breaks. We have programmed our timer to work for 25 mins and break for either 5 mins or 15 mins to conclude one cycle. The first 4 cycles are usually utilized for short breaks, while the work time stays constant throughout the process. The whole module is displayed on a stylized Bootstrap card. To add an extra layer of immersiveness, we have also included an inspirational quote generator API ([Source](https://forum.freecodecamp.org/t/free-api-inspirational-quotes-json-with-code-examples/311373)) that randomly generates quotes from an array of approximately 843 quotes. We send an ajax request as demonstrated below:

```
 $.ajax(settings).done(function (response) {
            const data = JSON.parse(response);      *(Reference: sample.js, Line 68, 69)*
```

After the response has been parsed, we embed the quote on the card like so,

```
$("#quote").html(data[randomNum].text);      *(Reference: sample.js, Line 71)*
```
➕➖ **Calculator** ✖➗: Your ever-reliable partner helping you tackle all those tough math problems. A simple, minimalistic calculator made using HTML buttons and  organized using rows. 

📋 **To-Do List** : This was probably the easiest module to develop. It is nothing but a Bootstrap modal that we had incorporated some fancy programming into to make it behave more like a To-Do List. The inclusion of features such as the *Add* and *Remove* buttons enable the user to interact with his/her tasks more efficiently, basically adding tasks and removing them akin to striking them off of an actual physical list.

🗨 **Chatbox** : Last but, certainly not the least, the module that emphasizes communication with your peers the most, the Chatbox! The module displays the names of everyone present in the room towards the left and the big white space serves as the display for the messages being shared amongst the attendees. Type out your message in the textbox, press Enter, and see how they respond.

*Interesting Note* : The login pages have the ability to change their background picture everytime you refresh the page. This is done with the help of the [Unsplash API](https://unsplash.com/developers) with its extensive library of over 1,000,000 free images. The code can be viewed in the sample2.js and sample3.js files.

```
const settings = {
    "async": true,
    "crossDomain": true,
    "contentType": 'application/json;charset=UTF-8',
    "url": "https://api.unsplash.com/photos/random/?client_id=Jvb_zosMenH0KBg3ukhA3CoHDXl1aycwBQY9LGCS2GU&orientation=landscape&query=study",
    "method": "GET"
  }

  $.ajax(settings).done(function (response) {
    $('body').css(`background-image`,`url(${response.urls.regular})`);
  });
  ```
  
  As you can see, the feed the query we want to the url and it fetches us the images that relate the the processed query, taken from the Unsplash library itself. In this case, we have given the orientation as landscape as we do not want portrait images to show up in a PC screen as the aspect ratios do not mix well and will result in warped images and the query as study, because it is an educational website after all and we want our users focused. By sending an ajax request, the background image of the webpage is then set as the fetched image. **(This example was taken from the sample2.js code, the sample3.js code contains "space" as the query. May your thirst for knowledge be as expansive as the universe, and your enthusiasm shine like the stars).** 
