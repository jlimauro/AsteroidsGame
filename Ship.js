// Jeffrey Limauro
// Ship.js

function Ship() {
 this.pos = createVector(width / 2, height / 2);
 this.r = 20;
 this.heading = 0;
 this.rotation = 0;
 this.velocity = createVector(0,0);
 this.isthrusting = false;
}

Ship.prototype.render = function() {
  translate(this.pos.x, this.pos.y);
  rotate(this.heading + PI/2);
  fill(0);
  stroke(255);
  triangle(-this.r, this.r, this.r, this.r, 0, -this.r); 
}

Ship.prototype.update = function() {
  if (this.isthrusting) {
    this.thrust();
  }
  this.pos.add(this.velocity);
  this.velocity.mult(0.99);
}

Ship.prototype.turn = function (angle) {
  this.heading += this.rotation; 
}

Ship.prototype.setRotation = function(a) {
  this.rotation = a;
}

Ship.prototype.thrust = function() { 
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.velocity.add(force);
}

Ship.prototype.thrusting = function(b) {
   this.isthrusting = b;
}

Ship.prototype.edges = function() {
  
  if (this.pos.x > width + this.r) {
    this.pos.x = -this.r;
  } else if (this.pos.x < -this.r) {
    this.pos.x = width + this.r;
  }
  
  if (this.pos.y > height + this.r) {
   this.pos.y = -this.r;
  } else if (this.pos.y < -this.r) {
   this.pos.y = height + this.r; 
  }
}

Ship.prototype.hits = function(asteroid) {
    var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      return true;
    } else {
      return false;
    }
  }