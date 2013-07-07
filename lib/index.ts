/// <reference path="PIXI.d"/>
/// <reference path="keyboard" />
/// <reference path="dog"/>

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

class Annyeong {

	renderer 	:	any;
	stage 		:	any;

	dog 		:	Dog;

	kbHandler	: 	KeyboardHandler;

	constructor()
	{
		this.kbHandler 			= new KeyboardHandler( window );
		this.kbHandler.capture 	= true;

	    this.renderer = new PIXI.WebGLRenderer(800, 600); 

	    this.stage = new PIXI.Stage;
	    this.dog = new Dog(this.stage,this.kbHandler,50,50);

	    //this.kbHandler.slowKey( 39, this.moveDogRight.bind(this) );
	    //this.kbHandler.slowKey( 37, this.moveDogLeft.bind(this) );

	    document.body.appendChild(this.renderer.view);
	    this.tick();
	};

	tick()
	{
		this.renderer.render(this.stage);
		this.dog.update();
        requestAnimationFrame( this.tick.bind(this) );
	};
}

var game = new Annyeong;