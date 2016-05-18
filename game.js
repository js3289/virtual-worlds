// Globals + constants start here. All comments until setup function
	var HEIGHT = 400;
	var WIDTH = 400;
	var won = false;

// Aliases
	TextureImage = PIXI.Texture.fromImage;
	Sprite = PIXI.Sprite;
	Container = PIXI.Container;
	Renderer = PIXI.autoDetectRenderer;

// Gameport, renderer, stage, inventory, etc
	var gameport = document.getElementById("gameport");
	var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT);
	var stage = new Container();
	var inventoryC = new Container();
	var winningC = new Container();
	var losingC = new Container();

// Constants for anchoring sprites
	LEFT = 0;
	TOP = 0;
	MIDDLE = .5;
	BOTTOM = 1;
	RIGHT = 1;

// Create coins array, stump array
	coins = [];
	objects = [];

// Create var for player
	var character;

// useful function to return random integer
function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function that checks to make sure character doesn't leave bounds of map
function keepInBounds() {
	var collision = false;
	
	if(character.sprite.x < 20) {
		character.sprite.x = 20;
		collision = true;
	}
	
	if(character.sprite.x > 380) {
		character.sprite.x = 380;
		collision = true;
	}
	
	if(character.sprite.y < 20) {
		character.sprite.y = 20;
		collision = true;
	}
	
	if(character.sprite.y > 370) {
		character.sprite.y = 370;
		collision = true;
	}
}

// setup() function sets everything we need for the game up, passes control to animate() afterwards
function setup() {

// Add renderer to gameport
	gameport.appendChild(renderer.view);
	
// Create background. Center background + add it to stage.
	var background = new Sprite(TextureImage("Assets/png/Dungeon-background.png"));
	background.anchor.x = MIDDLE;
	background.anchor.y = MIDDLE;
	background.position.x = 200;
	background.position.y = 200;

// Add background to stage
	stage.addChild(background);
	
// Populate coins + objects with coin objects
	for(var i = 0; i < 20; i++) {
		if(Math.floor((Math.random() * 2) + 1) === 1) {
			var tempCoin = new Coin();
			coins.push(tempCoin);
			objects.push(tempCoin);
		}
	}
	
// Populate objects with stump objects
	for(var i = 0; i < 20; i++) {
		if(randInt(1,2) === 1) {
			objects.push(new Stump());
		}
	}
	
// Add all objects to the stage
	for(var j = 0; j < objects.length; j++) {
		stage.addChild(objects[j].sprite)
	}

// Define character
	character = new Player("Assets/png/Character-sprite.png");
	
// Add character to the stage	
	stage.addChild(character.sprite);
	
// Add inventory to container
	stage.addChild(inventoryC);
	
// Add listener for key presses to our page
	document.addEventListener('keydown', onKeyDown);
	
// Pass control to animate
	animate();
}

/**
 * Player Class - Contains information about the player
 * @param {string} path - path for sprite asset
 * Notable attributes
 * 		Direction (used for weapons + equipment later)
 * 		Movement - speed at which player moves, can be upgraded @ shop later with money collected from dungeons
 *		Coins - amount of money player hasCollided
 */
class Player {
	constructor(path) {
	this.inventory = new Inventory();
	this.direction = 0;
	this.movement = 5;
	this.isClicked = false;
	this.coins = 0;

	this.temp = TextureImage(path);
	this.sprite = new EnhSprite("player", true, this.temp);
	this.sprite.interactive = true;

	// Anchor player to middle of sprite. Starts at top left of the dungeon (pixel 30+30)
	this.sprite.anchor.x = MIDDLE;
	this.sprite.anchor.y = MIDDLE;
	this.sprite.position.x = 30;
	this.sprite.position.y = 300;

	this.sprite
		.on('mousedown', this.onButtonDown)
		.on('mouseup', this.onButtonUp)
		.on('mouseupoutside', this.onButtonUp)
		.on('touchstart', this.onButtonDown)
		.on('touchend', this.onButtonUp)
		.on('touchendoutside', this.onButtonUp);

	}
	
	// If you click down on the player, and it isn't already clicked, move it.
	onButtonDown() {
		if(!character.isClicked) {
			character.sprite.y -= 100;
			character.isClicked = true;
		}
	}

	// If you release click on the player and it is already clicked, move it.
	onButtonUp() {
		if(character.isClicked) {
			character.sprite.y += 100;
			character.isClicked = false;
		}
	}

}

/**
 *	Coin class
 *	Creates a new coin object
 *  Sprite.X and Sprite.Y positions are random, and won't appear on the walls of the map.
 *	I made the sprite too large so it is scaled down quite a bit.
 */
class Coin {
	constructor() {

	this.isActive = false;
	this.sprite = new EnhSprite("coin", true, TextureImage("Assets/png/Coin.png") );
	this.sprite.anchor.x = MIDDLE;
	this.sprite.anchor.y = MIDDLE;
	this.sprite.scale.x = .6;
	this.sprite.scale.y = .6;
	this.sprite.height = 20;
	this.sprite.width = 20;
	
	while(!this.isActive) {
		this.sprite.position.x = Math.floor((Math.random() * (WIDTH - 100)) + 75);
		this.sprite.position.y = Math.floor((Math.random() * (HEIGHT - 100)) + 75);
		
		this.isActive = !objSpawnCollided(this, objects);
	}
	
	}
}

/**
 *	Stump class
 *	Creates a new stump object
 *	Stump.X and Stump.Y positions are random, and won't appear on the walls of the map.
 */
class Stump {
	constructor() {
	
	this.isActive = false;
	this.sprite = new EnhSprite("stump", true, TextureImage("Assets/png/tree-stump.png"));
	this.sprite.anchor.x = MIDDLE;
	this.sprite.anchor.y = MIDDLE;
	this.sprite.height = 32;
	this.sprite.width = 32;
	
	while(!this.isActive) {
		this.sprite.position.x = Math.floor((Math.random() * (WIDTH - 100)) + 75);
		this.sprite.position.y = Math.floor((Math.random() * (HEIGHT - 100)) + 75);
		
		this.isActive = !objSpawnCollided(this, objects);
	}
	
	}
}

/**
 *	Inventory class
 *	Holds all items in inventory as well as the sprite for the backpack interface seen in game
 */
class Inventory {
	constructor() {
		
		this.sprite = new EnhSprite("inventory", false, TextureImage("Assets/png/backpack.png") );
		inventoryC.visible = false;
		inventoryC.addChild(this.sprite);
		this.sprite.anchor.x = RIGHT;
		this.sprite.anchor.y = BOTTOM;
		this.sprite.position.x = WIDTH;
		this.sprite.position.y = HEIGHT;
	}
	
	interact() {
		inventoryC.visible = !inventoryC.visible;
	}
}

/**
 *	EnhSprite is just an extension of PIXI.Sprite, keeps track of the name of the sprite as well as collision boolean
 *	Will also contain any further information we need on our Sprites
 */
class EnhSprite extends PIXI.Sprite {
	constructor(name, collides, texture) {
		super(texture)
		super.name = name;
		this.collides = collides;
	}
	
	handleCollision() {
	}
}

function animate() { 
	requestAnimationFrame(animate);
	keepInBounds();
	renderer.render(stage);
}


setup();