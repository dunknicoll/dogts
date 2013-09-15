/// <reference path="PIXI.d" />
class DPoly
{
	points	: any;
	color 	: string;

	constructor( pnts:any, colr:string = "0xFF0000" )
	{
		this.points = pnts;
		this.color = colr;
		
		var graphics = new PIXI.Graphics();
	    graphics.beginFill(this.color);
	    var p1 = this.points.shift();
	    var p2 = this.points.shift();
	    graphics.moveTo(p1,p2);
	    var pointer = 2;
	    for(var i=0; i<this.points.length/2; i++)
		{
			var px = this.points[2*i];
			var py = this.points[2*i+1];
			graphics.lineTo(px, py);
		}
	    graphics.endFill();

	    return graphics;
	}
}