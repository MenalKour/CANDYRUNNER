var bgImage,bg
var girl,girlImg
var candyGroup,ObstacleGroup
var gameState=1

var ground
var s
var girl,girlImage
var girl_running
var img1,img2,img3,img4,img5,img6
var c1,c2,c3,c4,c5,c6
var cs1,cs2,cs3,cs4,cs5,csover
function preload(){
bgImage=loadImage("candyland.jpg")
girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png")
c1=loadImage("candy.png")
c2=loadImage("cup.png")
c3=loadImage("do.png")
c4=loadImage("i.png")
c5=loadImage("pop.png")
c6=loadImage("pop2.png")
cs5=loadSound("cs5.mp3")
girlImage=loadImage("ggg.png")
img1=loadImage("1.png")
img2=loadImage("2.png")
img3=loadImage("3.png")
img4=loadImage("4.png")
img5=loadImage("5.png")
img6=loadImage("6.png")
cs1=loadSound("cs1.mp3")
cs2=loadSound("cs2.mp3")
cs3=loadSound("cs3.mp3")
cs4=loadSound("cs4.mp3")
csover=loadSound("csover.mp3")
}
function setup(){
    createCanvas(600,400)
    bg=createSprite(0,-200,800,400);
    bg.addImage(bgImage);
    bg.scale=1.5;
    bg.x=bg.width/2;
    bg.velocityX=-3.5;
    
    girl = createSprite(100,300,20,50);
    girl.addAnimation("girl_running",girl_running);
    girl.addImage("girlImage",girlImage);
    girl.scale=0.2
    //girl.scale = 0.1;
    
    ground = createSprite(400,300,800,10);
    ground.velocityX=-2;
    ground.x=ground.width/2;
    ground.visible=false;

   
    candyGroup = new Group();
    obstaclesGroup = new Group();
    
    score = 0;
    s=0;
}
 function draw(){
      
  background(255);

  if (gameState===1){ 
    girl.visible=true
    
    score = score + Math.round(getFrameRate()/60);
    
 if(ground.x<0) {
   ground.x=ground.width/2;
 }
 if(bg.x<10){
   bg.x=bg.width/2;
 }
 
   if(candyGroup.isTouching(girl)){
     var rand=Math.round(random(1,5))
     console.log(rand)
     switch(rand) {
      case 1:cs1.play()
      break;
      case 2:cs5.play()
      break;
      case 3:cs3.play()
      break;
      case 4:cs4.play()
      break;
      case 5:cs2.play()
      break;
      default:break;
     }
     candyGroup.destroyEach();
   s = s + 1;
   }
  
 
   if(keyDown("space") &&girl.y >= 100) {
     girl.velocityY = -12;
   }
   girl.velocityY = girl.velocityY + 0.8;
 
   girl.collide(ground);
   spawncandy();
   spawnObstacles();

   
 
 drawSprites();
 
 stroke("white");
 textSize(20);
 fill("black");
 text("DISTANCE: "+ score +" M", 400,50);
 stroke("white");
 textSize(20);
 fill("black");
 text("CANDIES COLLECTED: "+ s , 20,50);
  }
  if(obstaclesGroup.isTouching(girl)){ 
  gameState=2
  //csover.play()
}
else if(gameState===2){
  
 background(bgImage)
 
 bg.velocityX=0;
 girl.visible=true
 girl.collide(ground)
 candyGroup.destroyEach();
 obstaclesGroup.destroyEach();
 stroke(255)
 textSize(19)
 fill("black")
 text("GAME OVER AND YOUR DISTANCE COVERED IS "+score+"M",90,220)
 text("OOPS!!",260,180)
 text("AND CANDIES YOU COLLECTED ARE "+s,200,260)
 text("PRESS M KEY TO START AGAIN",210,300)
 if(keyDown("m")){
   reset()
 }
} 
 }
 function spawncandy() {
    //write code here to spawn the candy
    if (frameCount % 100 === 0) {
      candy = createSprite(600,250,40,10);
      candy.y = random(120,200);    
     
      candy.scale = 0.6;
      candy.velocityX = -5;
       //assign lifetime to the variable
      candy.lifetime = 300;
      girl.depth = candy.depth + 1;
      var rand=Math.round(random(1,6))
      switch(rand){
        case 1:candy.addImage(c1)
        break;
        case 2:candy.addImage(c2)
        break;
        case 3:candy.addImage(c3)
        break;
        case 4:candy.addImage(c4)
        break;
        case 5:candy.addImage(c5)
        break;
        case 6:candy.addImage(c6)
        break;
        default:break;
      }
      
      candyGroup.add(candy);
    }
  }
  
  function spawnObstacles() {
    if(frameCount % 120 === 0) {
      var obstacle = createSprite(800,280,10,40);
      obstacle.velocityX = -6;
       obstacle.y = random(250,280); 
       
      //assign scale and lifetime to the obstacle     
      obstacle.scale = 0.9;
      obstacle.lifetime = 300;
      var rand=Math.round(random(1,6))
      switch(rand){
        case 1:obstacle.addImage(img1)
        break;
        case 2:obstacle.addImage(img2)
        break;
        case 3:obstacle.addImage(img3)
        break;
        case 4:obstacle.addImage(img4)
        break;
        case 5:obstacle.addImage(img5)
        break;
        case 6:obstacle.addImage(img6)
        break;
        default:break;
      }
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }

  async function reset(){
    gameState=1
    girl.visible=true
    girl.collide(ground)
    
    score=0
   s=0
  
  bg.visible=true
    bg.velocityX=-3.5
}