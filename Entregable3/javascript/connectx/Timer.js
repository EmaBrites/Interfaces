import Gametext from "./GameText.js";

export default class Timer extends Gametext {

    minutes = 0;
    seconds = 0;
    interval

    constructor(posX, posY,time) {
        super(posX, posY,"0:0");
        this.countDown = time;
        this.finished = false;
        this.interval = setInterval(() => {

            this.countDown -= 1000;
            this.minutes = Math.floor((this.countDown % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.countDown % (1000 * 60)) / 1000);
            
            if (this.countDown < 0) {
                clearInterval(this.interval);
                this.finished = true;
            }

        }, 1000);
    }

    draw(context) {
        super.setText(this.minutes + ":" + this.seconds);
        super.draw(context);
    }

    isOver() {
        return this.finished;
    }
}