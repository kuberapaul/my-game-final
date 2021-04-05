var gameState="wait"
var life=3;
var coins=0;

function preload(){
boyanimation=loadAnimation("boy1.png","boy2.png","boy21.png");
coinimg= loadImage("coin.png");
obimg1= loadImage("ob1.png");
roadimg=loadImage("roadimg.jpg");
}

function setup(){
	createCanvas(displayWidth-50,displayHeight-30);

	road=createSprite(displayWidth/2,displayHeight/2,500,500);
	road.velocityY=10;
	
road.addImage(roadimg);
road.scale=2.5;
boy=createSprite(displayWidth/2,displayHeight-250,100,50);
boy.addAnimation("run",boyanimation)
boy.debug=true;
boy.setCollider("rectangle",0,0,80,250);

roadleft=createSprite(displayWidth/6.5,displayHeight/2,20,height)
roadright=createSprite(displayWidth-300,displayHeight/2,20,height)
roadleft.visible=false;
roadright.visible=false;
obstaclegroup=new Group();
coingroup = new Group();

}

function draw(){

	if(gameState=="wait"){
		background("lightblue")
		text ("instructions",displayWidth-1000,100);
		if(keyDown("enter")){
			gameState="play"
		}
	}

	if(gameState=="play"){
	background("yellow");

	boy.collide(roadleft);
	boy.collide(roadright);

	if(keyIsDown(UP_ARROW)){
	//	boy.velocityY=-10
	road.velocityY=+10
	}

	boy.x=mouseX;


	if(road.y>displayHeight){
		road.y=displayHeight/2;
	}

	spawnobstacles()
	spawncoins();

	if(obstaclegroup.collide(boy)){
		life-=1;
		obstaclegroup.destroyEach();
		if(life == 0){
			gameState="over";
	
		}
	}
	drawSprites();

	if(coingroup.collide(boy)){
		coins+=1;
		coingroup.destroyEach();
	}
	fill("black");
	textSize(20);
	text("COINS: "+coins,displayWidth-250,150);

	text ("LIFELINES:" + life,displayWidth/4-300,displayHeight/6.5)
}

if(gameState=="over"){
	background("lightgreen");
	textSize(40);
	stroke ("red");
	strokeWeight(20);
	
	text ("game Over",displayWidth/2-200,displayHeight/2);
	
}
}

function spawnobstacles(){
	if(frameCount % 350 ==0){
		var obstacle=createSprite(random(displayWidth-800,displayWidth-200),0,50,50);
		obstacle.addImage(obimg1);
		obstacle.scale=0.75;
		obstacle.velocityY=5;
		obstacle.shapeColor="red";

		obstaclegroup.add(obstacle)
	}
}


function spawncoins(){
	if(frameCount % 150 ==0){
		var coin=createSprite(random(displayWidth-800,displayWidth-200),0,50,50);
		coin.addImage(coinimg);
		coin.scale=0.5;
		coin.velocityY=8;
		coin.shapeColor="green";

		coingroup.add(coin)
	}
}

