var border = 10;
var p_inc = 0.9;
var p_init = 1.2;
var max_depth = 7;
var vSplit = 0.5;
var hSplit = 0.5

function rect_(x, y, w, h) {
  rect(x+border, y+border, w - 2*border, h - 2*border);
}

var palette;

var arr = [];

class BinaryNode {
  constructor(p, dim, col, x, y, w, h) {
    //this.dim = dim;
    //this.val = val;
    //this.col = col;

    var col1 = (col + int(random(1, palette.length - 1))) % palette.length;
    var col2 = (col + int(random(1, palette.length - 1))) % palette.length;

    if (p < p_init*pow(p_inc, max_depth)) {
      p = 0;
    } else {
      p *= p_inc;
    }

    dim = (dim+1) % 2;

    if (random() < p) {
      var x1 = x;
      var x2 = x + w * hSplit;
      var y1 = y;
      var y2 = y + h * vSplit;
      var w1 = w * hSplit;
      var w2 = w;
      var h1 = h;
      var h2 = h * vSplit;
      if (dim < 1) {
        this.left = new BinaryNode(p, dim, col1, x1, y1, w1, h1);
        this.right = new BinaryNode(p, dim, col2, x2, y1, w - w1, h1);
      } else {
        this.left = new BinaryNode(p, dim, col1, x1, y1, w2, h2);
        this.right = new BinaryNode(p, dim, col2, x1, y2, w2, h - h2);
      }
      console.log("Rec call");
    } else {
      arr.push(new Rectangle(x, y, w, h, col));
    }
  }
}

function Rectangle(x, y, w, h, c) {
  this.c = c;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.target = createVector(random(-1.2*width, 1.2*width + width), 
    random(-1.2*height, 1.2*height + height));

  this.draw = function() {
    t = pow(cos(TWO_PI*frameCount*0.001 - 0.005*cos(PI*frameCount*0.001/2)*y), 4);
    fill(palette[this.c]);

    rect_(map(t, 0, 1, this.x, this.target.x), map(t, 0, 1, this.y, this.target.y), 
      this.w, this.h);
    //rect_(this.x, this.y, this.w, this.h);
  }
}

function setup() {
  l = min(window.innerWidth, window.innerHeight);
  createCanvas(window.innerWidth, window.innerHeight);
  palette  = [color("#FF530D"), color("#E82C0C"), 
    color("#E80C7A"), 
    color("#FF0DFF")]; //very red

  noStroke();
  var tree = new BinaryNode(p_init, 0, 2, width/2 - l/2, (height - l)/2, l, l);
}


function draw() {
  background(color("#000099"));

  for (let i=0; i<arr.length; i+=1) {
    arr[i].draw();
  }
}
