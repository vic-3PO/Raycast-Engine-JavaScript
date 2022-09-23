//mapa 
const gamemap = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,0,0,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1]
    ];

//resolução
const gameWidth = 520;
const gameHeight = 400;

let pos;
let dir;
let cameraPlane;

let splats;

var knifeAttack;
var knifeStand;

let wallImages = [];

function preload(){
    wallImages = [
      loadImage('Textures/Paredes/tile000.png'),
      loadImage('Textures/Paredes/tile002.png')
  
    ]
    knifeStand = loadAnimation('Textures/Attack/tile001.png');
    knifeAttack = loadAnimation('Textures/Attack/tile000.png','Textures/Attack/tile003.png');

    gun1stand = loadAnimation('Textures/Attack/tile004.png')
    gun1Attack = loadAnimation('Textures/Attack/tile004.png','Textures/Attack/tile007.png')
    
}

function setup(){

    createCanvas(gameWidth, gameHeight);
    
    noStroke();
    
    pos = createVector(5,5);
    dir = createVector(0,-1);
    cameraPlane = createVector(0.66,0); 
   
    
    
}


function draw(){
    dir.rotate(0.01);
    cameraPlane.rotate(0.01);

    //limpa o canvas para o próximo frame
    background(190,190,255);

    //Densenha o chão
    fill(130);
    rect(0,height/2, width, height/2);

    for (let pixel=0; pixel<width; pixel++) {
        const multiplier = 2*(pixel/width)-1;
        const cameraPixel = p5.Vector.mult(cameraPlane,multiplier);
        
        const rayDir = p5.Vector.add(dir, cameraPixel);
        
        const deltaDistX = abs(1/rayDir.x);
        const deltaDistY = abs(1/rayDir.y);
        
        const mapPos = createVector(floor(pos.x), floor(pos.y));
        
        let distToSideX;
        let distToSideY;
        
        let stepX;
        let stepY;
        
        let perpendicularDist;
        
        
        if (rayDir.x < 0) {
          distToSideX = (pos.x - mapPos.x) * deltaDistX;
          stepX = -1;
        }
        else {
          distToSideX = (mapPos.x + 1 - pos.x) * deltaDistX;
          stepX = 1;
        }
        
        if (rayDir.y < 0) {
          distToSideY = (pos.y - mapPos.y) * deltaDistY;
          stepY = -1;
        }
        else {
          distToSideY = (mapPos.y + 1 - pos.y) * deltaDistY;
          stepY = 1;
        }
        
        //Cálculo dos raios e desenho
        let hit = false;
        
        let hitSide;
        
        let ddaLineSizeX = distToSideX;
        let ddaLineSizeY = distToSideY;
        
        let wallMapPos = mapPos.copy();
        
        while (hit == false) {
          if (ddaLineSizeX < ddaLineSizeY){
            wallMapPos.x += stepX;
            ddaLineSizeX += deltaDistX;
            hitSide = 0;
          }
          else {
            wallMapPos.y += stepY;
            ddaLineSizeY += deltaDistY;
            hitSide = 1;
          }
          
          if (gamemap[wallMapPos.x][wallMapPos.y] > 0) {
            hit = true;
          }
        }
        
        if (hitSide == 0) {
          perpendicularDist = abs(wallMapPos.x - pos.x + ((1-stepX)/2))/rayDir.x;
        }
        else {
          perpendicularDist = abs(wallMapPos.y - pos.y + ((1-stepY)/2))/rayDir.y;
        }
        
        let wallLineHeight = height/perpendicularDist;
        
        let lineStartY = height/2 - wallLineHeight/2;
        let lineEndY = height/2 + wallLineHeight/2;
        
        let color = hitSide ? 255 : 128;
        
        stroke(color,0,0);    
        line(pixel,lineStartY, pixel, lineEndY);    
    
}
<<<<<<< HEAD

if(mouseIsPressed == true){
  animation(gun1Attack, 260, 300);
}
else{
  animation(gun1stand, 260, 300);
  stop;
}


}
=======
}
>>>>>>> 56a398d2841e4e55ce16086f9c3b93092ac61dbb
