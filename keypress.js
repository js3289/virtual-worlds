/*
	Handles all keypresses in the game.
	WASD - Movement
	Up, down, left, right - Movement
	I - inventory (to be added)
	T - teleport home (to be added, much later)
*/

function onKeyDown(key) {
    // W Key is 87 Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
		character.direction = 1;
		if(!hasCollided()) {
			character.sprite.y -= character.movement;
		}
		
    }

    // S Key is 83 Down arrow is 40
    else if (key.keyCode === 83 || key.keyCode === 40) {
		character.direction = 0;
		if(!hasCollided()) {
			character.sprite.y += character.movement;
		}
    }

    // A Key is 65 Left arrow is 37
    if (key.keyCode === 65 || key.keyCode === 37) {
		character.direction = 2;
		character.sprite.scale.x = -1;
		if(!hasCollided()) {
			character.sprite.x -= character.movement;
		}
    }

    // D Key is 68 Right arrow is 39
    else if (key.keyCode === 68 || key.keyCode === 39) {
		character.direction = 3;
		character.sprite.scale.x = 1;
		if(!hasCollided()) {
			character.sprite.x += character.movement;
		}
    }
	
	else if (key.keyCode === 73 || key.keyCode === 66) {
		character.inventory.interact();
	}
}