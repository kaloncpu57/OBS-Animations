//Characters to use as drops
var charset = "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
charset = charset.split("");

//Raindrop-like objects
function Drop() {
  this.spawn = function (y, y2) {
    this.x = random(width);

    //Spread out the drops
    this.y = random(y, y2);

    /* Z value used to
    adjust size and fall speed
    for a 3D effect */
    this.z = random(0, 20);
    this.size = map(this.z, 0, 20, 9, 30);
    this.yspeed = map(this.z, 0, 20, 10, 40);
  };

  //Spread the drops out far at first
  this.spawn(-900, -10);

  this.fall = function () {
    this.y = this.y + this.yspeed;

    if (this.y > height) {
      /* Reset the drop
      spreading is not
      as important */
      this.spawn(-200, -100);
    }
  };

  this.show = function () {
    push();
    let currentX = this.x;
    let char = random(charset);
    textAlign(CENTER);
    textSize(this.size); //smaller is "farther away"
    fill("#0F0"); //green text
    if(random(0, 1) >= 0.5) {
      scale(-1, 1); //mirror some characters
      translate(-currentX, this.y);
      text(char, 0, 0);
    } else {
      text(char, this.x, this.y); //change character for each update
    }
    pop();
  }
}

var drops = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(17); //15-20 for nice fallspeed

  for (var i = 0; i < 150; i++) {
    drops[i] = new Drop();
  }
}

function draw() {
  /* Lower opacity background
  for longer trail
  (causes old characters to fade
  as new backgrounds are layered on)*/
  background('rgba(0, 0, 0, 0.2)');

  for (var i = 0; i < drops.length; i++) {
    drops[i].fall();

    /* optionally draw larger (closer)
    drops on top */
    // drops.sort(function (a, b) {
    //   return a.z - b.z;
    // });

    drops[i].show();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function askFullScreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

var fscreen = function(e) {
  if (e.keyCode == 102) {
    let canvas = document.querySelector("canvas");
    let isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
    if (!isFullscreen) {
      askFullScreen(canvas);
    } else {
      closeFullscreen();
    }
  }
}

window.addEventListener("keypress", fscreen);
