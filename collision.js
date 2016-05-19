function charHasCollided() {
	var charY = character.sprite.y;
	var charX = character.sprite.x;
	
	var charBaseX = charX - character.sprite.width / 2;
	var charBaseY = charY - character.sprite.height / 2;
	
	var charEndX = charX + character.sprite.width / 2;
	var charEndY = charX + character.sprite.width / 2;
	
	for(var i = 0; i < stage.children.length; i++) {
		collision = false;
		var temp = stage.getChildAt(i);
		
		if (temp.collides === true && temp.name != "player") {
			var childY = temp.y;
			var childX = temp.x;

			var childBaseX = childX - temp.width / 2;
			var childBaseY = childY - temp.height / 2;

			var childEndX = childX + temp.width / 2;
			var childEndY = childY + temp.height / 2;

			//if(charX >= childBaseX && charX <= childEndX && charY >= childBaseY && charY <= childEndY) {
			if(character.sprite.x < temp.x + temp.width / 2 && character.sprite.x + character.sprite.width / 2> temp.x && character.sprite.y < temp.y + temp.height / 2 && character.sprite.height / 2 + character.sprite.y > temp.y){
				if(temp.name === "coin"){
					stage.removeChild(temp);
					character.coins += 100;
					coins.splice(0, 1);
					collision = true;
				}
				
				else if(temp.name === "stump"){
					collision = true;
					sprite = new EnhSprite("losing", false, TextureImage("Assets/png/you-lose.png") );
					losingC.visible = true;
					losingC.addChild(sprite);
					sprite.anchor.x = MIDDLE;
					sprite.anchor.y = MIDDLE;
					sprite.position.x = WIDTH / 2;
					sprite.position.y = HEIGHT / 2;
					stage.addChild(losingC);
					over = true;
				}
				
				if(coins.length == 0) {
					sprite = new EnhSprite("winning", false, TextureImage("Assets/png/you-win.png") );
					winningC.visible = true;
					winningC.addChild(sprite);
					sprite.anchor.x = MIDDLE;
					sprite.anchor.y = MIDDLE;
					sprite.position.x = WIDTH / 2;
					sprite.position.y = HEIGHT / 2;
					stage.addChild(winningC);
					over = true;
				}

			}	
		}
	}
	
	return collision;
	
}

function objSpawnCollided(ent1, objects) {
	collision = false;
	
	for(var i = 0; i < objects.length; i++) {
		ent2 = objects[i];
		//alert("height: " + ent1.sprite.height + " width: " + ent1.sprite.width + " height2: " + ent2.sprite.height + " width2: " + ent2.sprite.width);
	
		if(ent2.sprite.collides && ent1.sprite.collides) {
			var ent1X = ent1.sprite.x;
			var ent1Y = ent1.sprite.y;
		
			var ent1BaseX = ent1X - ent1.sprite.width / 2;
			var ent1BaseY = ent1Y - ent1.sprite.height / 2;
		
			var ent1EndX = ent1X + ent1.sprite.width / 2;
			var ent1EndY = ent1Y + ent1.sprite.height / 2;
		
		
			var ent2X = ent2.sprite.x;
			var ent2Y = ent2.sprite.y;
			
			var ent2BaseX = ent2X - ent2.sprite.width / 2;
			var ent2BaseY = ent2Y - ent2.sprite.height / 2;
		
			var ent2EndX = ent2X + ent2.sprite.width / 2;
			var ent2EndY = ent2Y + ent2.sprite.height / 2;
			
			//if(ent2BaseX <= ent1EndX && ent2BaseY <= ent1EndY) {
			//	collision = true;
			//}
			//if((ent2BaseX >= ent1BaseX || ent2EndX >= ent1BaseX) && (ent2BaseX <= ent1EndX || ent2EndX <= ent1EndX) && (ent2BaseY >= ent1BaseY || ent2EndY >= ent1BaseY) && (ent2BaseY <= ent1EndY || ent2EndY <= ent1EndY)){
			//if(((ent2BaseX >= ent1BaseX && ent2BaseX <= ent1EndX) || (ent2EndX >= ent1BaseX && ent2EndX <= ent1EndX)) && ((ent2BaseY >= ent1BaseY && ent2BaseY <= ent1EndY) || ent2EndY >= ent1BaseY && ent2EndY <= ent1EndY)){	
			//	collision = true;
			//	alert("true");
			//}
			if(ent1.sprite.x < ent2.sprite.x + ent2.sprite.width && ent1.sprite.x + ent1.sprite.width > ent2.sprite.x && ent1.sprite.y < ent2.sprite.y + ent2.sprite.height && ent1.sprite.height + ent1.sprite.y > ent2.sprite.y) {
				collision = true;
			}
			
			//if((ent2BaseX >= ent1BaseX || ent2EndX >= ent1BaseX) && (ent2BaseX <= ent1EndX || ent2EndX <= ent1EndX)) {
			//	collision = true;
			//}
		//  if(charX >= childBaseX && charX <= childEndX && charY >= childBaseY && charY <= childEndY) {
			//if((ent2BaseX || ent2EndX) >= ent1BaseX && (ent2BaseX || ent2EndX) <= ent1EndX && (ent2BaseY || ent2EndY) >= ent1BaseY && (ent2BaseY || ent2EndY) <= ent1EndY){
			//	alert("hi");
			//	collision = true;
			//}
			//if(ent2BaseX || ent2EndX >= ent1BaseX && ent2BaseX || ent2EndX <= ent1EndX && ent2BaseY || ent2EndY >= ent1BaseY && ent2BaseY || ent2EndY <= ent1EndY
			//if(ent2X >= ent1BaseX && ent2X <= ent1EndX && ent2Y >= ent1BaseY && ent2Y <= ent1EndY) {
			//	alert("true");
			//	collision = true;
			//}
		}
	}
	
	return collision
}