/*
	Handles all keypresses in the game.
	WASD - Movement
	Up, down, left, right - Movement
	I - inventory (to be added)
	T - teleport home (to be added, much later)
*/

function handleKeys() {

	xMove = 0;
	yMove = 0;

    // W Key is 87 Up arrow is 38
    if (keysActive[87] || keysActive[38]) {
		character.direction = 1;
		if(!charHasCollided()) {
			yMove -= character.movement;
			//character.sprite.y -= character.movement;
		}
    }

    // S Key is 83 Down arrow is 40
    else if (keysActive[83] || keysActive[40]) {
		character.direction = 0;
		if(!charHasCollided()) {
			//character.sprite.y += character.movement;
			yMove += character.movement;
		}
    }

    // A Key is 65 Left arrow is 37
    if (keysActive[65] || keysActive[37]) {
		character.direction = 2;
		character.sprite.scale.x = -1;
		if(!charHasCollided()) {
			//character.sprite.x -= character.movement;
			xMove -= character.movement;
		}
    }

    // D Key is 68 Right arrow is 39
    else if (keysActive[68] || keysActive[39]) {
		character.direction = 3;
		character.sprite.scale.x = 1;
		if(!charHasCollided()) {
			//character.sprite.x += character.movement;
			xMove += character.movement;
		}
    }
	
	if(keysActive[13] && over) {
		window.location.reload();
	}
	
	// Ended up not using inventory, may revisit it later.
	//else if (keysActive[73] || keysActive[66]) {
	//	character.inventory.interact();
	//	setTimeout(character.inventory.interact, 10);
	//}
	
	character.sprite.position.x += xMove;
	character.sprite.position.y += yMove;
	
}