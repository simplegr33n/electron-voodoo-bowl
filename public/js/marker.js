module.exports = class Marker {
	static renderBallMarker(xPos) {
		var spriteImage = document.createElement("img");
		spriteImage.src = "././assets/ball_marker.png";
		spriteImage.className = "marker-sprite";
		spriteImage.style.left = gameManager.xPositions[xPos] + "px";
		spriteImage.style.bottom = "0px";
		spriteImage.style.zIndex = 150
		document.getElementById('field-container').appendChild(spriteImage);
    }
    
    static renderFirstMarker(xPos) {
		var spriteImage = document.createElement("img");
		spriteImage.src = "././assets/first_marker.png";
		spriteImage.className = "marker-sprite";
		spriteImage.style.left = gameManager.xPositions[xPos] + "px";
		spriteImage.style.bottom = "0px";
		spriteImage.style.zIndex = 150
		document.getElementById('field-container').appendChild(spriteImage);
	}

}