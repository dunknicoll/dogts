///<reference path="PIXI.d.ts"/>

(function() {
  // You can use either PIXI.WebGLRenderer or PIXI.CanvasRenderer
    var renderer = new PIXI.WebGLRenderer(800, 600); 

    document.body.appendChild(renderer.view);

    var stage = new PIXI.Stage;

    requestAnimationFrame(animate);

    function animate() {

        renderer.render(stage);

        requestAnimationFrame(animate);
    }
}());

