/***********************************************************************************
 * Execuation   : On Live Server
 * Purpose      : JavaScript program for frontend
 * @file        : app.js
 * @overview    : Check whether server is running or not
 * @author      : Saurabh Dagwar
 * @since       : 16/11/2020
 *************************************************************************************/

const url = `http://localhost:4000/greeting`;
const namePattern = /^[a-zA-Z ]{4,20}$/;
const messagePattern = /^[a-zA-Z0-9@#$%^&*(){}.,?/ ]{4,}$/;

/**
 * @description popup windows for create, update and delete buttons
 * @function createGreetingForm to show createGreeting block
 * @function editGreetingForm to show editGreeting block
 * @function closeForm to close all blocks
 */
createGreetingForm = () => {
  document.querySelector(".popupForm").innerHTML = `<h3>Create Greeting</h3>
    <label for="greetingName">Name:</label>
    <input type="text" class="nameInput" id="greetingName" placeholder="Enter Name" oninput="nameValidate()" name="greetingName" autocomplete="off" >
    <div id="nameText">&nbsp</div>
    <label for="greetingMessage">Message:</label>
    <input type="text" class="messageInput" id="greetingMessage" placeholder="Enter Message" oninput="messageValidate()" name="greetingMessage" autocomplete="off"  >
    <div id="messageText">&nbsp</div>
    <button type="button" class="btn" onclick="postGreeting()"> Create Greeting </button>
    <button type="button" class="btn cancel" onclick="closeForm()"> Close </button> `;
  document.querySelector(".blurBackground").style.display = "flex";
};

editGreetingForm = (id,name,message) => {
  let editForm = `<h3>Edit Greeting</h3>
  <label for="greetingName">Name:</label>
  <input type="text" class="nameInput" id="greetingName" placeholder="Enter Name" value="${name}" oninput="nameValidate()" name="greetingName" autocomplete="off" >
  <span id="nameText" >&nbsp</span>
  <label for="greetingMessage">Message:</label>
  <input type="text" class="messageInput" id="greetingMessage" placeholder="Enter Message" value="${message}" oninput="messageValidate()" name="greetingMessage" autocomplete="off"  >
  <span id="messageText">&nbsp</span>
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
<div class="box" name="G1"><div class="greetingBox" ><p><span>  ${post.name} </span> 
<span> ${post.message} </span><span> ${
      post.createdAt.split("T")[0]
    } </div> </span></p>
<div class="cardButtons">
<button class="deleteButton" onclick="deleteGreetingForm('${post._id}')" ><img src="./assets/delete.png">Delete </button>
<button class="editButton" onclick="editGreetingForm('${post._id}','${post.name}','${post.message}')"><img src="./assets/edit.png"> Edit </button>
</div>
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
    document.getElementById("greetingName").style.cssText += "display : block !important"
    return  false;
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
      alert("Successfully Created Greeting");
      getGreeting();
    })
    .catch((err) => {
      console.log(err);
      alert("Error while Creating Greeting");
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
    document.getElementById("greetingName").style.cssText += "display : block !important"
    return  false;
  }
  if (!messageValidate) {
    return false;
  }
  let greeting = {
    name: document.getElementById("greetingName").value,
    message: document.getElementById("greetingMessage").value,
  };
  let uri = `${url}/${id}`;
  fetch(uri, {
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
      alert("Error occurred while Updating Greeting");
    });
  closeForm();
};

/**
 * @description delete greeting using fetch delete method according with Greeting id
 * @function deleteGreeting show response successful if id is present and proper
 */
deleteGreeting = (id) => {
  let uri = `${url}/${id}`;
  fetch(uri, { method: "delete" })
    .then((data) => {
      console.log(data);
      alert("Successfully Deleted Greeting");
      getGreeting();
    })
    .catch((err) => {
      alert("Error occurred while Deleting Greeting");
      console.log(err);
    });
  closeForm();
};

/**
 * @description test method checks name input field according with pattern
 * @function nameValidate function continuously check name input field with proper pattern
 */
nameValidate = () => {
  let nameValidate = namePattern.test(document.getElementById("greetingName").value);
  if(nameValidate || document.getElementById("greetingName").value == "") {
    // document.querySelector(".nameInput").style.border = "2px solid #0000"
    document.getElementById("nameText").innerHTML= `&nbsp`;
  }
  else{
    // document.querySelector(".nameInput").style.border = "2px solid #ff0000"
    document.getElementById("nameText").innerHTML= `Invalid Name Input`
    document.getElementById("nameText").style.color = "#ff0000";
  }
}

/**
 * @description test method checks input field according with pattern
 * @function messageValidate function continuously check message input field with proper format
 */
messageValidate = () => {
  let messageValidate = messagePattern.test(document.getElementById("greetingMessage").value);
  if(messageValidate || document.getElementById("greetingMessage").value == "") {
    // document.querySelector(".messageInput").style.border = "2px solid #0000"  
    document.getElementById("messageText").innerHTML= `&nbsp`;
  }
  else{
    // document.querySelector(".messageInput").style.border = "2px solid #ff0000"
    document.getElementById("messageText").innerHTML= `Invalid Message Input`;
    document.getElementById("messageText").style.color = "#ff0000";
  }
}
