// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'uniform float u_Size;\n' +
  'void main() {\n' +
  ' gl_Position = a_Position;\n' +
  ' gl_PointSize = u_Size;\n' +
  //'  gl_PointSize = 10.0;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor;\n' +  // uniform変数
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' +
  '}\n';

//Global Varibales
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

function setupWebGL(){
    // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }

}

function connectVariablesToGLSL(){
    // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if (!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }


}

function convertCoord(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return ([x,y]);
}

const POINT=0;
const TRIANGLE=1;
const CIRCLE=2;
//UI Global Varibales
let g_selectionColor = [1.0,1.0,1.0,1.0];
let g_sizeSlider = 5;
let g_selectedType=POINT;
let g_segments=10;


function addActionsForHtmlUI(){
    document.getElementById('green').addEventListener('input', function() { g_selectionColor[1] = this.value/100;});
    document.getElementById('red').addEventListener('input', function() { g_selectionColor[0] = this.value/100;});
    document.getElementById('blue').addEventListener('input', function() { g_selectionColor[2] = this.value/100});
    document.getElementById('clearButton').onclick = function() { g_shapesList=[]; renderAllShapes();};

    document.getElementById('pointButton').onclick = function() { g_selectedType=POINT};
    document.getElementById('triangleButton').onclick = function() { g_selectedType=TRIANGLE};
    document.getElementById('circleButton').onclick = function() { g_selectedType=CIRCLE};
    //Shape slider
    document.getElementById('sizeSlider').addEventListener('input', function() { g_sizeSlider = this.value});
    document.getElementById('circleSlider').addEventListener('input', function() { g_segments = this.value});

    

}


function main() {
  setupWebGL();

  connectVariablesToGLSL();

  addActionsForHtmlUI();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = click;
  //canvas.onmousemove = function(ev){if (ev.button == 1) {click(ev)}};// click;
  //canvas.onmousedown = function(ev) {if (ev.button = 1) {click(ev)}};

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_shapesList = []; 







//var g_points = [];  // The array for the position of a mouse press
//var g_colors = [];  // The array to store the color of a point
//var g_sizes = [];

function renderAllShapes(){

    // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();

  }

}

function click(ev) {
  [x,y] = convertCoord(ev);

  let point;
  if (g_selectedType==POINT){
    point = new Point();
  } else if (g_selectedType==TRIANGLE){
    point = new Triangle();
  } else {
    point = new Circle();
  }
  point.position = [x,y];
  point.color = g_selectionColor.slice();
  point.size = g_sizeSlider;
  g_shapesList.push(point);

  // Store the coordinates to g_points array
  //g_points.push([x, y]);

  //g_colors.push(g_selectionColor.slice());

  //g_sizes.push(g_sizeSlider);
  // Store the coordinates to g_points array
  //if (x >= 0.0 && y >= 0.0) {      // First quadrant
 //   g_colors.push([1.0, 0.0, 0.0, 1.0]);  // Red
 // } else if (x < 0.0 && y < 0.0) { // Third quadrant
 //   g_colors.push([0.0, 1.0, 0.0, 1.0]);  // Green
 // } else {                         // Others
 //   g_colors.push([1.0, 1.0, 1.0, 1.0]);  // White
 // }

  renderAllShapes();
}