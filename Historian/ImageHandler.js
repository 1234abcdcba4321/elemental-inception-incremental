var images = {

}

function preprocessImages()
{
	var imageList = [
		"iconOn",
		"iconOff",
		"iconUp",
		"iconUpNot",
		"iconLeft",
		"iconRight",
		"iconLock",
		"iconShow",
		"iconPause",
		"iconResume",
		"iconHide",
		"iconDrag",
		"iconMin",
		"iconMax",
		"iconEarth",
		"iconWater",
		"iconAir",
		"iconFire",
		"iconMud",
		"iconIce",
		"iconSteam",
		"iconSand",
		"iconMagma",
		"iconVoid",
		"iconAlkahest",
		"iconGolemEarth",
		"iconGolemWater",
		"iconGolemAir",
		"iconGolemFire",
		"iconMergerDisplay",
		"buttonConfirm",
		"buttonConfirmCrossed",
		"buttonCancel",
	];
	for (var i = 0; i < imageList.length; i++)
	{
		var img = new Image();
		images[imageList[i]] = img;
		img.src = "img/" + imageList[i] + ".png";
	}
}
preprocessImages();
