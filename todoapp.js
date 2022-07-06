var apiurl = "https://todo-app-f5e39-default-rtdb.firebaseio.com/fb.json";
var apigeturl = "https://todo-app-f5e39-default-rtdb.firebaseio.com/fb/";

function taskadd(){
     let title=document.querySelector("#exampleInput").value;
     let time=document.querySelector("#exampleInputTime").value;
     let result=addtofirebase(title,time);
     document.querySelector("#listedTodo").innerHTML +=`<div id='${name}'>
    <div id="details"><input type="checkbox" onclick="complist(this)">
    <div id="name">${title}</div>
    <div id="date">${time}</div></input></div> 
    <br>
    </div>`;
     document.querySelector("#exampleInput").value='';
     document.querySelector("#exampleInputTime").value='';
     
}

function addtofirebase(title,time){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "title":title,
  "time":time,
  "status":"Not Completed"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://todo-app-f5e39-default-rtdb.firebaseio.com/fb.json", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


}

function firebasefetch(){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://todo-app-f5e39-default-rtdb.firebaseio.com/fb.json", requestOptions)
        .then(response => response.json())
        .then( (result) => {
        for (let key in result) {
            if (result[key].status === "Not Completed") {
              document.querySelector("#listedTodo").innerHTML +=`<div id='${key}'>
              <input type="checkbox" onclick="complist(this)">   ${result[key].title}       ${result[key].time}
              <br>
              </div>`;
}
    }
});
}

function complist(e) {
    let parentElement = e.parentElement;
    let parentElementID = e.parentElement.id;
    let todo = parentElement.querySelector("#name").textContent;
    let todoapp = parentElement.querySelector("#date").textContent;
    firebaseupdate(parentElementID);
    document.querySelector("#CompletedTodo").innerHTML +=`<div id='${parentElementID}'>
    <div id="details"><input type="checkbox">
    <div id="name1">${todo}</div>
    <div id="date1">${todoapp}</div></div> 
    <br>
    </div>`;
  
    e.parentElement.remove();
  }


  function firebaseupdate(parentElementID) {
    var raw = JSON.stringify({
      status: "Completed",
    });
  
    var requestOptions = {
      method: "PATCH",
      body: raw,
    };
  
    fetch(`${apigeturl}${parentElementID}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }