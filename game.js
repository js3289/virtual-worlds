var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer(1000, 1000, {backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture = PIXI.Texture.fromImage("Assets/png/Character-sprite.png");

var sprite = new PIXI.Sprite(texture);

sprite.anchor.x = 0.5;
sprite.anchor.y = 0.5;

sprite.position.x = 500;
sprite.position.y = 500;

stage.addChild(sprite);

function animate() { 
	requestAnimationFrame(animate);
	sprite.rotation += 0.05;
	renderer.render(stage);
}

animate();