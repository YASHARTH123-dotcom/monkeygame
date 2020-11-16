
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var play=1;
var end=0;
var gameState=1;
var monkeyCollided;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyCollided=loadAnimation("sprite_0.png");
}



function setup() {
  createCanvas(400,400);
  ground=createSprite(200,360,400,10);
  ground.x=ground.width/2;
  
monkey=createSprite(150,312,20,20);
monkey.addAnimation("monkey",monkey_running);
  
  monkey.scale=0.15;
  
  monkey.setCollider("circle",0,0,250);
  monkey.debug=false;
  obstacleGroup=createGroup();
  foodGroup=createGroup();
  
  score=0;
}


function draw() {
  background(255);
  if(gameState===play){
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(keyDown("space")&&monkey.y>=80){
    monkey.velocityY=-12;   
  }
  if(monkey.isTouching(foodGroup)){
    score=score+1;
  }
 
  
  obstacles();
  fruit();
    if(monkey.isTouching(obstacleGroup)){
      gameState=end;
    }
  }
  if(gameState===end){
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
     
  }
  text("score:"+score,300,20);
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
 drawSprites(); 
}

function obstacles(){
  if (frameCount%60==0){
    obstacle=createSprite(400,325,20,20);
    obstacle.addImage("obstacle",obstacleImage);
    obstacle.scale=0.17;
    obstacle.velocityX=-4;
     obstacle.lifetime=105;
  obstacleGroup.add(obstacle);
  }
}
function fruit(){
  if(frameCount%80===0){
    banana=createSprite(400,180,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.12;
    banana.velocityX=-4;
    banana.lifetime=105;
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    foodGroup.add(banana);
  }
  
}



