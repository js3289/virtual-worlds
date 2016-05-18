function hasCollided() {
	var charY = character.sprite.y;
	var charX = character.sprite.x;
	
	var charBaseX = charX - character.sprite.width / 2;
	var charBaseY = charY - character.sprite.height / 2;
	
	var charEndX = charX + character.sprite.width / 2;
	var charEndY = charX + character.sprite.width / 2;
	
	for(var i = 0; i < stage.children.length -1; i++) {
		collision = false;
		var temp = stage.getChildAt(i);
		
		if (temp.collides === true) {
			var childY = temp.y;
			var childX = temp.x;

			var childBaseX = childX - temp.width / 2;
			var childBaseY = childY - temp.height / 2;

			var childEndX = childX + temp.width / 2;
			var childEndY = childY + temp.height / 2;

			if(charX >= childBaseX && charX <= childEndX && charY >= childBaseY && charY <= childEndY) {
				stage.removeChild(temp);
				character.coins += 100;
				collision = true;

			}	
		}
	}
	
	return collision;
	
}