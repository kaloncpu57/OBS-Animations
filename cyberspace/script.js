const Y_AXIS = 1;
const X_AXIS = 2;

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function Star() {
	this.x = random(-width * 0.9, width * 0.9);
  this.y = random(-height * 0.9, height * 0.9);
  this.z = random(width);
  // this.speed = map(this.z, 0, width, 9, 1);
	this.speed = 2;

  this.update = function () {
  	this.z = this.z - this.speed;
    // this.speed = map(this.z, 0, width, (width / (461 / 3)), (width / 461 * 1.5));
    if (this.z < 1) {
    	this.z = width;
      this.x = random(-width * 0.9, width * 0.9);
  		this.y = random(-height * 0.9, height * 0.9);
      // this.speed = (width / (461 / 3)) + 1;
    }
  };

  this.show = function () {
  	fill('rgba(255, 255, 255, 0.8)');
    noStroke();

    var sx = map(this.x / this.z, 0, 1, 0, width);
    var sy = map(this.y / this.z, 0, 1, 0, height);
    var r = map(this.z, 0, width, 8, 0);
    ellipse(sx, sy, r, r);
  };
}

function Horizontal(y) {
	this.y = y;
	this.yspeed = (this.y - height/2) * 0.002;
	// this.yspeed = map(this.y, height/2, height, 0.05, 1);
	// this.y += this.yspeed;

	this.update = function () {
		this.y += this.yspeed;
		this.yspeed = map(this.y, height/2, height, 0.5, 1.5);
		// if (this.y > height) {
		// 	this.y = height / 2;
		// }
	};

	this.show = function () {
		strokeWeight(4);
		strokeCap(SQUARE);
		// let fade = map(this.y, height/2, height/2 + 20, 0, 1);
		let fade = 1;
		noFill();
		stroke(`rgba(27, 109, 136, 1)`);
		// if (this.y < ((height/2) + 20)) {
		// 	stroke('rgba(27, 109, 136, 0.4)');
		// }
		line(0, this.y, width, this.y);
		// let zy = map(this.y, height/2, height, height/2, height * 0.9);
		// curve(-100, zy, 0, this.y, width, this.y, width + 100, zy);
	};
}

function Vertical(x) {
	this.x = x;
	this.y = height/2;
	this.zy = map(this.y, height/2, height, 1, 2);
	// this.zx = map(this.x, 0, width, 0 - (width), width + (width));
	this.zx = this.x;
	this.yspeed = (this.y - height/2) * 0.002;

	this.show = function () {
		strokeWeight(4);
		strokeCap(SQUARE);
		stroke(`rgba(27, 109, 136, 1)`);
		line(this.x, height/2, this.zx, this.y);
	};

	this.update = function () {
		if (this.y < height) {
			this.y += this.yspeed;
			this.yspeed = map(this.y, height/2, height, 0.5, 1.5);
			this.zy = map(this.y, height/2, height, 0, 1);
			this.zx = map(this.x, 0, width, 0 - (width * this.zy), width + (width * this.zy));
		}
	}
}

var stars = [];
var horizontals = [];
var verticals = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 400; i++) {
  	stars[i] = new Star();
  }
	// for (let j = 0; j < ((height/2)); j += 20) {
	// 	let y = (height / 2) + j;
	// 	horizontals.push(new Horizontal(y));
	// }
	horizontals.push(new Horizontal(height/2));
	for (let k = 0; k < width; k += 40) {
		verticals.push(new Vertical(k));
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

function draw() {
	background('rgba(0, 0, 0, 1)');
	stroke("#1B6D88");
	if (frameCount % 40 === 0) {
		horizontals.push(new Horizontal(height/2));
	}
	for (let j = horizontals.length - 1; j >= 0; j--) {
		horizontals[j].show();
		horizontals[j].update();
		if (horizontals[j].y > height) {
			horizontals.splice(j, 1);
		}
	}
	for (let k = verticals.length - 1; k >=0; k--) {
		verticals[k].update();
		verticals[k].show();
	}
	let c1 = color('rgba(0, 0, 0, 1)');
	let c2 = color('rgba(0, 0, 0, 0)');
	setGradient(0, height/2-10, width, height/10, c1, c2, Y_AXIS);
  translate(width/2, height/2);
  for (let i = stars.length - 1; i >= 0; i--) {
  	stars[i].update();
    stars[i].show();
  }
}
