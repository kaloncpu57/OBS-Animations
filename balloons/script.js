let balloons = [];
let img;
let gravity = 0.05;

function pickColor() {
  return {r: random(256), g: random(256), b: random(256)};
}

function Balloon() {
  this.radius = 50;
  this.pos = createVector(60, windowHeight - 80);
  this.vel = p5.Vector.random2D().mult(2);
  this.colorDefault = pickColor();
  this.color = this.colorDefault;
  this.collidingWith = [];
  this.spawning = true;
  this.angle = 0;
  this.angleV = 0;
  this.angleA = 0;
  setTimeout(() => {
    this.spawning = false;
  }, 1500);

  this.show = function () {
    push();
    tint(this.color.r, this.color.g, this.color.b);
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    image(img, 0, 0, 100, 144);
    pop();
  };

  this.move = function () {
    this.pos.add(this.vel);
    if (this.pos.x - 50 < 0 || this.pos.x + 50 > width) {
      this.pos.sub(this.vel);
      this.vel.x *= -1;
    }
    if (this.pos.y - 72 < 0 || this.pos.y + 72 > height) {
      this.pos.sub(this.vel);
      this.vel.y *= -1;
    }
    let force = gravity * sin(this.angle);
    this.angleA = -force;
    this.angleV += this.angleA;
    this.angle += this.angleV;
    this.angleV *= 0.99;
  };

  this.collideCheck = function (n) {
    if (this.spawning) {
      return;
    }
    for (let i = n + 1; i < balloons.length; i++) {
      let pos2 = balloons[i].pos;
      let d = dist(this.pos.x, this.pos.y, pos2.x, pos2.y);
      let colliding = this.collidingWith.includes(i);
      if (d < this.radius * 2 && d >= 0) {
        if (!colliding) {
          this.collide(pos2, i, n);
          balloons[i].collide(this.pos, n);
        }
      } else if (colliding) {
        let index = this.collidingWith.indexOf(i);
        this.collidingWith.splice(index, 1);
      }
    }
  };

  this.collide = function (p, i, n) {
    rotate(0);
    let direction = this.pos.copy();
    direction.sub(p);
    this.vel.setHeading(direction.heading());
    this.collidingWith.push(i);
    this.angleV = random(-3, 3);
  }
}

function preload() {
  img = loadImage(`data:image/png;base64,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lXiaOKKoGuULWZcVzluc1UqNte7JXxjKaytprtMcRhxLSCAJETJqKKMCC1FaNVJMpGg/5uEfcvxJcsnkKoORYwFVqJAcP/gf/O7WLExNukmhGND9YtsfI0BgF2jWbfv72LabJ4D/GbjS2v5qA5j9JL3e1iJHQP82cHHd1uQ94HIHGHzSJUNyJD9NoVAA3s/om3LAwC3Qu+b21trH6QOQoa6Wb4CDQ2C0SNnrHu8Odvb275lWfz9Ub3KbB25LwgAADRhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MzU0NzhiZGYtN2JlMy00M2YzLWFlYmMtNTA2NDIwZGRmMTY2IgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmQ4MDA3OWRmLTkzNzMtNGY2OS1hYTJmLWZhZTIxMDQ3YzI1ZCIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmRjMDFmMWNlLTkzYmUtNDRkNC05OGRkLWUwNTJhZTJlYWMxNyIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjc1NzE0NzQ0NDE0MzI5IgogICBHSU1QOlZlcnNpb249IjIuMTAuMjgiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZDc5MjMxNTItNzZjMS00ZTFiLWJlZDMtOTkzZTllNjZkODg5IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAyLTA2VDEzOjE5OjA0Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PhzvYHcAAAB+UExURSxTZQAAAP///4KCgvj4+Onp6ebm5vv7+93d3U1NTVdXV+3t7VJSUvPz87i4uMXFxV9fX5+fn6enpyQkJBgYGCsrK8vLy7KyskdHR0FBQeDg4NLS0pGRkaysrHh4eJeXl3JycjY2NomJiWdnZzs7OxERER0dHWRkZBMTEygoKIkdmPsAAAABdFJOUwBA5thmAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB+cCBhQTBOWTAwEAAAK/SURBVHja7d1LbuMwEITh2hClDS/A+x90gCBBJgPElsQm+7ena5kY8oeWJT4EqKWo+O80ceLfQ7Z95ciydZ9N348bvpZGO62JP0bfDVu3RejZsHVLhY4KnLcE6NjAecHA7gUBFy8WaKOBNhnYvDINXLyIEtpooI0G2mhg0Fe3RcB5XT97pMTqnTvY+gXak2VluC/8dx8LXDA4RAKX3DhGGHDV6BoE7MtuvY8+OzLGjXHh0DnD2j8HP6aBq8fXWaDzgGmTljjgljnUBNC5wLwp6YgADi/MKWDmjH4auHWlcQNoApCz2r0K3L2YHNd8+1e71wpoCjCVdxtoDjCX9+P7x9ltwZ2+fr2Ah5MKqHM+mw10HnB2YUoA7vc9uUbSfb7is9lAJwMb3Kdb8xwM0PlAuk+X7IQCNrjPBJ9fxXftX9uBj+xOzvHbAwOI79m5h/s63GezgeV7a98B94F5H88kyD6Xr3zlK9//62twn8v3xr4G97l85SvfA1+H+waa1+A36KPmV+UrX/nKV757PvIAPGp/vHzle+wb7Mu3nv+WL9dH3UJtYhdQ5YvxdfbPD1pAlS/KR7wDDrELqPLF+QTnlW/SJzivfJM+wXnlu5AuNlCv6BOcV76ZqwME1Kv6BOfhfYLz8D7BeXif4Dy8T3Ae3ic4D+8TnJfmO/2yanb5AK+7eHWf4LyEZ/4X2/ywy5f7viQgUO/nE5yX9EI7TGuI74ybPnr/AHz/BXz/Cnz/j+VAZmuh+Ut3UwHfv38Pv/8Rvn/Ulne644AKTfRtJrwf5gEuXvg5ltBACQ3UurB1ovcPnRZqQ+C8+0LtC1t3Q6j96Wjd+SIqNZ2Me1hHcTLgvogd7/2XCd1nOM9wHgQI98Fvz2P1/tnaIRjOSwfCffDpVYf74PPTDvfBVx/lK1/5ZoHZ86vP/Nzfbx9/Cjj8H13tu6E9vqzYAAAAAElFTkSuQmCC
`);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  imageMode(CENTER);
  angleMode(DEGREES);
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      balloons[i] = new Balloon();
    }, i * 1000);
  }
}

function draw() {
  clear();
  // background('rgba(0, 0, 0, 1)');
  for (let i = 0; i < balloons.length; i++) {
    balloons[i].move();
    balloons[i].collideCheck(i);
    balloons[i].show();
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
