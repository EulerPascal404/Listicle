//other variables
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

function newToDoItem(itemText, completed) {
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);

    if (completed) {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
}
function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}
function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}

//add button code
var addButton = document.getElementById("add-button");
addButton.addEventListener("click", addToDoItem);

function addToDoItem() {
    var itemText = toDoEntryBox.value;
    //var itemTextTrim = itemText.trim();
    //var itemTextLength = itemTextTrim.length();
    if(itemText.trim() !== '') {
        newToDoItem(itemText, false);
    };

    
  };



//add button code
var clearButton = document.getElementById("clear-completed-button");
  clearButton.addEventListener("click", clearCompletedToDoItems);

  function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");

    while (completedItems.length > 0) {
        completedItems.item(0).remove();
    }
}



//empty button code
var emptyButton = document.getElementById("empty-button");
emptyButton.addEventListener("click", emptyList);

function emptyList() {
    var toDoItems = toDoList.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
}




//save button code      
var saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", saveList);

function saveList() {
    var toDos = [];

    for (var i = 0; i < toDoList.children.length; i++) {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };

        toDos.push(toDoInfo);

    }

    localStorage.setItem("toDos", JSON.stringify(toDos));
}
function loadList() {
    if (localStorage.getItem("toDos") != null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();

/*
var timeInSecs;
var ticker;
var start_time;
function Countdown(start) {
    this.start_time = start === undefined ? "1:00" : start ;
    this.target_id = "#timer";
    this.name = "timer";
    start_time = this.start_time;
}

Countdown.prototype.init = function () {
    this.reset();
    ticker = setInterval(this.name + '.tick()', 1000);
}

Countdown.prototype.reset = function () {
    time = this.start_time.split(":");
    this.minutes = parseInt(time[0]);
    this.seconds = parseInt(time[1]);
    this.update_target();
}

Countdown.prototype.tick = function () {
    if (this.seconds > 0 || this.minutes > 0) {
        if (this.seconds == 0) {
            this.minutes = this.minutes - 1;
            this.seconds = 59
        } else {
            this.seconds = this.seconds - 1;
        }
    }
    this.update_target()
}

Countdown.prototype.update_target = function () {
    seconds = this.seconds;
    if (seconds < 10) seconds = "0" + seconds;
    $(this.target_id).val(this.minutes + ":" + seconds)
}


var timer = new Countdown();
timer.init();


function start() {
    var s = document.getElementById("period").value;
    document.getElementById("period").disabled = true;
    startTimer(s);
}

function startTimer(secs) {
    timeInSecs = parseInt(secs);
    document.getElementById("countdown").style.color = "black";
    clearInterval(ticker);

    ticker = setInterval("tick()", 1000);
    tick(); // to start counter display right away
}

function tick() {
    var secs = timeInSecs;
    if (secs > 0) {
        timeInSecs--;
        showTime(secs);
    } else {
        timeInSecs--;
        document.getElementById("countdown").style.color = "red";
        document.getElementById("countdown").innerHTML = "You have exceeded your time by " + (hhmmss(Math.abs(timeInSecs)));
        document.getElementById("period").disabled = false;
    }
}

function showTime(secs) {
    var hours = Math.floor(secs / 3600);
    secs %= 3600;
    var mins = Math.floor(secs / 60);
    secs %= 60;
    var result = ((hours < 10) ? "0" : "") + hours + ":" + ((mins < 10) ? "0" : "") + mins + ":" + ((secs < 10) ? "0" : "") + secs;
    document.getElementById("countdown").innerHTML = result;
}

function stopwatch(btn) {
    if (btn.value == "Pause") {
        clearInterval(ticker);
        btn.value = "Resume";
    } else {
        btn.value = "Pause"
        var timer = new Countdown($('#timer').val());
        timer.init();
    }
}

function hhmmss(secs) {
    var hrs = Math.floor(secs / 3600);
    var mns = Math.floor(secs / 60) % 60;
    secs = secs % 60;
    if (hrs < 10) hrs = "0" + hrs;
    if (mns < 10) mns = "0" + mns;
    if (secs < 10) secs = "0" + secs;
    return mns + " minutes " + secs + " seconds";
}
*/
var mySeconds;
var intervalHandle;

function resetPage(){
	document.getElementById("inputArea").style.display="none";	
	
	
}
function tick(){
	var timeDisplay=document.getElementById("time");
	
	var min=Math.floor(mySeconds/60);
	var sec=mySeconds-(min*60);
	
	if (sec < 10) {
		sec="0"+sec;
	}
	
	var message=min.toString()+":"+sec;
	
	timeDisplay.innerHTML=message;
	
	if(mySeconds===0){
		alert("Time's up, did you complete all your tasks?");
		clearInterval(intervalHandle);
		resetPage();
	}
	mySeconds--;
	
	
}
function startCounter(){
	var myInput=document.getElementById("minutes").value;
	if (isNaN(myInput)){
		alert("Type a valid number please");
		return;
	}
	mySeconds=myInput*60;
	
	intervalHandle=setInterval(tick, 1000);
	
	document.getElementById("inputArea").style.display="none";
	
	
}


window.onload=function(){
	var myInput=document.createElement("input");
	myInput.setAttribute("type","text");
	myInput.setAttribute("id","minutes");
	
	var myButton=document.createElement("input");
	myButton.setAttribute("type","button");
	myButton.setAttribute("value","Start Timer");
	
	myButton.onclick=function(){
		startCounter();	
		
	}
	document.getElementById("inputArea").appendChild(myInput);
	document.getElementById("inputArea").appendChild(myButton);
	
	
}