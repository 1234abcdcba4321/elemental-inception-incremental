function canvasMouseHandler(event)
{
	panes.mouseHandler(event);
}

function canvasKeyHandler(event)
{
	panes.keyHandler(event);
}

document.addEventListener("mousemove", canvasMouseHandler);
document.addEventListener("mousedown", canvasMouseHandler);
document.addEventListener("mouseup", canvasMouseHandler);
document.addEventListener("click", canvasMouseHandler);
document.addEventListener("keydown", canvasKeyHandler);

var canvas = document.getElementById("canvasMain");
var ctxActive = canvas.getContext("2d");

function resizeCanvas()
{
	if (mainPane.centerX)
	{
		mainPane.centerX -= Math.trunc(canvas.width / 2);
		mainPane.centerY -= Math.trunc(canvas.height / 2) - 100;
	}
	canvas.width = document.body.clientWidth - 20;
	canvas.height = document.body.clientHeight - 20;
	var path = new Path2D();
	path.rect(0, 0, canvas.width, 99);
	trackerPane.boundaryPath = path;
	path = new Path2D();
	path.rect(0, 0, canvas.width, canvas.height - 100);
	mainPane.boundaryPath = path;
	path = new Path2D();
	path.rect(0, 0, canvas.width, canvas.height);
	panes.mainBoundary = path;
	if (mainPane.centerX)
	{
		mainPane.centerX += Math.trunc(canvas.width / 2);
		mainPane.centerY += Math.trunc(canvas.height / 2) - 100;
	}
	else
	{
		mainPane.centerX = Math.trunc(canvas.width / 2);
		mainPane.centerY = Math.trunc(canvas.height / 2) - 100;
	}
	trackerPane.resize();
}
var borderGlowRadius = 4;
var borderGlowTicks = 0;
var borderGlowAlpha = 1;
var borderGlowCycleTime = 240;
var borderGlowLineColor;

function draw()
{

	ctxActive.resetTransform();
	ctxActive.clearRect(0, 0, 800, 800);

	ctxActive.font = "14px Arial";
	ctxActive.textBaseline = "middle";
	ctxActive.textAlign = "center";
	ctxActive.strokeStyle = "#DDDDDD";
	ctxActive.lineWidth = 2;
	ctxActive.fillStyle = "#101010";
	ctxActive.shadowBlur = 0;
	var tempGlowCycleTime = borderGlowTicks++ % (borderGlowCycleTime + 1) / borderGlowCycleTime;
	tempGlowCycleTime *= Math.PI * 2;
	tempGlowCycleTime = (Math.sin(tempGlowCycleTime) + 1) / 2;
	ctxActive.shadowColor = "rgba(255,55,205," + tempGlowCycleTime + ")";
	borderGlowLineColor = "rgba(155,5,155," + tempGlowCycleTime + ")";
	borderGlowAlpha = tempGlowCycleTime / 2;

	for (var i = panes.list.length - 1; i >= 0; i--)
	{
		panes.list[i].draw(ctxActive);
	}
	ctxActive.globalAlpha = 1;
}

function drawNumber(ctx, num, x, y, mode = "", align = "left")
{
	ctx.save();
	ctx.textAlign = align;
	if (num < 1000 && mode == "exp")
	{
		mode = "fixed";
	}
	if (mode == "exp")
	{
		var e = 0;
		while (num >= 10)
		{
			e++;
			num /= 10;
		}
		ctx.fillText((Math.trunc(num * 100) / 100).toFixed(2) + "e" + e, x, y);
	}
	else if (mode == "fixed")
	{
		ctx.fillText((Math.trunc(num * 1000) / 1000).toFixed(3), x, y);
	}
	else
	{
		ctx.fillText(Math.trunc(num), x, y);
	}

	ctx.restore();
}
