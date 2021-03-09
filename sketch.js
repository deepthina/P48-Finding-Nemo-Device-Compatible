const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var bckImage, bck, bck2, bckImage2;

var nemo, nemoImage;

var marlin, marlinImage;

var net, netImage, syndney, sydneyImage, sydneyCityImage;

var sharkImage, jellyImage, octopusImage;

var sharkGroup, jellyGroup, octopusGroup;

var gameOver, gameOverImage;

var restart, restartImage;

var gameState = "start";

var music;

var marlinLife = 3;

var score = 0;


localStorage["HighestScore"] = 0;

function preload() {

  bckImage = loadImage("images/bck1.jpg");
  nemoImage = loadImage("images/nemo.png");
  sydneyImage = loadImage("images/Sydney.png");
  sydneyCityImage= loadImage("images/sydneyCity.png");
  sharkImage = loadImage("images/shark.png");
  jellyImage = loadImage("images/jelly.png");
  octopusImage = loadImage("images/octopus.png");
  marlinImage = loadImage('images/marlin.png');
  netImage = loadImage("images/net.png");
  gameOverImage = loadImage("images/gameOver.jpg");
  restartImage = loadImage("images/restart.png");


  music = loadSound("sounds/bensound-funkyelement.mp3");

}

function setup() {
  createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  bck = createSprite(width / 2, height / 2, width, height);
  bck.shapeColor = rgb(0, 83, 203);
  bck.addImage("bckImage", bckImage);
  bck.scale = 1.6;

  bck2 = createSprite(400, 500, width, height);
  bck2.shapeColor = rgb(0, 83, 203);
  bck2.addImage("bckImage2", sydneyCityImage);
  bck2.scale = 2.2;
  bck2.visible = false;

  nemo = createSprite(550, 300);
  nemo.addImage("nemo", nemoImage);
  nemo.scale = 0.6;
  nemo.setCollider("circle", 0, 0, 10);
  nemo.visible = false;

  marlin = createSprite(400, 300);
  marlin.addImage("marlin", marlinImage);
  marlin.scale = 0.8;
  marlin.setCollider("circle", 0, 0, 10);

  net = createSprite(width - 100, 190);
  net.addImage("net", netImage);
  net.visible = false;
  net.scale = 1.3;
  net.setCollider("circle", 50, 100, 50);


  syndney = createSprite(width - 100, 160);
  syndney.addImage("syndney", sydneyImage);
  syndney.visible = false;


  gameOver = createSprite(camera.x + 300, camera.y - 100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.visible = false;

  restart = createSprite(camera.x + 300, camera.y + 200);
  restart.addImage("restart", restartImage);
  restart.visible = false;


  sharkGroup = new Group();
  jellyGroup = new Group();
  octopusGroup = new Group();

  music.loop();
}

function draw() {
  background(0, 83, 203);

  drawSprites();


  Engine.update(engine);

  //******************************************START***************************************************************************************************************************************

  if (gameState === "start") {

    bck.velocityX = -10;

    if (bck.x < 0)
      bck.x = width / 2;

    nemo.visible = true;

    textSize(30);
    fill("blue");
    text("Mario and his son Nemo are having a great day.", width / 2 - 100, height / 2);
    text("Press 'Y' to see what happens next.", width / 2 - 50, height / 2 + 100);

    if (keyDown("y")|| touches.length>0){
      gameState = "story";
      touches=[];
    }

  }

  //******************************************STORY***************************************************************************************************************************************

  if (gameState === "story") {

    bck.velocityX = -10;

    if (bck.x < 0)
      bck.x = bck.width / 2;

    nemo.visible = true;
    net.visible = true;
    syndney.visible = true;

    net.velocityX = -10;
    syndney.velocityX = -10;

    if (net.isTouching(nemo)) {

      nemo.velocityY = -10;
      net.velocityY = -10;
      syndney.velocityY = -10;
      net.velocityX = 0;
      bck.velocityX = 0;
      syndney.velocityX = 0;

      net.lifetime = 50;
      syndney.lifetime = 50;
      gameState = "story2";
    }

  }

  //******************************************STORY3***************************************************************************************************************************************

  if (gameState === "story2") {

    textSize(50);
    fill("blue");
    text("OH NO! HELP ME FIND MY SON NEMO PLEASE!!", 100, 430);
    textSize(30);
    text("Nemo has been taken to Sydney. Please help me reach there.", 300, 500);
    text("You can hide behind the octopuses and do not touch stinky jelly fishes and scary sharks!!", 100, 550);
    text("Use UP and DOWN arrow keys to move me.", 400, 600);
    text("Press 'Space' to help me.", 500, 650);

    if (keyDown("Space") || touches.length>0){
      gameState = "level1";
      touches=[];
    }
  }
  //******************************************LEVEL1***************************************************************************************************************************************

  if (gameState === "level1") {

    //if (second() === 1) {
    if (score == 100) {
      gameState = "finalWin";

    }

    textSize(30);
    fill("blue");
    text("Marlin life left: " + marlinLife, camera.x + 230, camera.y - 300);

    text("Score: " + score, camera.x + 240, camera.y - 250);

    score = score + Math.round(getFrameRate() / 60);

    bck.velocityX = -10;

    camera.x = marlin.x;
    camera.y = marlin.y;

    if (bck.x < 0)
      bck.x = bck.width / 2;


    if ((keyDown("up")|| touches.length>0) && marlin.y > -80) {
      marlin.y = marlin.y - 10;
      touches=[];
    }

    else if ((keyDown("down")|| touches.length>0) && marlin.y < height + 80) {
      marlin.y = marlin.y + 10;
      touches=[];
    }

    else if (keyDown("left")|| touches.length>0) {
      marlin.x = marlin.x - 1;
      touches=[];
    }


    spawnJellyFish();
    spawnSharks();
    spawnOctopus();

    if (octopusGroup.isTouching(marlin)) {
      if (keyDown("left")|| touches.length>0){
        marlin.x = marlin.x - 10;
        touches=[];
      }
    }

    else if (marlin.isTouching(sharkGroup) || marlin.isTouching(jellyGroup)) {
      gameState = "marlinEnd";
    }

  }


  //******************************************MARLIN END***************************************************************************************************************************************
  if (gameState === "marlinEnd") {

    textSize(30);
    fill("blue");
    text("Score: " + score, camera.x + 230, camera.y - 250);

    gameOver.x = camera.x
    gameOver.y = camera.y - 100;

    restart.x = camera.x;
    restart.y = camera.y + 200;

    marlin.velocityX = 0;
    sharkGroup.setVelocityXEach(0);
    jellyGroup.setVelocityXEach(0);

    sharkGroup.destroyEach();
    jellyGroup.destroyEach();

    bck.velocityX = 0;

    gameOver.visible = true;

    if (marlinLife > 0)
      restart.visible = true;

    music.stop();

    if (mousePressedOver(restart)|| touches.length>0) {
      touches=[];

      if (localStorage["HighestScore"] < score)
        localStorage["HighestScore"] = score;

      console.log("Highest score: " + localStorage["HighestScore"]);

      score = 0;

      if (marlinLife > 0) {
        marlinLife = marlinLife - 1;
        music.play();
      }
      else
        marlinLife = 0;

      gameOver.visible = false;
      restart.visible = false;

      gameState = "level1";
    }

  }
  //******************************************WIN END***************************************************************************************************************************************

  if (gameState === "finalWin") {


    textSize(30);
    fill("blue");
    text("Score: " + score, camera.x + 230, camera.y - 250);

    bck2.visible = true;
    bck.visible = false;
    bck.velocityX = 0;

    marlin.y=camera.y+300;
    nemo.x = marlin.x + 200;
    nemo.y = marlin.y - 20;
    nemo.visible = true;
    marlin.visible = true;

    textSize(30);
    fill("blue");
    text("Thanks for Saving us.", camera.x - 200, camera.y + 200);
  }

}
//******************************************SPAWN FUNCTIONS***************************************************************************************************************************************
function spawnSharks() {
  if (frameCount % 130 === 0) {
    var shark = createSprite(width, random(camera.y));
    shark.addImage("shark", sharkImage);
    shark.velocityX = -(10 + score / 8);
    shark.scale = 1.2;
    shark.lifetime = width / 5;
    sharkGroup.add(shark);
  }
}

function spawnJellyFish() {
  if (frameCount % 200 === 0) {
    var jelly = createSprite(width, random(camera.y));
    jelly.addImage("jelly", jellyImage);
    jelly.scale = 0.3;
    jelly.velocityX = -(10 + score / 8);
    jelly.lifetime = width / 5;
    jellyGroup.add(jelly);
  }
}

function spawnOctopus() {
  if (frameCount % 500 === 0) {
    var octopus = createSprite(width, random(camera.y));
    octopus.addImage("octopus", octopusImage);
    octopus.velocityX = -10;
    octopus.lifetime = width / 5;
    octopusGroup.add(octopus);

    octopus.depth = 3;
    marlin.depth = 2;
  }
}

