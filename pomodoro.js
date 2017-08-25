var count = 0;
var running = false;
var stopped = false;
var type = "work";

function timer(){
  if(count === 0){
    countdown($(".work").text());
    type = "work"
    count ++;
  }
  else if(count%2 === 0){
    countdown($(".work").text() + ":00");
    type = "work";
  }
  else {
    countdown($(".break").text() + ":00");
    type = "break";
  }
}

function countdown(time){
  if($(".timer").text() === "0:00"){
    $(".timer").text(time);
    count++;
    if(type === "break"){
      breakSound.play();
      if(window.Notification && window.Notification.requestPermission()){
        var notification = new Notification("Break time!");
        setTimeout(notification.close.bind(notification),4000);
      }
      $(".type").text("Break");
    }
    else if(type === "work"){
      workSound.play();
      if(window.Notification && window.Notification.requestPermission()){
        var notification = new Notification("Back to work!");
        setTimeout(notification.close.bind(notification),4000);
      }
      $(".type").text("Work");
    }
  }
  else {
    var timeRemaining = $(".timer").text();
    var minsRemaining = timeRemaining.split(":")[0];
    var secsRemaining = timeRemaining.split(":")[1];
    if(secsRemaining === "00"){
      minsRemaining -= 1;
      secsRemaining = 59;
    }
    else if(secsRemaining <= 10){
      secsRemaining = "0" + (secsRemaining - 1);
    }
    else {
      secsRemaining -= 1;
    }
    $(".timer").text(minsRemaining + ":" + secsRemaining);
  }
}

$(document).ready(function(){
  if(window.Notification && window.Notification.requestPermission()){
    Notification.requestPermission().then(function(result){
      if(result === "denied"){
        alert("You will not receive alerts for the timer");
      }
    });
  }
  $(".stop").hide();
  $(".timer").text($(".work").text() + ":00");

  $(".start").click(function(){
    workSound = new Audio("work.wav");
    breakSound = new Audio("break.wav");
    workSound.play();
    workSound.pause();
    breakSound.play();
    breakSound.pause();
    if(!running){
      timerStart = setInterval(timer, 1000);
    }
    running = true;
    stopped = false;
    $(".start").hide();
    $(".stop").show();
  });

  $(".stop").click(function(){
    clearInterval(timerStart);
    running = false;
    stopped = true;
    $(".stop").hide();
    $(".start").show();
  });

  $(".reset").click(function(){
    clearInterval(timerStart);
    $(".timer").text($(".work").text() + ":00");
    count = 0;
    running = false;
    stopped = false;
    $(".stop").hide();
    $(".start").show();
    $(".type").text("Work");
  });

  $(".upwork").click(function(){
    if(!running && !stopped){
      $(".work").text(Number($(".work").text())+1);
      $(".timer").text($(".work").text() + ":00");
    }
  });

  $(".downwork").click(function(){
    if(!running && !stopped){
      if(Number($(".work").text()) >= 2){
        $(".work").text(Number($(".work").text())-1);
        $(".timer").text($(".work").text() + ":00");
      }
    }
  });

  $(".upbreak").click(function(){
    if(!running && !stopped){
      $(".break").text(Number($(".break").text())+1);
    }
  });

  $(".downbreak").click(function(){
    if(!running && !stopped){
      if(Number($(".break").text()) >= 2){
        $(".break").text(Number($(".break").text())-1);
      }
    }
  });
});
