/// <reference path="PIXI.d.ts"/>

class Dog 
{
	x		:	number;
	y		:	number;
	frames	:	any;
	sprite 	:	PIXI.MovieClip;
	loader 	:	PIXI.AssetLoader;
	stage 	:	PIXI.Stage;

	constructor( stage:PIXI.Stage, x:number = 0, y:number = 0)
	{
		this.stage = stage;

		this.loader = new PIXI.AssetLoader(["../atlases/pixdog.json"]);

		this.loader.onComplete = this.onAtlasLoaded.bind(this);

		this.loader.load();

		this.frames = [];
		this.x = x;
		this.y = y;
	};

	onAtlasLoaded()
	{
		var texs = [];
		for (var i=0; i < 4; i++) 
		{
		 	var texture = PIXI.Texture.fromFrame("dog_" + (i+1) + ".png");
			this.frames.push(texture);
		};

		this.sprite = new PIXI.MovieClip(this.frames);
		this.sprite.position.x = this.x;
		this.sprite.position.y = this.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.scale.x = 5;
		this.sprite.scale.y = 5;
		this.sprite.animationSpeed=0.1;
		this.sprite.play();

		this.stage.addChild(this.sprite);

	};
};