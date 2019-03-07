function canvasMouseHandler(event)
{
	panes.mouseHandler(event);
	//particleGenerator.mouseHandler(event);
}

function documentMouseHandler(event)
{
	console.log(event);
}

document.addEventListener("mousemove", canvasMouseHandler);
document.addEventListener("mousedown", canvasMouseHandler);
document.addEventListener("mouseup", canvasMouseHandler);
document.addEventListener("click", canvasMouseHandler);

var canvas = document.getElementById("canvasMain");
var ctxActive = canvas.getContext("2d");

var borderGlowRadius = 5;
var borderGlowTicks = 0;

function draw()
{
	borderGlowRadius = 6 + Math.abs(borderGlowTicks++ % 60 / 60 - 0.5) * 8;

	ctxActive.resetTransform();
	ctxActive.clearRect(0, 0, 800, 800);

	ctxActive.font = "14px Arial";
	ctxActive.textBaseline = "middle";
	ctxActive.textAlign = "center";
	ctxActive.strokeStyle = "#686868";
	ctxActive.lineWidth = 2;
	ctxActive.fillStyle = "#101010";
	ctxActive.shadowColor = "#FFFFFF";
	ctxActive.shadowBlur = 0;

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
	if (mode == "exp")
	{
		var e = 0;
		while (num >= 10)
		{
			e++;
			num /= 10;
		}
		ctx.fillText((Math.trunc(num * 10) / 10).toFixed(1) + "e" + e, x, y);
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
