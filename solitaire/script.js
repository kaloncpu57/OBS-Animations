function Card() {
  this.spawn = function () {
    this.x = random(width - 100);
    this.y = 0;

    this.xspeed = random([-10, -9, -8, -7, -6, -5, 5, 6, 7, 8, 9, 10]);
    this.yspeed = random(-20, 1);
    let suit = random(["clubs", "diamonds", "spades", "hearts"]);
    let value = Math.floor(random(1, 14));
    switch(value) {
      case 1:
        value = "ace";
        break;
      case 11:
        value = "jack";
        break;
      case 12:
        value = "queen";
        break;
      case 13:
        value = "king";
        break;
    }
    this.face = loadImage(`playing_cards/fronts/${suit}_${value}.png`);
    this.hasBounced = 0;
  };

  this.fall = function () {
    this.y = this.y + this.yspeed;
    this.yspeed += 1;
    this.x = this.x + this.xspeed;

    if (this.y >= height - 143) {
      /* Reverse y speed to bounce the card */
      if (frameCount - 1 != this.hasBounced) {
        this.yspeed *= 0.8;
        this.yspeed *= -1;
        this.hasBounced = frameCount;
      }
    }

    if (this.x < -100 || this.x > width + 100) {
      this.spawn();
    }
  };

  this.show = function () {
    image(this.face, this.x, this.y, 100, 143); //new AF
  }
}

var mainCard = new Card();

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);

  mainCard.spawn();
}

function draw() {
  if (frameCount === 0) {
    background('rgba(0, 0, 0, 0)');
  }

  mainCard.fall();
  mainCard.show();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
