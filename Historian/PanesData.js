var regionData = {};

function preprocessRegionData()
{
	regionData.dragRegion = new cRegion(0, 0);
	regionData.dragRegion.addImage("iconDrag");
	var path = new Path2D();
	path.rect(0, 0, 16, 16);
	regionData.dragRegion.boundaryPath = path;
	regionData.dragRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mousedown")
		{
			panes.dragndrop = pane;
		}
	}

	regionData.hideRegion = new cRegion(17, 0);
	regionData.hideRegion.addImage("iconHide");
	regionData.hideRegion.boundaryPath = path;
	regionData.hideRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			if (pane.boundaryPath)
			{
				pane.hiddenPath = pane.boundaryPath;
				pane.boundaryPath = null;
			}
		}
	}

	regionData.showRegion = new cRegion(17, 0);
	regionData.showRegion.addImage("iconShow");
	regionData.showRegion.boundaryPath = path;
	regionData.showRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			if (pane.hiddenPath)
			{
				pane.boundaryPath = pane.hiddenPath;
				pane.hiddenPath = null;
			}
			if (pane.top)
			{
				var i = 0;
				while (pane.top.subPanes[i] !== pane)
				{
					i++;
				}
				while (i > 0)
				{
					i--;
					pane.top.subPanes[i + 1] = pane.top.subPanes[i];
				}
				pane.top.subPanes[i] = pane;

				var mx = 10 + pane.top.x + pane.x;
				var my = 10 + pane.top.y + pane.y;
				if (pane.top.centerX)
				{
					mx += pane.top.centerX;
					my += pane.top.centerY;
				}
				if (!pane.top.checkBoundary(mx, my, "mousemove"))
				{
					pane.x = pane.defaultX;
					pane.y = pane.defaultY;
					return;
				}
			}
		}
	}

	regionData.minRegion = new cRegion(34, 0);
	regionData.minRegion.addImage("iconMin");
	regionData.minRegion.boundaryPath = path;
	regionData.minRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			pane.subPanesMax = pane.subPanes;
			pane.subPanes = pane.subPanesMin;

			pane.subRegionsMax = pane.subRegions;
			pane.subRegions = pane.subRegionsMin;

			pane.boundaryPathMax = pane.boundaryPath;
			pane.boundaryPath = pane.boundaryPathMin;
		}
	}

	regionData.maxRegion = new cRegion(34, 0);
	regionData.maxRegion.addImage("iconMax");
	regionData.maxRegion.boundaryPath = path;
	regionData.maxRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			pane.subPanesMin = pane.subPanes;
			pane.subPanes = pane.subPanesMax;

			pane.subRegionsMin = pane.subRegions;
			pane.subRegions = pane.subRegionsMax;

			pane.boundaryPathMin = pane.boundaryPath;
			pane.boundaryPath = pane.boundaryPathMax;
			pane.boundaryPathMax = null;
		}
	}

	regionData.draggableTitleRegion = new cRegion(34, 0);
	path = new Path2D();
	path.rect(0, 0, 400, 16);
	regionData.draggableTitleRegion.boundaryPath = path;
	regionData.draggableTitleRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mousedown")
		{
			panes.dragndrop = pane;
		}
	}
	regionData.draggableTitleRegion.customDraw = function (ctx, pane)
	{
		ctx.save();
		ctx.fillStyle = ctx.strokeStyle;
		ctx.textAlign = "left";
		ctx.fillText(pane.title, 5, 8);
		ctx.restore();
	}
	regionData.draggableTitleRegionShifted = new cRegion(51, 0);
	regionData.draggableTitleRegionShifted.boundaryPath = path;
	regionData.draggableTitleRegionShifted.mouseHandler = regionData.draggableTitleRegion.mouseHandler
	regionData.draggableTitleRegionShifted.customDraw = regionData.draggableTitleRegion.customDraw;

	regionData.confirmRegion = new cRegion(17, 22);
	path = new Path2D();
	path.rect(0, 0, 55, 16);
	regionData.confirmRegion.boundaryPath = path;
	regionData.confirmRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			if (pane.costs)
			{
				if (paymentPane.isAffordable(pane.costs))
				{
					for (var i = 0; i < pane.costs.length; i++)
					{
						data.oElements[pane.costs[i].type].amount -= pane.costs[i].amount;
					}
					pane.target.paymentSuccess();
					pane.costs = null;
					machines.glowCheckCD = 0;
					machines.glowCheck();
				}
			}
		}
	}
	regionData.confirmRegion.customDraw = function (ctx, pane)
	{
		if (pane.costs)
		{
			var possible = true;
			for (var i = 0; i < pane.costs.length; i++)
			{
				possible = possible && (data.oElements[pane.costs[i].type].amount >= pane.costs[i].amount);
			}
			if (possible)
			{
				ctx.drawImage(images.buttonConfirm, 0, 0);
			}
			else
			{
				ctx.drawImage(images.buttonConfirmCrossed, 0, 0);
			}
		}

	}

	regionData.cancelRegion = new cRegion(20, 44);
	path = new Path2D();
	path.rect(0, 0, 49, 16);
	regionData.cancelRegion.addImage("buttonCancel");
	regionData.cancelRegion.boundaryPath = path;
	regionData.cancelRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			if (pane.costs)
			{
				pane.costs = null;
			}
		}
	}

	regionData.saveRegion = new cRegion(20, 58);
	path = new Path2D();
	path.rect(0, 0, 60, 16);
	regionData.saveRegion.text = locale.save;
	regionData.saveRegion.textX = 30;
	regionData.saveRegion.textY = 8;
	regionData.saveRegion.boundaryPath = path;
	regionData.saveRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			if (saveCD - s >= 60)
			{
				s = saveCD;
				savingSystem.saveData();
			}
		}
	}
	regionData.saveRegion.customDraw = function (ctx, pane)
	{
		if (saveCD - s <= 60)
		{
			ctx.save();
			ctx.globalAlpha = 1 - (saveCD - s) / 60;
			ctx.fillStyle = "#646464";
			ctx.fill(this.boundaryPath);
			ctx.restore();
		}
	}

	regionData.resetRegion = new cRegion(20, 25);
	path = new Path2D();
	path.rect(0, 0, 80, 16);
	regionData.resetRegion.text = locale.reset;
	regionData.resetRegion.textX = 40;
	regionData.resetRegion.textY = 8;
	regionData.resetRegion.boundaryPath = path;
	regionData.resetRegion.mouseHandler = function (pane, x, y, type)
	{
		if (type == "mouseup")
		{
			savingSystem.hardReset();
		}
	}
}
preprocessRegionData();

var trackerPane;
var mainPane;
var paymentPane;

function preprocessPaneData()
{
	panes.list = [];
	panes.dragndrop = null;
	panes.lastmousemove = 0;

	trackerPane = new cPane(null, 0, 0);
	var path = new Path2D();
	path.rect(0, 0, 800, 99);
	trackerPane.boundaryPath = path;
	trackerPane.customDraw = function (ctx)
	{
		ctx.save();
		ctx.textAlign = "left";
		ctx.fillStyle = ctx.strokeStyle;
		ctx.fillText(locale.autosave + ": " + Math.trunc(s / 3600) + ":" + Math.ceil((s - Math.trunc(s / 3600) * 3600) / 60), trackerPane.savingX, 50);
		ctx.restore();
	}
	trackerPane.resize = function ()
	{
		trackerPane.savingX = canvas.width - 150;
		regionData.saveRegion.x = trackerPane.savingX + 22;
		regionData.resetRegion.x = trackerPane.savingX + 12;
	}
	trackerPane.subRegions.push(regionData.saveRegion);
	trackerPane.subRegions.push(regionData.resetRegion);

	path = new Path2D();
	path.rect(0, 0, 140, 20);
	var rs = [];
	for (var i = 0; i < 5; i++)
	{
		var r = new cRegion(50 + 160 * i, 40);
		r.text = locale.aTabNames[i];
		r.textX = 70;
		r.textY = 10;
		r.boundaryPath = path;
		trackerPane.subRegions.push(r);
		rs.push(r);
	}

	mainPane = new cPane(null, 0, 100);
	path = new Path2D();
	path.rect(0, 0, 800, 700);
	mainPane.boundaryPath = path;
	mainPane.customDraw = function (ctx)
	{
		if (machineData.machineNexus.recipes[1].enabled)
		{
			ctx.drawImage(images.mainBackground4, -400, -400);
		}
		else if (machineData.machineVoid.recipes[0].enabled)
		{
			ctx.drawImage(images.mainBackground3, -400, -400);
		}
		else if (machineData.golemMerger.recipes[0].enabled)
		{
			ctx.drawImage(images.mainBackground2, -400, -400);
		}
		else
		{
			ctx.drawImage(images.mainBackground1, -400, -400);
		}

		particleGenerator.draw(ctx);
		var x = -this.centerX + canvas.width / 2;
		var y = -this.centerY + canvas.height / 2 - 100;
		ctx.save();
		ctx.globalAlpha = Math.min(1, Math.max(0, Math.abs(borderGlowTicks++ % 1000 / 999 - 0.5) * 2)) * 0.75;
		ctx.lineWidth = 0.4;
		ctx.shadowBlur = ctx.globalAlpha * 8;
		ctx.strokeStyle = "#FFFFFF";
		ctx.shadowColor = "#AF00AF";
		ctx.beginPath();
		ctx.moveTo(x, y);
		var noGlow = true;
		for (var i = 0; i < this.subRegions.length; i++)
		{
			if (this.subRegions[i].markedToGlow)
			{
				ctx.lineTo(this.subRegions[i].x, this.subRegions[i].y);
				ctx.moveTo(x, y);
				noGlow = false;
			}
		}
		if (noGlow && x * x + y * y > 10000 * data.elementsKnown * data.elementsKnown)
		{
			ctx.lineTo(0, 0);
			ctx.moveTo(x, y);
			ctx.shadowColor = "#00AFAF";
			noGlow = false;
		}
		if (!noGlow)
		{
			ctx.moveTo(x + 5, y);
			ctx.arc(x, y, 5, 0, Math.PI * 2);
			ctx.moveTo(x + 10, y);
			ctx.arc(x, y, 10, 0, Math.PI * 2);
			ctx.moveTo(x + 15, y);
			ctx.arc(x, y, 15, 0, Math.PI * 2);
			ctx.stroke();
		}
		ctx.restore();
	}

	paymentPane = new cPane(mainPane, 300, 0);
	path = new Path2D();
	path.rect(0, 0, 306, 83);
	paymentPane.boundaryPath = path;
	paymentPane.subRegions.push(regionData.hideRegion);
	paymentPane.subRegions.push(regionData.confirmRegion);
	paymentPane.subRegions.push(regionData.cancelRegion);
	paymentPane.subRegions.push(regionData.dragRegion);
	paymentPane.customDraw = function (ctx)
	{
		ctx.save();
		ctx.fillStyle = ctx.strokeStyle;
		if (this.costs)
		{
			for (var i = 0; i < this.costs.length; i++)
			{
				if (data.oElements[this.costs[i].type].known)
				{
					ctx.fillText(this.costs[i].type, 120, 8);
					drawNumber(ctx, data.oElements[this.costs[i].type].amount, 220, 8, elementalDisplayType[this.costs[i].type], "right");
					ctx.fillText("/", 230, 8);
					drawNumber(ctx, this.costs[i].amount, 236, 8, elementalDisplayType[this.costs[i].type]);
				}
				else
				{
					if (this.costs[i].amount > 0)
					{
						ctx.fillText("???", 120, 8);
					}
					else
					{
						ctx.fillText(locale.free, 120, 8);
					}

				}

				ctx.translate(0, 17);
			}
		}
		else
		{
			regionData.hideRegion.action(this);
		}
		ctx.restore();
	}
	paymentPane.preparePayment = function (costs, x, y, offsetPane, target)
	{
		this.costs = costs;
		this.target = target;
		regionData.showRegion.action(this);

		this.x = x + 17;
		this.y = y + 17;
		while (offsetPane.top !== null)
		{
			this.x += offsetPane.x;
			this.y += offsetPane.y;
			offsetPane = offsetPane.top;
		}
	}
	paymentPane.isAffordable = function (costs)
	{
		var possible = true;
		for (var i = 0; i < costs.length; i++)
		{
			possible = possible && (data.oElements[costs[i].type].amount >= costs[i].amount);
		}
		return possible;
	}
	regionData.hideRegion.action(paymentPane);
}
