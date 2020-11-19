/***********************************************************************************
 * Execuation   : on Live Server
 * Purpose      : JavaScript program for frontend
 * @file        : app.js
 * @overview    : Check whether server is running or not
 * @module      : 1.node-fetch   2. browserify
 * @author      : Saurabh Dagwar
 * @since       : 16/11/2020
 *************************************************************************************/

const { SSL_OP_EPHEMERAL_RSA } = require("constants");

const url = `http://localhost:4000/greeting`;

/**
 * @description popup windows for create, update and delete buttons
 * @function createGreetingForm to show createGreeting block
 * @function editGreetingForm to show editGreeting block
 * @function closeForm to close all blocks
 */
createGreetingForm = () => {
  document.getElementById("greeting").style.display = "block";
  greetingWindow.innerHTML = `<h3>Create Greeting</h3>

  <label ><b>Name:</b></label>
  <input type="text" placeholder="Enter Name" autocomplete="off" id="greetingName" required >

  <label ><b>Message:</b></label>
  <input type="text" placeholder="Enter Message" autocomplete="off" id="greetingMessage" required>

  <button type="button" class="btn" onclick="postGreeting()">Create Greeting</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>`;
  
};
editGreetingForm = (id) => {
  document.getElementById("greeting").style.display = "block";
  greetingWindow.innerHTML = `<h3>Edit Greeting</h3>

  <label for="name"><b>Name:</b></label>
  <input type="text" placeholder="Enter Name" autocomplete="off" id="greetingName" required>

  <label for="message"><b>Message:</b></label>
  <input type="text" placeholder="Enter Message" autocomplete="off" id="greetingMessage" required>

  <button type="button" class="btn" onclick="putGreeting('${id}')" >Update Greeting</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>`;
};

closeForm = () => {
  document.getElementById("greeting").style.display = "none";
};
/**
 * @description to print cards using innerHTML
 * @param output is and array to store all greetings data
 */
const printCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output += `<div class="card" >
<div class="box" name="G1"><a class="greetingBox" onclick="selectWork('${post._id}')">Id:- ${post._id} <br> Name:- ${post.name} <br> 
Message:- ${post.message} <br> Created on:- ${post.createdAt}</a> <br>
<button type="submit" class="deleteButton" onclick="deleteGreeting('${post._id}')" ><img src="./assets/delete.png">Delete </button>
<button class="editButton" onclick="editGreetingForm('${post._id}')"><img src="./assets/edit.png"> Edit </button>
</div>
</div>`;
  });
  postsCards.innerHTML = output;
};

/**
 * @description function is used to get all greeting in json format and call printCards
 * @returns err if any error occured
 */
getGreeting = () => {
  fetch(url)
    .then((response) => response.json())
    .then((result) => result.data)
    .then((data) => printCards(data))
    .catch((err) => {
      return err;
    });
};
/**
 * @description create greeting using fetch post method
 * @function postGreeting if data is proper then print data else print err
 */
postGreeting = () => {
  let greeting = {
    name: document.getElementById("greetingName").value,
    message: document.getElementById("greetingMessage").value,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" }
  })
    .then((data) => {
      console.log(data);
      
    })
    .catch((err) => {
      console.log(err);
    });
    closeForm();
    sleep(2000); 
    getGreeting();
};

/**
 * @description update greeting using fetch put method according with localhost and id
 * @function putGreeting show response successful if data is proper
 */
putGreeting = (id) => {
  let greeting = {
    name: document.getElementById("greetingName").value,
    message: document.getElementById("greetingMessage").value,
  };
  let url1 = `${url}/${id}`;
  fetch(url1, {
    method: "put",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" }
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
    closeForm();
    getGreeting();
};

/**
 * @description delete greeting using fetch delete method according with Greeting id
 * @function deleteGreeting show response successful if id is present and proper
 */
deleteGreeting = (id) => {
  let url1 = `${url}/${id}`;
  fetch(url1, { method: "delete" })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
    getGreeting();
};

