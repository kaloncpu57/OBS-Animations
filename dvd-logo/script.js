let x, y;
let xspeed, yspeed;
let dvd;
let r, g, b;

function pickColor() {
  r = random(256);
  g = random(256);
  b = random(256);
}

function preload() {
  let logos = ["AnimalCrossingSymbol", "ARMSSymbol", "AssistTrophySymbol", "BalloonFightSymbol", "BanjoKazooieSymbol", "BayonettaSymbol", "CastlevaniaSymbol", "CustomStagesSymbol", "DKSymbol", "DragonQuestSymbol", "DSSymbol", "DuckHuntSymbol", "dvd_logo", "EarthboundSymbol", "FatalFurySymbol", "FinalFantasySymbol", "FindMiiSymbol", "FireEmblemSymbol", "FZeroSymbol", "Game&WatchSymbol", "IceClimberSymbol", "KidIcarusSymbol", "KingdomHeartsSymbol", "KirbySymbol", "MarioSymbol", "MegaManSymbol", "MetalGearSymbol", "metroid", "MiiSymbol", "MiiverseSymbol", "MinecraftSymbol", "Nintendo_Switch_Logo", "NintendogsSymbol", "PacManSymbol", "PikminSymbol", "PilotwingsSymbol", "pokeball", "PunchOutSymbol", "ROBSymbol", "SmashBrosSymbol", "SonicSymbol", "SpecialStagesSymbol", "SplatoonSymbol", "StarFoxSymbol", "StreetFighterSymbol", "SubspaceSymbol", "TekkenSymbol", "TomodachiSymbol", "WarioSymbol", "WiiFitSymbol", "WiiSportsSymbol", "WorldOfLightSymbol", "WreckingCrewSymbol", "XenobladeSymbol", "YoshiSymbol", "ZeldaSymbol"];
  dvd = loadImage(`logos/${logos[Math.floor(random(logos.length))]}.png`);
}

function draw() {
  clear();

  tint(r, g, b);
  image(dvd, x, y);

  x += xspeed;
  y += yspeed;

  if (x <= 0 || x + dvd.width >= width) {
    xspeed *= -1;
    pickColor();
  }
  if (y <= 0 || y + dvd.height >= height) {
    yspeed *= -1;
    pickColor();
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);

  x = Math.floor(random(50, width - dvd.width));
  y = Math.floor(random(50, height - dvd.height));
  xspeed = 1;
  yspeed = 1;

  pickColor();
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
