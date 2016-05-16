var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(400, 400, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);


var stage = new PIXI.Container();


class Player {
	constructor(path) {
	
	this.movement = 3;
	this.isClicked = false;
	
	this.temp = PIXI.Texture.fromImage(path);
	this.sprite = new PIXI.Sprite(this.temp);
	this.sprite.interactive = true;
	
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = 200;
	this.sprite.position.y = 200;
	
	this.sprite
		.on('mousedown', this.onButtonDown)
		.on('mouseup', this.onButtonUp)
		.on('mouseupoutside', this.onButtonUp)
		.on('touchstart', this.onButtonDown)
		.on('touchend', this.onButtonUp)
		.on('touchendoutside', this.onButtonUp);
	
	}
	
	onButtonDown() {
		if(!this.isClicked) {
			this.sprite.y -= 100;
			this.isClicked = true;
		}
	}

	onButtonUp() {
		if(this.isClicked) {
			this.sprite.y += 100;
			this.isClicked = false;
		}
	}
}
		
var character = new Player("Assets/png/Character-sprite.png");

stage.addChild(character.sprite);

document.addEventListener('keydown', onKeyDown);

function animate() { 
	requestAnimationFrame(animate);
	renderer.render(stage);
}



function onKeyDown(key) {
    // W Key is 87 Up arrow is 38
    if (key.keyCode === 87 || key.keyCode === 38) {
			character.sprite.y -= character.movement;
        }
  
    // S Key is 83 Down arrow is 40
    else if (key.keyCode === 83 || key.keyCode === 40) {
			character.sprite.y += character.movement;
        }
  
    // A Key is 65 Left arrow is 37
    else if (key.keyCode === 65 || key.keyCode === 37) {
			character.sprite.x -= character.movement;
        }
  
    // D Key is 68 Right arrow is 39
    else if (key.keyCode === 68 || key.keyCode === 39) {
			character.sprite.x += character.movement;
    }
}
	
animate();