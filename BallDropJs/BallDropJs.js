var balls = [];
var acc = 0.2;
var h = 0.0;
var mV = 0.0;
var mX = -1.0;
var mY = -1.0;
var mouseP = false;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  //surface.setResizable(true);
  //fullScreen(P2D);
  colorMode(HSB, 360, 100, 100);
  ellipseMode(RADIUS);
  //balls = new ArrayList<Ball>();
  noStroke();
}

function draw() {
  if (mX < 0 || mY < 0) {
    mV = 0;
  } else {
    mV = sqrt(sq(mX - mouseX)+sq(mY - mouseY));
    mV = min(mV, 30);
  }
    
  background(0);
  if (mouseP == true) {
    var t = randomGaussian()/3+PI/2;
    var v = random(3, 9);
    var r = random(5, 10) + mV/1.5;
    if (random(1) < 1) {
      balls.push(new Ball(t, h, v, r));
    }
    mX = mouseX;
    mY = mouseY;
    
  }
  h++;
  h %= 360;
  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].display();
  }
  
  for (var i = balls.length-1; i >= 0; i--) {
    if (balls[i].brightness < 0) {
      balls[i].remove();
    }
  }
  
}

function mouseReleased() {
  mX = -1;
  mY = -1;
  mouseP = false;
}

function mousePressed() {
  mouseP = true;
}


function Ball(t, h, v, rad) {
    this.brightnes = 100;
    this.hu = h;
    this.yvel = -v*sin(t);
    this.xvel = v*cos(t);
    this.xpos = mouseX;
    this.ypos = mouseY;
    this.r = rad;
  
  this.update = function() {
    this.xpos += this.xvel;
    this.yvel += acc;
    this.ypos += this.yvel;
    this.hu += 4;
    this.hu %= 360;
    this.brightnes--;
  }
  
  
  this.display = function() {
    fill(this.hu, 100, this.brightnes);
    ellipse(this.xpos, this.ypos, this.r, this.r);
  }
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}