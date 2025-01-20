// DrawRectangle.js
function main() {
  // Retrieve <canvas> element                                  <- (1)
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  // Get the rendering context for 2D graphics                  <- (2)
  var ctx = canvas.getContext('2d');

  //Draw a blue rectangle                                       <- (3)
  ctx.fillStyle = 'black'; // Set a blue color
  ctx.fillRect(0, 0, 400, 400); // Fill a rectangle with the color

  //draw vector
  var vector = new Vector3([2.25, 2.25, 0]);
  drawVector(vector, 'red');
  drawVector(vector, 'blue');
  
}

function drawVector(v, color){
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  var ctx = canvas.getContext('2d');
  
  var x = v.elements[0] * 20;
  var y = v.elements[1] * 20;

  ctx.strokeStyle = color;
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.lineTo( 200 + x, 200 - y);
  ctx.stroke();
}

function handleDrawEvent(){
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = 'black'; // Set a blue color
  ctx.fillRect(0, 0, 400, 400);
  var x = parseFloat(document.getElementById('xcord').value);
  var y = parseFloat(document.getElementById('ycord').value);
  var x1 = parseFloat(document.getElementById('v2xcord').value);
  var y1 = parseFloat(document.getElementById('v2ycord').value);
  const v1 = new Vector3([x, y, 0]);
  const v2 = new Vector3([x1, y1, 0]);
  drawVector(v1, "red");
  drawVector(v2, "blue");
  
}

function handleDrawOperationEvent(){
  var canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = 'black'; // Set a blue color
  ctx.fillRect(0, 0, 400, 400);

  //Read the values of the text boxes to create v1 and call drawVector(v1, "red") .  
  var x = parseFloat(document.getElementById('xcord').value);
  var y = parseFloat(document.getElementById('ycord').value);
  const v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  //Read the values of the text boxes to create v2 and call drawVector(v2, "blue") .
  var x1 = parseFloat(document.getElementById('v2xcord').value);
  var y1 = parseFloat(document.getElementById('v2ycord').value);
  const v2 = new Vector3([x1, y1, 0]);
  drawVector(v2, "blue");

  const operation = document.getElementById('operation').value;

  //read value fo selector and call Vector3 fucntion
  //var addOperator = parseFloat(document.getElementById('add').value);
  //var subOperator = parseFloat(document.getElementById('sub').value);
  //var mulOperator = parseFloat(document.getElementById('mul').value);
  //var divOperator = parseFloat(document.getElementById('div').value);
  var scalar = parseFloat(document.getElementById('scalar').value);
  //for add = green vector + or - fo mul and div draw teo green vectors v3 = v1 * s and v4  v3+ s

  //const v3 = new Vector3.add([v1, v2, 0]);
  if (operation == "add"){
    const v3 = v1.add(v2);
    drawVector(v3, "green");
  }
  else if (operation == "sub"){
    const v3 = v1.sub(v2);
    drawVector(v3, "green");
    
  }
  else if (operation == "mul"){
    const v3 = new Vector3([...v1.elements]).mul(scalar);
    const v4 = new Vector3([...v2.elements]).mul(scalar);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (operation == "div"){
    const v3 = new Vector3([...v1.elements]).div(scalar);
    const v4 = new Vector3([...v2.elements]).div(scalar);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (operation == "mag"){
    console.log("Magnitude v1: ", v1.magnitude());
    console.log("Magnitude v2: ", v2.magnitude());
  }
  else if (operation == "norm"){
    v1.normalize();
    v2.normalize();
    drawVector(v1, "green");
    drawVector(v2, "green");
  }
  else if (operation == "dot"){
    console.log("Angle: ", angleBetween(v1,v2));
  }
  else if (operation == "area"){
    console.log("Area of Triangle: ", areaTriangle(v1,v2));
  }
}

function angleBetween(v1, v2){
  const computeDot = Math.acos(Vector3.dot(v1,v2) / (v1.magnitude()* v2.magnitude()));
  const angleInDegrees = computeDot * (180 / Math.PI);
  return angleInDegrees;
}
function areaTriangle(v1, v2){
  var computeCross = Vector3.cross(v1, v2);
  console.log("cross pruct vector:", computeCross);
  //calulcate cross product
  var area = computeCross.magnitude();

  console.log(v2);
  console.log(v1);
  console.log("magitutde of cross prodcut: ", area);
  return area * 0.5;
  //return computeCross;

}

