var gameport = document.getElementById("gameport");
var renderer = PIXI.autoDetectRenderer(400, 400);
gameport.appendChild(renderer.view);


var stage = new PIXI.Container();


class Player {
	constructor(path) {

	this.direction = 0;
	this.movement = 3;
	this.isClicked = false;
	this.coins = 0;

	this.temp = PIXI.Texture.fromImage(path);
	this.sprite = new PIXI.Sprite(this.temp);
	this.sprite.interactive = true;

	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = 30;
	this.sprite.position.y = 30;

	this.sprite
		.on('mousedown', this.onButtonDown)
		.on('mouseup', this.onButtonUp)
		.on('mouseupoutside', this.onButtonUp)
		.on('touchstart', this.onButtonDown)
		.on('touchend', this.onButtonUp)
		.on('touchendoutside', this.onButtonUp);

	}

	onButtonDown() {
		if(!character.isClicked) {
			character.sprite.y -= 100;
			character.isClicked = true;
		}
	}

	onButtonUp() {
		if(character.isClicked) {
			character.sprite.y += 100;
			character.isClicked = false;
		}
	}

}

class Coin {
	constructor() {

	this.isActive = true;
	this.sprite = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/png/coin.png") );
	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;
	this.sprite.position.x = Math.floor((Math.random() * 350) + 25);
	this.sprite.position.y = Math.floor((Math.random() * 350) + 25);
	
	this.sprite.scale.x = .6;
	this.sprite.scale.y = .6;
	}
}

var character = new Player("Assets/png/Character-sprite.png");
var background = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/png/Dungeon-background.png"));


var coins = [];

for(var i = 0; i < 10; i++) {
	if(Math.floor((Math.random() * 2) + 1) === 1) {
		coins.push(new Coin());
	}
}


background.anchor.x = 0.5;
background.anchor.y = 0.5;
background.position.x = 200;
background.position.y = 200;

stage.addChild(background);

for(var j = 0; j < coins.length; j++) {
	stage.addChild(coins[j].sprite)
}
stage.addChild(character.sprite);

document.addEventListener('keydown', onKeyDown);

function animate() { 
	requestAnimationFrame(animate);
	for(var i = 0; i < coins.length; i++){
		//coins[i].sprite.scale.x -= .1;
	}
	renderer.render(stage);
}

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
}

animate();