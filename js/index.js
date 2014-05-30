var EventDispatcher = (function () {
    function EventDispatcher() { }
    EventDispatcher.prototype.addEventListener = function (type, listener) {
        if(this._listeners === undefined) {
            this._listeners = {
            };
        }
        var listeners = this._listeners;
        if(listeners[type] === undefined) {
            listeners[type] = [];
        }
        if(listeners[type].indexOf(listener) === -1) {
            listeners[type].push(listener);
        }
    };
    EventDispatcher.prototype.hasEventListener = function (type, listener) {
        if(this._listeners === undefined) {
            return false;
        }
        var listeners = this._listeners;
        if(listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1) {
            return true;
        }
        return false;
    };
    EventDispatcher.prototype.removeEventListener = function (type, listener) {
        if(this._listeners === undefined) {
            return;
        }
        var listeners = this._listeners;
        var index = listeners[type].indexOf(listener);
        if(index !== -1) {
            listeners[type].splice(index, 1);
        }
    };
    EventDispatcher.prototype.dispatchEvent = function (event) {
        if(this._listeners === undefined) {
            return;
        }
        var listeners = this._listeners;
        var listenerArray = listeners[event.type];
        if(listenerArray !== undefined) {
            event.target = this;
            for(var i = 0, l = listenerArray.length; i < l; i++) {
                listenerArray[i].call(this, event);
            }
        }
    };
    return EventDispatcher;
})();
;
var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var KeyboardHandler = (function (_super) {
    __extends(KeyboardHandler, _super);
    function KeyboardHandler(focus) {
        _super.call(this);
        this.focus = focus;
        this.logging = false;
        this.capture = false;
        this.keys = [];
        this.callbacks = [];
        this.focus.addEventListener('keydown', this.handleKeyDown.bind(this));
        this.focus.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    KeyboardHandler.prototype.handleKeyDown = function (e) {
        this._setKey(e);
        if(this.callbacks[e.keyCode]) {
            if(this.capture) {
                e.preventDefault();
            }
            this.callbacks[e.keyCode].call();
        }
    };
    KeyboardHandler.prototype.handleKeyUp = function (e) {
        if(this.capture) {
            e.preventDefault();
        }
        this._resetKey(e);
    };
    KeyboardHandler.prototype._setKey = function (e) {
        if(this.logging) {
            console.log(e.keyCode);
        }
        this.keys[e.keyCode] = true;
    };
    KeyboardHandler.prototype._resetKey = function (e) {
        this.keys[e.keyCode] = false;
    };
    KeyboardHandler.prototype.key = function (id) {
        return this.keys[id];
    };
    KeyboardHandler.prototype.slowKey = function (id, callback) {
        this.callbacks[id] = callback;
    };
    return KeyboardHandler;
})(EventDispatcher);
var Dog = (function () {
    function Dog(stage, kbHandler, x, y) {
        if (typeof x === "undefined") { x = 0; }
        if (typeof y === "undefined") { y = 0; }
        this.stage = stage;
        this.stateCounter = 0;
        this.resetCounter = 100;
        this.kbHandler = kbHandler;
        this.loader = new PIXI.AssetLoader([
            "dogts/atlases/pixdog.json"
        ]);
        this.loader.onComplete = this.onAtlasLoaded.bind(this);
        this.loaded = false;
        this.loader.load();
        this.x = x;
        this.y = y;
    }
    Dog.prototype.onAtlasLoaded = function () {
        this.anSit = this.addAnimation([
            9, 
            10, 
            9, 
            11
        ], "dog");
        this.anStand = this.addAnimation([
            5, 
            6, 
            5, 
            7
        ], "dog");
        this.anWalk = this.addAnimation([
            1, 
            2, 
            3, 
            4
        ], "dog");
        this.anMidSit = this.addAnimation([
            8, 
            8, 
            8, 
            8, 
            8, 
            8, 
            8, 
            8, 
            8, 
            8
        ], "dog");
        this.anJump = this.addAnimation([
            14, 
            14, 
            14, 
            14, 
            14, 
            14
        ], "dog");
        this.anFall = this.addAnimation([
            15, 
            15, 
            15, 
            15, 
            15, 
            15
        ], "dog");
        this.sprite = new PIXI.MovieClip(this.anSit);
        this.sprite.position.x = this.x;
        this.sprite.position.y = this.y;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 5;
        this.sprite.scale.y = 5;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.stage.addChild(this.sprite);
        this.loaded = true;
    };
    Dog.prototype.update = function (isc) {
        if(this.loaded) {
            var angle = Math.atan(isc.norm.y / isc.norm.x);
            angle -= 1.57;
            if(angle <= -1.57) {
                angle -= 3.14;
            }
            this.sprite.rotation = angle;
            console.log(this.sprite.rotation);
            if(this.kbHandler.key(40)) {
                this.sprite.position.y += 7;
                this.x = this.sprite.position.x;
                this.y = this.sprite.position.y;
            } else if(this.kbHandler.key(38)) {
                this.sprite.position.y -= 7;
                this.x = this.sprite.position.x;
                this.y = this.sprite.position.y;
            }
            if(this.kbHandler.key(39)) {
                if(this.sprite.scale.x != 5) {
                    this.sprite.scale.x = 5;
                }
                this.sprite.position.x += 7;
                this.x = this.sprite.position.x;
                this.y = this.sprite.position.y;
                if(this.sprite.textures != this.anWalk) {
                    this.sprite.textures = this.anWalk;
                }
                this.stateCounter = this.resetCounter;
            } else if(this.kbHandler.key(37)) {
                if(this.sprite.scale.x != -5) {
                    this.sprite.scale.x = -5;
                }
                this.sprite.position.x -= 7;
                this.x = this.sprite.position.x;
                this.y = this.sprite.position.y;
                if(this.sprite.textures != this.anWalk) {
                    this.sprite.textures = this.anWalk;
                }
                this.stateCounter = this.resetCounter;
            } else {
                if(this.stateCounter == 0) {
                    this.stateCounter = 0;
                    if(this.sprite && this.sprite.textures != this.anSit) {
                        this.sprite.textures = this.anMidSit;
                        this.sprite.loop = false;
                        if(!this.sprite.playing) {
                            this.sprite.textures = this.anSit;
                            this.sprite.loop = true;
                            this.sprite.play();
                        }
                    }
                } else {
                    this.stateCounter--;
                    if(this.sprite && this.sprite.textures != this.anStand) {
                        this.sprite.textures = this.anStand;
                    }
                }
            }
        }
    };
    Dog.prototype.addAnimation = function (frames, base) {
        var textures = [];
        for(var i in frames) {
            var texture = PIXI.Texture.fromFrame(base + "_" + frames[i] + ".png");
            textures.push(texture);
        }
        return textures;
    };
    return Dog;
})();
;
var DPoly = (function () {
    function DPoly(pnts, colr) {
        if (typeof colr === "undefined") { colr = "0xFF0000"; }
        this.points = pnts;
        this.color = colr;
        var graphics = new PIXI.Graphics();
        graphics.beginFill(this.color);
        var p1 = this.points.shift();
        var p2 = this.points.shift();
        graphics.moveTo(p1, p2);
        var pointer = 2;
        for(var i = 0; i < this.points.length / 2; i++) {
            var px = this.points[2 * i];
            var py = this.points[2 * i + 1];
            graphics.lineTo(px, py);
        }
        graphics.endFill();
        return graphics;
    }
    return DPoly;
})();
var requestAnimFrame = (function () {
    return window.requestAnimationFrame || (window).webkitRequestAnimationFrame || (window).mozRequestAnimationFrame || (window).oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60, new Date().getTime());
    };
})();
var Annyeong = (function () {
    function Annyeong() {
        this.kbHandler = new KeyboardHandler(window);
        this.kbHandler.capture = true;
        this.renderer = new PIXI.WebGLRenderer(800, 600);
        this.poly = [
            50, 
            362, 
            213, 
            342, 
            421, 
            284, 
            536, 
            272, 
            659, 
            272, 
            772, 
            280, 
            886, 
            342, 
            963, 
            394, 
            963, 
            430, 
            55, 
            430, 
            50, 
            362
        ];
        this.platform = new DPoly(this.poly, "0x0000FF");
        this.stage = new PIXI.Stage();
        this.dog = new Dog(this.stage, this.kbHandler, 50, 50);
        this.stage.addChild(this.platform);
        this.isc = new PolyK.ClosestEdge(this.poly, this.dog.x, this.dog.y);
        this.marker = new PIXI.Graphics();
        this.stage.addChild(this.marker);
        document.body.appendChild(this.renderer.view);
        this.tick();
    }
    Annyeong.prototype.tick = function () {
        this.renderer.render(this.stage);
        this.isc = new PolyK.ClosestEdge(this.poly, this.dog.x, this.dog.y);
        this.marker.clear();
        this.marker.beginFill("0xFF0000");
        this.marker.lineStyle(3, 0xFF0000);
        if(this.isc.edge << 1 == this.poly.length - 2) {
            this.marker.moveTo(this.poly[this.isc.edge * 2 + 0], this.poly[this.isc.edge * 2 + 1]);
            this.marker.lineTo(this.poly[0], this.poly[1]);
        } else {
            this.marker.moveTo(this.poly[this.isc.edge * 2 + 0], this.poly[this.isc.edge * 2 + 1]);
            this.marker.lineTo(this.poly[this.isc.edge * 2 + 2], this.poly[this.isc.edge * 2 + 3]);
        }
        this.dog.update(this.isc);
        this.marker.lineStyle(3, 0xFF0000);
        this.marker.moveTo(this.dog.x, this.dog.y);
        this.marker.lineTo(this.isc.point.x, this.isc.point.y);
        this.marker.endFill();
        requestAnimationFrame(this.tick.bind(this));
    };
    return Annyeong;
})();
var game = new Annyeong();
