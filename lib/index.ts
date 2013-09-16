/// <reference path="PIXI.d"/>
/// <reference path="PolyK.d"/>
/// <reference path="keyboard" />
/// <reference path="dog"/>
/// <reference path="helper"/>

var requestAnimFrame: (callback: () => void) => void = (function(){ 
  return window.requestAnimationFrame || 
  (<any>window).webkitRequestAnimationFrame || 
  (<any>window).mozRequestAnimationFrame || 
  (<any>window).oRequestAnimationFrame || 
  window.msRequestAnimationFrame || 
  function(callback){ 
      window.setTimeout(callback, 1000 / 60, new Date().getTime()); 
  }; 
})();

declare var PolyK;

class Annyeong {

	renderer 	:	any;
	stage 		:	any;

	dog 		:	Dog;

	kbHandler	: 	KeyboardHandler;
	platform	: 	any;
	poly 		: 	any;
	marker		:	any;
	isc			: 	any;

	constructor()
	{
		this.kbHandler 			= new KeyboardHandler( window );
		this.kbHandler.capture 	= true;

	    this.renderer = new PIXI.WebGLRenderer(800, 600);

	    this.poly = [50, 362, 213, 342, 421, 284, 536, 272, 659, 272, 772, 280, 886, 342, 963, 394, 963, 430, 55, 430, 50, 362];

	    this.platform = new DPoly(this.poly,"0x0000FF");

	    this.stage = new PIXI.Stage;
	    this.dog = new Dog(this.stage,this.kbHandler,50,50);
	    this.stage.addChild(this.platform);

	    this.isc = new PolyK.ClosestEdge(this.poly, this.dog.x, this.dog.y);
	    this.marker = new PIXI.Graphics();
	    this.stage.addChild(this.marker);

	    //this.kbHandler.slowKey( 39, this.moveDogRight.bind(this) );
	    //this.kbHandler.slowKey( 37, this.moveDogLeft.bind(this) );

	    document.body.appendChild(this.renderer.view);
	    this.tick();
	};

	tick()
	{
		this.renderer.render(this.stage);

		this.isc = new PolyK.ClosestEdge(this.poly, this.dog.x, this.dog.y);

	    this.marker.clear();
	    this.marker.beginFill("0xFF0000");
	    this.marker.lineStyle(3, 0xFF0000);
		if(this.isc.edge<<1 == this.poly.length-2)
		{
			this.marker.moveTo(this.poly[this.isc.edge*2+0], this.poly[this.isc.edge*2+1]);
			this.marker.lineTo(this.poly[0], this.poly[1]);

		}
		else
		{
			this.marker.moveTo(this.poly[this.isc.edge*2+0], this.poly[this.isc.edge*2+1]);
			this.marker.lineTo(this.poly[this.isc.edge*2+2], this.poly[this.isc.edge*2+3]);
		}

		this.dog.update(this.isc);
		
		this.marker.lineStyle(3, 0xFF0000);
		this.marker.moveTo(this.dog.x, this.dog.y);
		this.marker.lineTo(this.isc.point.x, this.isc.point.y);
		this.marker.endFill();

        requestAnimationFrame( this.tick.bind(this) );
	};
}

var game = new Annyeong;