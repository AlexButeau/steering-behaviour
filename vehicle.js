function Vehicle(x, y) {
  // this.pos = createVector(x, y); //it starts at the target position
  this.pos = createVector(random(width), random(height));
  this.vel = p5.Vector.random2D(); //create a random velocity
  this.acc = createVector(); //acceleration
  this.target = createVector(x, y); //this is the target position
  this.r = 8; //size, radius
  this.maxspeed = 8;
  this.maxforce = 0.8;
}

Vehicle.prototype.behaviors = function () {
  let arrive = this.arrive(this.target);
  let mouse = createVector(mouseX, mouseY); //mouse location
  let flee = this.flee(mouse); //fleeing FROM the mouse

  arrive.mult(1);
  flee.mult(5); //the fleeing force is much stronger than the arriving force
  this.applyForce(arrive);
  this.applyForce(flee);
};

Vehicle.prototype.applyForce = function (f) {
  this.acc.add(f);
};

Vehicle.prototype.update = function () {
  this.pos.add(this.vel); //velocity changing position
  this.vel.add(this.acc); //acceleration changing velocity
  this.acc.mult(0); //clear the acceleration after the update
};

Vehicle.prototype.show = function () {
  stroke(255, 255, 255);
  strokeWeight(7.5);
  point(this.pos.x, this.pos.y);
};

Vehicle.prototype.arrive = function (target) {
  let desired = p5.Vector.sub(target, this.pos); //this creates a vector that is the substraction of target and position
  let d = desired.mag(); //magnitude of the desired vector, so how far the vehicle is of the target
  let speed = this.maxspeed;
  if (d < 100) {
    speed = map(d, 0, 100, 0, this.maxspeed); //creates a gradient ?
  }
  desired.setMag(speed);
  let steer = p5.Vector.sub(desired, this.vel); //substraction of the desired vector and the velocity = steering
  steer.limit(this.maxforce);
  return steer; //we calculate that force and return it
};

Vehicle.prototype.flee = function (target) {
  let desired = p5.Vector.sub(target, this.pos); //this creates a vector that is the substraction of target and position
  let d = desired.mag(); //size of the vector
  if (d < 50) {
    desired.setMag(this.maxspeed);
    desired.mult(-1); //fleeing from the mouse
    let steer = p5.Vector.sub(desired, this.vel); //substraction of the desired vector and the velocity = steering
    steer.limit(this.maxforce);
    return steer; //we calculate that force and return it
  } else {
    return createVector(0, 0);
  }
};
