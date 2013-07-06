/// <reference path="PIXI.d.ts"/>
/// <reference path="dog.ts"/>

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

	constructor()
	{
	  // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
	    this.renderer = new PIXI.WebGLRenderer(800, 600); 

	    document.body.appendChild(this.renderer.view);

	    this.stage = new PIXI.Stage;

	    this.dog = new Dog(this.stage, 50,50);

	    this.tick();
	};

	tick()
	{
		this.renderer.render(this.stage);

        requestAnimationFrame( this.tick.bind(this) );
	};

}

var game = new Annyeong;