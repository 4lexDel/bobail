class Game extends GameBase { //A renommer ?
    constructor(canvas, fullscreen = true) {
        super(canvas, fullscreen)

        this.init();
    }

    init() {
        this.resize();

        this.initMap(5, 5);

        this.initEvent();

        /*---------Draw settings----------*/
        this.FPS = 15;
        this.prevTick = 0;
        this.draw();
    }

    initMap(sizeX, sizeY) {
        this.map = new Tilemap(sizeX, sizeY, this.canvas.width, this.canvas.height);

        let voidTile = new TileSet(0, "rgb(240,240,240)");
        let cellTile = new TileSet(1, "black", TileSet.FILL_ELLIPSE);

        this.map.addTileSet(voidTile);
        this.map.addTileSet(cellTile);
    }

    initEvent() {
        this.startDrag = false;

        this.canvas.onmousedown = (e) => {
            this.startDrag = true;
            this.mouseEditMap(e);
        }

        this.canvas.onmousemove = (e) => {
            if (this.startDrag) {
                this.mouseEditMap(e);
            }
        }

        this.canvas.onmouseup = (e) => {
            if (this.startDrag) {
                this.startDrag = false;
                this.mouseEditMap(e);
            }
        }

        this.canvas.addEventListener('touchstart', (e) => {
            this.startDrag = true;

            this.touchEditMap(e);
        }, false);

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.startDrag) {
                this.touchEditMap(e);
            }

        }, false);

        this.canvas.addEventListener('touchend', (e) => {
            this.startDrag = false;

            this.touchEditMap(e);
        }, false);

        window.onresize = (e) => {
            this.resize();
            this.map.resize(this.canvas.width, this.canvas.height); //DRY !!
            //this.draw();
        };

        // document.addEventListener("keyup", (e) => { //KEYBOARD EVENT
        //     //console.log(e.key);

        //     switch (e.key) {
        //         case "Enter":
        //             this.start = !this.start;
        //             break;

        //         case "ArrowUp":
        //         case "ArrowDown":
        //             this.map.writeLine(1, false);
        //             this.start = false;
        //             break;

        //         case "ArrowRight":
        //         case "ArrowLeft":
        //             this.map.writeLine(1, true);
        //             this.start = false;
        //             break;

        //         case "Backspace":
        //             this.start = false;
        //             this.map.resetGrid();
        //             break;
        //     }
        // });
    }

    mouseEditMap(e) {
        let coord = MouseControl.getMousePos(this.canvas, e);
        let val = e.which == 1 ? 1 : 0;
        this.map.setTileID(coord.x, coord.y, val);
        //this.draw();
    }

    touchEditMap(e) {
        let coord = TouchControl.getTouchPos(this.canvas, e);
        this.map.setTileID(coord.x, coord.y, 1);
    }

    draw() {
        /*------------------------------FPS-----------------------------*/
        window.requestAnimationFrame(() => this.draw());

        let now = Math.round(this.FPS * Date.now() / 1000);
        if (now == this.prevTick) return;
        this.prevTick = now;
        /*--------------------------------------------------------------*/

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.width);

        if (this.map != null) this.map.display(this.ctx);
    }
}