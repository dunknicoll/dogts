var Dog = (function () {
    function Dog(stage, x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.stage = stage;
        this.loader = new PIXI.AssetLoader([
            "../atlases/pixdog.json"
        ]);
        this.loader.onComplete = this.onAtlasLoaded.bind(this);
        this.loader.load();
        this.frames = [];
        this.x = x;
        this.y = y;
    }
    Dog.prototype.onAtlasLoaded = function () {
        var texs = [];
        for(var i = 0; i < 4; i++) {
            var texture = PIXI.Texture.fromFrame("dog_" + (i + 1) + ".png");
            this.frames.push(texture);
        }
        ;
        this.sprite = new PIXI.MovieClip(this.frames);
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 5;
        this.sprite.scale.y = 5;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.stage.addChild(this.sprite);
    };
    return Dog;
})();
;
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    };
})();
var Annyeong = (function () {
    function Annyeong() {
        this.renderer = new PIXI.WebGLRenderer(800, 600);
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Stage();
        this.dog = new Dog(this.stage, 50, 50);
        this.tick();
    }
    Annyeong.prototype.tick = function () {
        this.renderer.render(this.stage);
        requestAnimationFrame(this.tick.bind(this));
    };
    return Annyeong;
})();
var game = new Annyeong();
