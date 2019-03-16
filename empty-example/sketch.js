function setup() {
	width = 500;
	height = 500;
	w = width;
	h = height;
	// put setup code here
	frameRate(1);
	createCanvas(width, height);
	background(0);
	angleMode(DEGREES)
}

function draw() {
	background(0);
	var iterations = random(5, 20);
	var sizeDown = w / iterations;
	for (var l = 0; l < iterations; l++) {
		createRandomShape(random(2, 15));
		w -= sizeDown;
		h -= sizeDown;
	}
	noLoop();
}

function createRandomShape(points, f)
{
	//config
	var shape = new RandomShape(points);
	shape.generateRandomCoords();
	print(shape.coords);
 	randomFill();
	shape.printShape();
	translate(width, 0);
	scale(-1, 1)
	shape.printShape();

}

function randomFill() 
{
	var color = random(10, 240);
	if (int(random(0, 1))) {
		noFill();
		stroke(color);
	} else {
		fill(color);
		stroke(color);
	}
}

function RandomShape(points)
{
	this.points = parseInt(points, 10);

	this.generateRandomCoords = function() {
		var pointsCoords = {};
		for (i = 1; i <= this.points; i++) {
			var x = random(0, w / 2) + w;
			var minYValue = 0;
			if (pointsCoords[1]) {
				minYValue = pointsCoords[i -1]['y'];
			}
			var y = random(minYValue, h - minYValue) + h;
			pointsCoords[i] = {'x': x, 'y': y};
		}
		pointsCoords[this.points + 1] = {'x': w / 2, 'y': random(0, h / 2)};
		pointsCoords[this.points + 2] = {'x': w / 2, 'y': random(w / 2, h)};
		this.coords =  pointsCoords;
	};

	this.printShape = function() {
		beginShape();
		for (i = 1; i <= Object.keys(this.coords).length; i++) {
			print(i, this.coords);
			vertex(this.coords[i]['x'], this.coords[i]['y']);
		}
		endShape(CLOSE);
	};
}