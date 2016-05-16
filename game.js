var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(1000, 1000, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage("Assets/png/Character-sprite.png");

var character = new PIXI.Sprite(texture);

character.anchor.x = 0.5;
character.anchor.y = 0.5;

character.position.x = 500;
character.position.y = 500;

stage.addChild(character);

function animate() { 
	requestAnimationFrame(animate);
	character.rotation += 0.05;
	character.x += 2;
	renderer.render(stage);
}


animate();