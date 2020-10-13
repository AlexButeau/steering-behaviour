let font;
let vehicles = [];

function preload() {
  font = loadFont('SourceSansPro-Regular.otf');
}

function setup() {
  createCanvas(800, 300);
  // textFont(font);
  // textSize(192);
  // fill(255);
  // noStroke();
  background(51);
  // text('train', 100, 200);

  let points = font.textToPoints('rainbow', 30, 200, 192); //transforms the text into a looot of coordinates (x,y) of points, stored in objects
  //array of points

  for (let i = 0; i < points.length; i++) {
    let pt = points[i];
    const vehicle = new Vehicle(pt.x, pt.y);
    vehicles.push(vehicle);
    // stroke(255, 255, 255);
    // strokeWeight(7.5);
    // point(pt.x, pt.y);
  }
}

function draw() {
  background(51);
  for (let i = 0; i < vehicles.length; i++) {
    let v = vehicles[i];
    v.behaviors();
    v.update();
    v.show();
  }
}
