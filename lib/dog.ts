/// <reference path="PIXI.d"/>
/// <reference path="keyboard" />

class Dog 
{
	x			:	number;
	y			:	number;
	anSit		: 	any;
	anStand		: 	any;
	anWalk		: 	any;
	anMidSit	: 	any;
	anJump		: 	any;
	anFall		: 	any;
	sprite 		:	PIXI.MovieClip;
	loader 		:	PIXI.AssetLoader;
	stage 		:	PIXI.Stage;
	kbHandler	: 	KeyboardHandler;
	stateCounter:	number;
	resetCounter:	number;
	loaded      :   bool;

	constructor( stage:PIXI.Stage, kbHandler:KeyboardHandler, x:number = 0, y:number = 0)
	{
		this.stage = stage;

		this.stateCounter = 0;
		this.resetCounter = 100;

		this.kbHandler = kbHandler;

		this.loader = new PIXI.AssetLoader(["dogts/atlases/pixdog.json"]);

		this.loader.onComplete = this.onAtlasLoaded.bind(this);
		this.loaded = false;

		this.loader.load();

		this.x = x;
		this.y = y;
	};

	onAtlasLoaded()
	{
		this.anSit = this.addAnimation([9,10,9,11],"dog");
		this.anStand = this.addAnimation([5,6,5,7],"dog");
		this.anWalk = this.addAnimation([1,2,3,4],"dog");
		this.anMidSit = this.addAnimation([8,8,8,8,8,8,8,8,8,8],"dog");
		this.anJump = this.addAnimation([14,14,14,14,14,14],"dog");
		this.anFall = this.addAnimation([15,15,15,15,15,15],"dog");

		this.sprite = new PIXI.MovieClip(this.anSit);
		this.sprite.position.x = this.x;
		this.sprite.position.y = this.y;
		this.sprite.anchor.x = 0.5;
		this.sprite.anchor.y = 0.5;
		this.sprite.scale.x = 5;
		this.sprite.scale.y = 5;
		this.sprite.animationSpeed=0.1;
		this.sprite.play();

		this.stage.addChild(this.sprite);

		this.loaded = true;

	};

	update(isc:any)
	{
		if( this.loaded )
		{
			var angle = Math.atan(isc.norm.y/isc.norm.x);
			angle -= 1.57;
			if( angle <= -1.57 )
			{
				angle -= 3.14;
			}
			this.sprite.rotation = angle;
			console.log(this.sprite.rotation);

			if( this.kbHandler.key(40) )
			{
				this.sprite.position.y+=7;
				this.x = this.sprite.position.x;
				this.y = this.sprite.position.y;
			}
			else if( this.kbHandler.key(38) )
			{
				this.sprite.position.y-=7;
				this.x = this.sprite.position.x;
				this.y = this.sprite.position.y;
			}

			if( this.kbHandler.key(39) )
			{
				if( this.sprite.scale.x != 5 )
				{
					this.sprite.scale.x = 5;
				}
				this.sprite.position.x+=7;
				this.x = this.sprite.position.x;
				this.y = this.sprite.position.y;
				if( this.sprite.textures != this.anWalk )
				{
					this.sprite.textures = this.anWalk;
				}
				this.stateCounter = this.resetCounter;
			} 
			else if( this.kbHandler.key(37) )
			{
				if( this.sprite.scale.x != -5 )
				{
					this.sprite.scale.x = -5;
				}
				this.sprite.position.x-=7;
				this.x = this.sprite.position.x;
				this.y = this.sprite.position.y;
				if( this.sprite.textures != this.anWalk )
				{
					this.sprite.textures = this.anWalk;
				}
				this.stateCounter = this.resetCounter;
			}
			else
			{
				if( this.stateCounter == 0 )
				{
					this.stateCounter = 0;
					if( this.sprite && this.sprite.textures != this.anSit )
					{
						this.sprite.textures = this.anMidSit;
						this.sprite.loop = false;

						if( !this.sprite.playing )
						{
							this.sprite.textures = this.anSit;
							this.sprite.loop = true;
							this.sprite.play();
						}
					}
				}
				else
				{
					this.stateCounter--;
					if( this.sprite && this.sprite.textures != this.anStand )
					{
						this.sprite.textures = this.anStand;
					}
				}
			}

	/*		if(dist > 24 && this.sprite != undefined)
			{
				this.sprite.position.y+=5;
				this.y = this.sprite.position.y;
			}*/
		}
	};

	addAnimation(frames:number[],base:string)
	{
		var textures = [];
		for(var i in frames)
		{
			var texture = PIXI.Texture.fromFrame(base + "_" + frames[i] + ".png");
			textures.push(texture);
		}
		return textures;
	}
};