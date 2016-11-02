
class TileMap extends egret.DisplayObjectContainer {

    public static TILE_SIZE: number = 64;
    _player: Player;
    _block: egret.Bitmap;
    _astar: AStar;
    public _i: number;
    moveX: number[] = [];
    moveY: number[] = [];

    constructor(player: Player) {
        super();
        this.init();
        this._player = player;
        this._i = 0;
    }


    private init() {

        for (var i = 0; i < config.length; i++) {
            var data = config[i];
            var tile = new Tile(data);
            this.addChild(tile);
        }


        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, (e: egret.TouchEvent) => {
            var localX = e.localX;
            var localY = e.localY;
            var playerX = Math.floor(this._player._body.x / TileMap.TILE_SIZE);
            var playerY = Math.floor(this._player._body.y / TileMap.TILE_SIZE);
            var gridX = Math.floor(localX / TileMap.TILE_SIZE);
            var gridY = Math.floor(localY / TileMap.TILE_SIZE);
            this._astar = new AStar();
            var grid = new Grid(12, 12, config);
            grid.setStartNode(playerX, playerY);
            grid.setEndNode(gridX, gridY);
            if (this._astar.findPath(grid)) {
                this._astar._path.map((tile) => {
                    console.log(`x:${tile.x},y:${tile.y}`)
                });

                this._i = 1;
                this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
                this._player.move(this.moveX[this._i], this.moveY[this._i]);
                egret.Tween.get(this._player._body).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._player.idle() }, this);
                var timer: egret.Timer = new egret.Timer(1000, this._astar._path.length-2);
                //注册事件侦听器
                timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
                //开始计时
                timer.start();
            }
        }, this);
    }

    private timerFunc() {
        this._i++;
        this.moveX[this._i] = this._astar._path[this._i].x * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
        this.moveY[this._i] = this._astar._path[this._i].y * TileMap.TILE_SIZE + TileMap.TILE_SIZE / 2;
        this._player.move(this.moveX[this._i], this.moveY[this._i]);
        egret.Tween.get(this._player._body).to({ x: this.moveX[this._i], y: this.moveY[this._i] }, 600).wait(10).call(function () { this._player.idle() }, this);
    }
    private timerComFunc() {
        console.log("计时结束");
    }
}

var config: TileData[] = [

    { x: 0, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 0, walkable: true, image: "zhangai_jpg" },
    { x: 3, y: 0, walkable: false, image: "zhangai_jpg"},
    { x: 4, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 0, walkable: false, image: "zhangai_jpg" },
    { x: 6, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 0, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 0, walkable: false, image: "zhangai_jpg" },


    
    { x: 0, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 3, y: 1, walkable: false, image: "zhangai_jpg"},
    { x: 4, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 1, walkable: false, image: "zhangai_jpg" },
    { x: 6, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 1, walkable: false, image: "zhangai_jpg" },
    { x: 8, y: 1, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 1, walkable: true, image: "Floor_jpg" },


    { x: 0, y: 2, walkable: false, image: "zhangai_jpg" },
    { x: 1, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 3, y: 2, walkable: true, image: "Floor_jpg"},
    { x: 4, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 2, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 2, walkable: false, image: "zhangai_jpg"},


    { x: 0, y: 3, walkable: false, image: "zhangai_jpg"},
    { x: 1, y: 3, walkable: true, image: "Floor_jpg"},
    { x: 2, y: 3, walkable: false, image: "zhangai_jpg"},
    { x: 3, y: 3, walkable: false, image: "zhangai_jpg"},
    { x: 4, y: 3, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 3, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 3, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 3, walkable: false, image: "zhangai_jpg"},
    { x: 8, y: 3, walkable: false, image: "zhangai_jpg"},
    { x: 9, y: 3, walkable: true, image: "Floor_jpg"},

    
    { x: 0, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 3, y: 4, walkable: false, image: "zhangai_jpg"},
    { x: 4, y: 4, walkable: false, image: "zhangai_jpg" },
    { x: 5, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 4, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 4, walkable: false, image: "zhangai_jpg"},
    { x: 9, y: 4, walkable: true, image: "Floor_jpg" },

    { x: 0, y: 5, walkable: false, image: "zhangai_jpg"},
    { x: 1, y: 5, walkable: false, image: "zhangai_jpg" },
    { x: 2, y: 5, walkable: true, image: "Floor_jpg" },
    { x: 3, y: 5, walkable: false, image: "Floor_jpg"},
    { x: 4, y: 5, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 5, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 5, walkable: false, image: "zhangai_jpg"},
    { x: 7, y: 5, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 5, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 5, walkable: true, image: "Floor_jpg" },


    { x: 0, y: 6, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 6, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 6, walkable: false, image: "zhangai_jpg" },
    { x: 3, y: 6, walkable: true, image: "Floor_jpg"},
    { x: 4, y: 6, walkable: false, image: "zhangai_jpg"  },
    { x: 5, y: 6, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 6, walkable: false, image: "zhangai_jpg"},
    { x: 7, y: 6, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 6, walkable: false, image: "zhangai_jpg"},
    { x: 9, y: 6, walkable: false, image: "zhangai_jpg"},


    { x: 0, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 7, walkable: false, image: "zhangai_jpg"},
    { x: 3, y: 7, walkable: true, image: "Floor_jpg"},
    { x: 4, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 7, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 7, walkable: false, image: "zhangai_jpg"},
    { x: 9, y: 7, walkable: true, image: "Floor_jpg" },

    { x: 0, y: 8, walkable: false, image: "zhangai_jpg" },
    { x: 1, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 3, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 4, y: 8, walkable: false, image: "zhangai_jpg" },
    { x: 5, y: 8, walkable: false, image: "zhangai_jpg" },
    { x: 6, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 8, y: 8, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 8, walkable: false, image: "zhangai_jpg"},


    { x: 0, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 1, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 2, y: 9, walkable: false, image: "zhangai_jpg"},
    { x: 3, y: 9, walkable: false, image: "zhangai_jpg"},
    { x: 4, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 5, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 6, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 7, y: 9, walkable: false, image: "zhangai_jpg"},
    { x: 8, y: 9, walkable: true, image: "Floor_jpg" },
    { x: 9, y: 9, walkable: true, image: "Floor_jpg" },

]



interface TileData {
    x: number;
    y: number;
    walkable: boolean;
    image: string;

}

class Tile extends egret.DisplayObjectContainer {

    data: TileData;

    constructor(data: TileData) {
        super();
        this.data = data;
        var bitmap = new egret.Bitmap();
        bitmap.texture = RES.getRes(data.image);
        bitmap.width = 64;
        bitmap.height = 64;
        this.x = data.x * TileMap.TILE_SIZE;
        this.y = data.y * TileMap.TILE_SIZE;
        this.addChild(bitmap);

    }
}




