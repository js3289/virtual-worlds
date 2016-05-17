function hasCollided() {
	var collision = false;
	var charY = character.sprite.y;
	var charX = character.sprite.x;
	
	for(var i = 0; i < stage.children.length; i++) {
		var temp = stage.getChildAt(i);
		
		var childY = temp.y;
		var childX = temp.x;
		
		var childBaseX = childX - temp.width / 2;
		var childBaseY = childY - temp.height / 2;
		                          
		var childEndX = childX + temp.width / 2;
		var childEndY = childY + temp.height / 2;
		
		if(charX >= childBaseX && charX <= childEndX || charY >= childBaseY && charY <= childEndY) {
			if(temp instanceof Coin ) {
				alert("Collision Detected");
				collision = true;
			}
		}
	}
	return collision;
}