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
const namePattern = /^[a-zA-Z ]{4,20}$/;
const messagePattern = /^[a-zA-Z0-9@#$%^&*(){} ]{4,}$/;

/**
 * @description popup windows for create, update and delete buttons
 * @function createGreetingForm to show createGreeting block
 * @function editGreetingForm to show editGreeting block
 * @function closeForm to close all blocks
 */
createGreetingForm = () => {
  document.querySelector(".popupForm").innerHTML = `<h3>Create Greeting</h3>
    <label for="name">Name:</label>
    <input type="text" placeholder="Enter Name" name="name" autocomplete="off" id="greetingName" required/>
  
    <label for="message">Message:</label>
    <input type="text" placeholder="Enter Message" name="message" autocomplete="off" id="greetingMessage" required/>
  
    <button type="button" class="btn" onclick="postGreeting()"> Create Greeting </button>
    <button type="button" class="btn cancel" onclick="closeForm()"> Close </button> `;
  document.querySelector(".blurBackground").style.display = "flex";
};

editGreetingForm = (id) => {
  let editForm = `<h3>Edit Greeting</h3>

  <label for="name">Name:</label>
  <input type="text" placeholder="Enter Name" name="name" autocomplete="off" id="greetingName" required>

  <label for="message">Message:</label>
  <input type="text" placeholder="Enter Message" name="message" autocomplete="off" id="greetingMessage" required>

  <button type="button" class="btn" onclick="putGreeting('${id}')">Update Greeting</button>
  <button type="button" class="btn cancel"  onclick="closeForm()">Close</button>`;
  document.querySelector(".popupForm").innerHTML = editForm;
  document.querySelector(".blurBackground").style.display = "flex";
};

deleteGreetingForm = (id) => {
  let deleteForm = `<div class="deleteForm">
  <h3>Conform you want to delete Greeting</h3>

  <button type="button" class="btn" onclick="deleteGreeting('${id}')" >Delete</button>
  <button type="button" class="btn cancel" onclick="closeForm()">Close</button>
  </div>`;
  document.querySelector(".popupForm").innerHTML = deleteForm;
  document.querySelector(".blurBackground").style.display = "flex";
};

closeForm = () => {
  document.querySelector(".blurBackground").style.display = "none";
};

/**
 * @description to print cards using innerHTML
 * @param output is and array to store all greetings data
 */
const printCards = (posts) => {
  let output = "";
  posts.forEach((post) => {
    output += `<div class="card" >
<div class="box" name="G1"><a class="greetingBox" onclick="selectWork('${
      post._id
    }')"><p><span>  ${post.name} </span> 
<span> ${post.message} </span><span> Created on:- ${
      post.createdAt.split("T")[0]
    } </a> </span></p>
<button type="submit" class="deleteButton" onclick="deleteGreetingForm('${
      post._id
    }')" ><img src="./assets/delete.png">Delete </button>
<button class="editButton" onclick="editGreetingForm('${
      post._id
    }')"><img src="./assets/edit.png"> Edit </button>
</div>
</div>`;
  });
  document.getElementsByClassName("postsCards")[0].innerHTML = output;
};

/**
 * @description function is used to get all greeting in json format and call printCards
 * @returns err if any error occured
 */
getGreeting = () => {
  fetch(url)
    .then(async (response) => {
      let result = await response.json();
      printCards(result.data);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
  closeForm();
};

/**
 * @description create greeting using fetch post method
 * @function postGreeting if data is proper then print data else print err
 */
postGreeting = () => {
  let nameValidate = namePattern.test(
    document.getElementById("greetingName").value
  );
  let messageValidate = messagePattern.test(
    document.getElementById("greetingMessage").value
  );
  if (!nameValidate) {
    return false;
  }
  if (!messageValidate) {
    return false;
  }
  let greeting = {
    name: document.getElementById("greetingName").value,
    message: document.getElementById("greetingMessage").value,
  };
  fetch(url, {
    method: "POST",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      console.log(data);
      getGreeting();
    })
    .catch((err) => {
      console.log(err);
    });
  closeForm();
};

/**
 * @description update greeting using fetch put method according with localhost and id
 * @function putGreeting show response successful if data is proper
 */
putGreeting = (id) => {
  let nameValidate = namePattern.test(
    document.getElementById("greetingName").value
  );
  let messageValidate = messagePattern.test(
    document.getElementById("greetingMessage").value
  );
  if (!nameValidate) {
    return false;
  }
  if (!messageValidate) {
    return false;
  }
  let greeting = {
    name: document.getElementById("greetingName").value,
    message: document.getElementById("greetingMessage").value,
  };
  let greetingURL = `${url}/${id}`;
  fetch(greetingURL, {
    method: "put",
    body: JSON.stringify(greeting),
    headers: { "Content-Type": "application/json" },
  })
    .then((data) => {
      console.log(data);
      alert("Successfully Updated Greeting");
      getGreeting();
    })
    .catch((err) => {
      console.log(err);
    });
  closeForm();
};

/**
 * @description delete greeting using fetch delete method according with Greeting id
 * @function deleteGreeting show response successful if id is present and proper
 */
deleteGreeting = (id) => {
  let greetingURL = `${url}/${id}`;
  fetch(greetingURL, { method: "delete" })
    .then((data) => {
      console.log(data);
      alert("Successfully Deleted Greeting");
      getGreeting();
    })
    .catch((err) => {
      console.log(err);
    });
  closeForm();
};
