var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState = "PLAY";
var spookySound;
var score = 0;

function preload(){
towerImage = loadImage("tower.png"); 
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");  
ghostImage = loadImage("ghost-standing.png");  
spookySound = loadSound("spooky.wav");  
}




function setup() {
  createCanvas(600, 600);
spookySound.loop();  
  
tower = createSprite(300, 300, 40, 50);
tower.addImage(towerImage);  
tower.velocityY = 1;
  
ghost = createSprite(200, 200, 50, 50);
ghost.addImage(ghostImage);
ghost.scale = 0.3;  
  
doorGroup = new Group();
climberGroup = new Group(); 
invisibleBlockGroup = new Group();   
}

function draw() {
  background("black");
text("score:"+score, 300, 50);  
  
if(gameState === "PLAY"){

  
if(keyDown("space")){
ghost.velocityY = -5;  
}  

ghost.velocityY = ghost.velocityY + 0.5;
if(keyDown("left")){
ghost.x = ghost.x-3  
  
}  
 
  if(keyDown("right")){
ghost.x = ghost.x+3  
  
}   
  
if(tower.y> 400){
tower.y = 300;  
}  
  
if(climberGroup.isTouching(ghost)){
ghost.velocityY = 0;  
}  
 
if(invisibleBlockGroup.isTouching(ghost)){
ghost.destroy(); 
gameState = "END";
}  
  
spawndoor();  
drawSprites();  
}
if(gameState === "END"){
fill("black");
stroke("yellow");
textSize(20);  
text("GAME OVER", 230, 250);   
}  
}

function spawndoor(){
if(frameCount% 240 === 0){
door = createSprite(200, -50, 20, 40);
door.addImage(doorImage);
  
climber = createSprite(200, 10, 20, 40);
climber.addImage(climberImage);
  
invisibleBlock = createSprite(200, 15);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
  
door.x = Math.round(random(120, 400));
climber.x = door.x; 
invisibleBlock.x = door.x;  
   

invisibleBlock.debug = true;  
  
 
climber.velocityY = 1;  
door.velocityY = 1;
invisibleBlock.velocityY = 1;
  

door.lifetime = 600;
climber.lifetime = 600;
  
doorGroup.add(door);  
climberGroup.add(climber);  
invisibleBlockGroup.add(invisibleBlock);  
ghost.depth = door.depth;
ghost.depth = ghost.depth + 1;
  
  
}  

}




