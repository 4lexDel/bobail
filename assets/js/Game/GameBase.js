class GameBase {
    constructor(canvas, fullscreen = true) {
        this.canvas = canvas;

        this.ctx = this.canvas.getContext("2d");

        window.onresize = (e) => {
            this.canvas.resize();
        };
    }

    resize() {
        if (this.fullscreen) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
        } else {
            this.canvas.width = this.canvas.offsetParent.clientWidth;
            this.canvas.height = this.canvas.offsetParent.clientHeight;
        }

        // this.canvas.width = document.documentElement.clientWidth;
        // this.canvas.height = document.documentElement.clientHeight;
    }


}