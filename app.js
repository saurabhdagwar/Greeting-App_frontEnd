 createGreetingForm = () => {
    document.getElementById("createGreeting").style.display = "block";
    document.getElementById("editGreeting").style.display = "none";
    document.getElementById("deleteGreeting").style.display = "none";
}
editGreetingForm = () =>{
    document.getElementById("editGreeting").style.display = "block";
    document.getElementById("createGreeting").style.display = "none";
    document.getElementById("deleteGreeting").style.display = "none";

}
deleteGreetingForm = () =>{
    document.getElementById("deleteGreeting").style.display = "block";
    document.getElementById("editGreeting").style.display = "none";
    document.getElementById("createGreeting").style.display = "none";
 
}
closeForm = () => {
    document.getElementById("createGreeting").style.display = "none";
    document.getElementById("editGreeting").style.display = "none";
    document.getElementById("deleteGreeting").style.display = "none";
  }
