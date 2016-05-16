var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage("Assets/png/Character-sprite.png");

var character = new PIXI.Sprite(texture);

var isClicked = false;

var movement = 3;

character.anchor.x = 0.5;
character.anchor.y = 0.5;

character.position.x = 200;
character.position.y = 200;

character.interactive = true;
	
character
	.on('mousedown', onButtonDown)
	.on('mouseup', onButtonUp)
	.on('mouseupoutside', onButtonUp)
	.on('touchstart', onButtonDown)
	.on('touchend', onButtonUp)
	.on('touchendoutside', onButtonUp);
	
		

stage.addChild(character);

document.addEventListener('keydown', onKeyDown);

function animate() { 
	requestAnimationFrame(animate);
	renderer.render(stage);
}

function onButtonDown() {
	if(!isClicked) {
		character.y -= 100;
		isClicked = true;
	}
}

function onButtonUp() {
	if(isClicked) {
		character.y += 100;
		isClicked = false;
	}
}

function onKeyDown(key) {
    // W Key is 87
    // Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
			character.y -= movement;
        }
  
    // S Key is 83
    // Down arrow is 40
    else if (key.keyCode === 83 || key.keyCode === 40) {
			character.y += movement;
        }
  
    // A Key is 65
    // Left arrow is 37
    else if (key.keyCode === 65 || key.keyCode === 37) {
			character.x -= movement;
        }
  
    // D Key is 68
    // Right arrow is 39
    else if (key.keyCode === 68 || key.keyCode === 39) {
			character.x += movement;
    }
}


	
	
animate();