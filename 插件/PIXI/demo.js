var type = "WebGL";

if(!PIXI.utils.isWebGLSupported()) {
	type = "canvas";
}

PIXI.utils.sayHello(type);

var renderer = PIXI.autoDetectRenderer(512, 512);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

PIXI.loader
	.add("images/treasureHunter.json")
	.load(setup);

var gameScene, id, dungeon, door, explorer, treasure, blobs, healthBar, gameOverScene, state, explorerHit;

function setup() {
	gameScene = new PIXI.Container();
	stage.addChild(gameScene);

	id = PIXI.loader.resources["images/treasureHunter.json"].textures;
	dungeon = new PIXI.Sprite(id["dungeon.png"]);
	gameScene.addChild(dungeon);

	door = new PIXI.Sprite(id["door.png"]);
	door.position.set(32, 0);
	gameScene.addChild(door);

	explorer = new PIXI.Sprite(id["explorer.png"]);
	explorer.x = 68;
	explorer.y = gameScene.height / 2 - explorer.height / 2;
	explorer.vx = 0;
	explorer.vy = 0;
	gameScene.addChild(explorer);

	treasure = new PIXI.Sprite(id["treasure.png"]);
	treasure.x = gameScene.width - treasure.width - 48;
	treasure.y = gameScene.height / 2 - treasure.height / 2;
	gameScene.addChild(treasure);

	var numberOfBlobs = 6,
		spacing = 48,
		xOffset = 150,
		speed = 2,
		direction = 1;

	blobs = [];

	for(var i = 0; i < numberOfBlobs; i++) {
		var blob = new PIXI.Sprite(id["blob.png"]);

		var x = spacing * i + xOffset;

		var y = randomInt(0, stage.height - blob.height);

		blob.x = x;
		blob.y = y;

		blob.vy = speed * direction;

		direction *= -1;

		blobs.push(blob);

		gameScene.addChild(blob);
	}

	// 添加血条,创建一个容器
	healthBar = new PIXI.Container();
	healthBar.position.set(stage.width - 170, 6);
	gameScene.addChild(healthBar);
	// 添加底层黑色矩形，在血条不断降低时显示这个
	var innerBar = new PIXI.Graphics();
	innerBar.beginFill(0x000000);
	innerBar.drawRect(0, 0, 128, 8);
	innerBar.endFill();
	healthBar.addChild(innerBar);
	// 添加外层红色血条
	var outerBar = new PIXI.Graphics();
	outerBar.beginFill(0xFF3300);
	outerBar.drawRect(0, 0, 128, 8);
	outerBar.endFill();
	healthBar.addChild(outerBar);
	// 设置为外层
	healthBar.outer = outerBar;

	// 创建 `gameOverScene` 组
	gameOverScene = new PIXI.Container();
	gameOverScene.visible = false;

	stage.addChild(gameOverScene);

	// 添加 game over 提示语
	message = new PIXI.Text(
		"The End!", {
			fontFamily: "64px Futura",
			fill: "white"
		}
	);

	message.x = 120;
	message.y = stage.height / 2 - 32;

	gameOverScene.addChild(message);

	// 添加按键监听
	var left = keyboard(37),
		up = keyboard(38),
		right = keyboard(39),
		down = keyboard(40);

	// 当按键按下时，设置速度为 -5 px
	left.press = function() {
		explorer.vx = -5;
		explorer.vy = 0;
	};
	// 当按键释放时，如果其他按键没有按下，设置速度为 0
	left.release = function() {
		if(!right.isDown && explorer.vy === 0) {
			explorer.vx = 0;
		}
	};

	up.press = function() {
		explorer.vy = -5;
		explorer.vx = 0;
	};
	up.release = function() {
		if(!down.isDown && explorer.vx === 0) {
			explorer.vy = 0;
		}
	};

	right.press = function() {
		explorer.vx = 5;
		explorer.vy = 0;
	};
	right.release = function() {
		if(!left.isDown && explorer.vy === 0) {
			explorer.vx = 0;
		}
	};

	down.press = function() {
		explorer.vy = 5;
		explorer.vx = 0;
	};
	down.release = function() {
		if(!up.isDown && explorer.vx === 0) {
			explorer.vy = 0;
		}
	};

	state = play;
	gameLoop();
}

function play() {
	explorer.x += explorer.vx;
	explorer.y += explorer.vy;
	contain(explorer, {
		x: 28,
		y: 10,
		width: 488,
		height: 480
	});

	blobs.forEach(function(blob) {
		blob.y += blob.vy;
		var blobHitsWall = contain(blob, {
			x: 28,
			y: 10,
			width: 488,
			height: 480
		});
		if(blobHitsWall === "top" || blobHitsWall === "bottom") {
			blob.vy *= -1;
		}
		// 如果探险家和怪物发生碰撞后，explorerHit 为 true
		if(hitTestRectangle(explorer, blob)) {
			explorerHit = true;
		}
	});

	if(explorerHit) {
		// 探险家透明度变为一半
		explorer.alpha = 0.5;
		// 血条不断下降
		healthBar.outer.width -= 1;
	} else {
		explorer.alpha = 1;
	}
	// 如果探险家碰撞到宝箱，则把探险家和宝箱绑定到一起
	if(hitTestRectangle(explorer, treasure)) {
		treasure.x = explorer.x + 8;
		treasure.y = explorer.y + 8;
	}
	// 如果宝箱碰到门后，则停止游戏，显示胜利
	if(hitTestRectangle(treasure, door)) {
		state = stop;
		message.text = "You won!";
	}
	// 如果血条下降为0后，停止游戏，显示失败.
	if(healthBar.outer.width < 0) {
		state = stop;
		message.text = "You lost!";
	}
}

function stop() {
	gameScene.visible = false;
	gameOverScene.visible = true;
}

function gameLoop() {
	requestAnimationFrame(gameLoop);
	state();
	renderer.render(stage);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contain(sprite, container) {

	var collision = undefined;

	//Left
	if(sprite.x < container.x) {
		sprite.x = container.x;
		collision = "left";
	}

	//Top
	if(sprite.y < container.y) {
		sprite.y = container.y;
		collision = "top";
	}

	//Right
	if(sprite.x + sprite.width > container.width) {
		sprite.x = container.width - sprite.width;
		collision = "right";
	}

	//Bottom
	if(sprite.y + sprite.height > container.height) {
		sprite.y = container.height - sprite.height;
		collision = "bottom";
	}

	//Return the `collision` value
	return collision;
}

function keyboard(keyCode) {
	var key = {};
	key.code = keyCode;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	//The `downHandler`
	key.downHandler = function(event) {
		if(event.keyCode === key.code) {
			if(key.isUp && key.press) key.press();
			key.isDown = true;
			key.isUp = false;
		}
		event.preventDefault();
	};

	//The `upHandler`
	key.upHandler = function(event) {
		if(event.keyCode === key.code) {
			if(key.isDown && key.release) key.release();
			key.isDown = false;
			key.isUp = true;
		}
		event.preventDefault();
	};

	//Attach event listeners
	window.addEventListener(
		"keydown", key.downHandler.bind(key), false
	);
	window.addEventListener(
		"keyup", key.upHandler.bind(key), false
	);
	return key;
}

function hitTestRectangle(r1, r2) {

	//Define the variables we'll need to calculate
	var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

	//hit will determine whether there's a collision
	hit = false;

	//Find the center points of each sprite
	r1.centerX = r1.x + r1.width / 2;
	r1.centerY = r1.y + r1.height / 2;
	r2.centerX = r2.x + r2.width / 2;
	r2.centerY = r2.y + r2.height / 2;

	//Find the half-widths and half-heights of each sprite
	r1.halfWidth = r1.width / 2;
	r1.halfHeight = r1.height / 2;
	r2.halfWidth = r2.width / 2;
	r2.halfHeight = r2.height / 2;

	//Calculate the distance vector between the sprites
	vx = r1.centerX - r2.centerX;
	vy = r1.centerY - r2.centerY;

	//Figure out the combined half-widths and half-heights
	combinedHalfWidths = r1.halfWidth + r2.halfWidth;
	combinedHalfHeights = r1.halfHeight + r2.halfHeight;

	//Check for a collision on the x axis
	if(Math.abs(vx) < combinedHalfWidths) {

		//A collision might be occuring. Check for a collision on the y axis
		hit = Math.abs(vy) < combinedHalfHeights;
	} else {

		//There's no collision on the x axis
		hit = false;
	}

	//`hit` will be either `true` or `false`
	return hit;
}