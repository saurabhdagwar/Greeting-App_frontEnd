/***********************************************************************************
 * Execuation   : on Live Server
 * Purpose      : JavaScript program for frontend
 * @file        : app.js
 * @overview    : Check whether server is running or not
 * @module      : 1.node-fetch   2. browserify
 * @author      : Saurabh Dagwar
 * @since       : 16/11/2020
 *************************************************************************************/

const url = `http://localhost:4000/greeting`;

/**
 * @description popup windows for create, update and delete buttons
 * @function createGreetingForm to show createGreeting block
 * @function editGreetingForm to show editGreeting block
 * @function deleteGreetingForm to show deleteGreeting block
 * @function closeForm to close all blocks
 */
createGreetingForm = () => {
  let popupWindow = "";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("greeting").style.display = "block";
  popupWindow = `<h3>Create Greeting</h3>

  <label for="name"><b>Name:</b></label>
  <input type="text" placeholder="Enter Name" name="name" id="createGreetingName" required >

  <label for="message"><b>Message:</b></label>
  <input type="text" placeholder="Enter Message" name="message" id="createGreetingMessage" required>

  <button type="submit" class="btn" onclick="postGreeting()">Create Greeting</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>`;
  greetingWindow.innerHTML = popupWindow;
};
editGreetingForm = () => {
  let popupWindow = "";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("greeting").style.display = "block";
  popupWindow = `<h3>Edit Greeting</h3>

  <label for="GreetingID"><b>GreetingID:</b></label>
  <input type="text" placeholder="Enter GreetingID" id="editGreetingID" required>

  <label for="name"><b>Name:</b></label>
  <input type="text" placeholder="Enter Name" name="name" id="editGreetingName" required>

  <label for="message"><b>Message:</b></label>
  <input type="text" placeholder="Enter Message" name="message" id="editGreetingMessage" required>

  <button type="submit" class="btn" onclick="putGreeting()" >Update Greeting</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>`;
  greetingWindow.innerHTML = popupWindow;
};
deleteGreetingForm = () => {
  let popupWindow = "";
  document.getElementById("greeting").style.display = "none";
  document.getElementById("greeting").style.display = "block";
  popupWindow = ` <h3>Delete Greeting</h3>

  <label for="GreetingID"><b>GreetingID:</b></label>
  <input type="text" placeholder="Enter GreetingID" id="deleteGreetingID" required>

  <button type="submit" onclick="deleteGreeting()" class="btn">Delete Greeting</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>`;
  greetingWindow.innerHTML = popupWindow;
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
<textarea  name="G1">Id:- ${post._id}
Name:- ${post.name}
Message:- ${post.message}
Created on:- ${post.createdAt}</textarea>
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
    name: document.getElementById("createGreetingName").value,
    message: document.getElementById("createGreetingMessage").value,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description update greeting using fetch put method according with localhost and id
 * @function putGreeting show response successful if data is proper
 */
putGreeting = () => {
  let greeting = {
    name: document.getElementById("editGreetingName").value,
    message: document.getElementById("editGreetingMessage").value,
  };
  let url1 = `${url}/${document.getElementById("editGreetingID").value}`;
  fetch(url1, {
    method: "put",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description delete greeting using fetch delete method according with Greeting id
 * @function deleteGreeting show response successful if id is present and proper
 */
deleteGreeting = () => {
  let url1 = `${url}/${document.getElementById("deleteGreetingID").value}`;
  fetch(url1, { method: "delete" })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
