let theta;
let rotateValue; // if the sun highlight looks a bit weird, refresh the sketch with the "play" button - bit of random generation in.
let ori;
let treeCol = [170,120,70];
let shadowCol = [50,30,20];
let sunCol = [240,180,20];
//  problem: making a copy of an array with an appended value (for alpha)
//  equating sunAlpha to sunCol makes sunAlpha a pointer to where sunCol is held in memory so any changes
//  to sunAlpha (e.g. pushing alpha value to array) would be made to sunCol (& sunAlpha would just reflect sunCol's value)
let sunAlpha = [...sunCol, 100];  // this is my workaround! (TLDR: first time making a shallow copy of an array. lol)
let weight = 9;
let rdm;

let dragX;
let dragY;
let circX;
let circY;
let rectX;
let rectY;

let leaves;
let highlights;


function setup() {
  strokeCap(SQUARE);
  createCanvas(340, 600);
  slider = createSlider(0, 1305);
  slider.size(340);
  slider.value(0);

  let button1 = createButton('leaves');
  let button2 = createButton('sunlight');

  
  rotateValue = random(-PI/4,0);
  ori = PI/4;
  dragX = width*.75;
  dragY = height*.5;
  circX = width*.4;
  circY = height*.2;
  rectX = width*.2;
  rectY = height*.9;

  leaves = true;
  highlights = true;
  button1.mousePressed(foliageToggle);
  button2.mousePressed(sunlightToggle);
}

function foliageToggle(){
    if (leaves == true){
        leaves = false;
    }else{
        leaves = true;
    }
}

function sunlightToggle(){
    if (highlights == true){
        highlights = false;
    }else{
        highlights = true;
    }
}





function keyPressed(){
  
  // spacebar
  if (keyCode === 32){
    dragX = mouseX;
    dragY = mouseY;
      }
  
  if (keyCode === SHIFT){
    circX = mouseX;
    circY = mouseY;
  }
  if (keyCode === CONTROL){
    rectX = mouseX;
    rectY = mouseY;
  }
    
}



function draw() {
  

  
  background(20,80,120);
  frameRate(30);
  let g = slider.value();
  
  push();
    fill(shadowCol);
    strokeWeight(2);
    stroke(sunCol);
    circle(circX,circY,180);
  pop();
    push();

    fill(255);
    strokeWeight(3);
    stroke(sunCol);
    circle(dragX,dragY,120);
    fill(sunAlpha);
    circle(dragX,dragY,120);
  pop();
  push();
    noStroke();
    fill(shadowCol);
    rect(rectX,rectY,280,60);
  pop();
  stroke(treeCol);
  strokeWeight(weight);
  // Let's pick an angle 0 to 90 degrees based on the mouse position
  let a = (g / width) * 90;
  // Convert it to radians
  theta = radians(a);
  
  push();
    // Start the tree from the bottom of the screen
    translate(width/2,height);
    // Draw a line 120 pixels
      stroke(shadowCol);
    line(-2, -2, -2, -120-2);
      stroke(treeCol);
    line(2,2,2,-118);
  
    // Move to the end of that line
    translate(0,-120);
    // Start the recursive branching!
    push();
    rotate(-PI/6);
    branch(80);
    pop();

    branch(80);

    push();
    rotate(PI/6);
    branch(80);
    pop();
  pop();
  
  push();
  strokeWeight(weight);
    rotate(PI/2);
    // Start the tree from the bottom of the screen
    translate(width/2,0);
  
        stroke(shadowCol);
    line(-2, -2, -2, -100-2);
      stroke(treeCol);
    line(2,2,2,-100+2);

    translate(0,-100);
    // Start the recursive branching!
    push();
    rotate(-PI/6);
    branch(60);
    pop();

    branch(60);

    push();
    rotate(PI/6);
    branch(60);
    pop();
  pop();
  

}

function branch(h) {
  // Each branch will be 2/3rds the size of the previous one
  h *= 0.66;
  strokeWeight(weight * (.012*h));
  

  // All recursive functions must have an exit condition!!!!
  // Here, ours is when the length of the branch is 4 pixels or less
  if (h > 4) {
    push();    // Save the current state of transformation (i.e. where are we now)
    rotate(theta);   // Rotate by theta
    line(0, 0, 0, -h);  // Draw the branch
    translate(0, -h); // Move to the end of the branch

    if (leaves == true){
      leaf(0,0,ori); 
    }
    branch(h);       // Ok, now call myself to draw two new branches!!
    pop();     // Whenever we get back here, we "pop" in order to restore the previous matrix state

    // Repeat the same thing, only branch off to the "left" this time!
    push();
    rotate(-theta);
    push();
    stroke(shadowCol);
    line(-1, -1, -1, -h-1);
    pop();
    line(0, 0, 0, -h);

    translate(0, -h);
    
    branch(h);
    pop();
  }
}

function leaf(xPos,yPos,ori){
  push();

  fill(100,220,80,20);
  stroke(50,100,70);
  strokeWeight(0.5);
  //rotate(random(-PI/10,PI/10)); //randomness is decided and leaves are redrawn each frame
  rotate(rotateValue);
  if (highlights == true){
  push();
      stroke(sunCol);
      rotate(ori);
      bezier( xPos,yPos,
              xPos+30,yPos-30,
              xPos-20,xPos-30,
              xPos,yPos);
  
    pop();
}
    push();
    
      rotate(-ori);
  fill(70,100,50);
      bezier( xPos,yPos,
              xPos+25,yPos-25,
              xPos-25,xPos-25,
              xPos,yPos);
  noFill();
  stroke(shadowCol);
        bezier( xPos-5,yPos-5,
              xPos+25,yPos-25,
              xPos-25,xPos-25,
              xPos,yPos);
    pop();
  
  pop();
}
