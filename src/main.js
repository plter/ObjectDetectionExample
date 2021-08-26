import Dialog from "./Dialog"

const Main = {
    async init() {
        this._player = document.querySelector("#player");
        this._overlay = document.querySelector("#overlay");
        this._context2d = this._overlay.getContext("2d");

        let pd = Dialog.showLoading("正在加载模型");
        this._model = await this.loadModel();
        this._player.style.display = "block";
        pd.modal("hide");
        console.debug(this._model);

        this._detectFunc = this.detect.bind(this);
        this.detect();
    },

    async loadModel() {
        return await cocoSsd.load({ modelUrl: "model/model.json" });
    },

    async detect() {
        try {
            let r = await this._model.detect(this._player);
        } catch (e) { }

        this._context2d.clearRect(0, 0, this._overlay.width, this._overlay.height);
        this._context2d.strokeStyle = "#0f0";
        this._context2d.fillStyle = "#f00";
        for (let b of r) {
            this._context2d.strokeRect(b.bbox[0], b.bbox[1], b.bbox[2], b.bbox[3]);
            this._context2d.fillText(`${b.class} ${b.score.toFixed(2)}`, b.bbox[0], b.bbox[1]);
            console.debug(`${b.class} ${b.score} \nx:${b.bbox[0]} \ny:${b.bbox[1]} \nwidth:${b.bbox[2]} \nheight:${b.bbox[3]}`);
        }

        requestAnimationFrame(this._detectFunc);
    }
};

Main.init();