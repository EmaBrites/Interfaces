export default class Timer{

    minutes=0;
    seconds=0;
    interval

    constructor(posX, posY){
        this.posX = posX
        this.posY = posY
        this.countDown = 60000;
        this.finished = false;
        this.interval = setInterval(() => {

            this.countDown -= 1000;
            this.minutes = Math.floor((this.countDown % (1000 * 60 * 60)) / (1000 * 60));
            this.seconds = Math.floor((this.countDown % (1000 * 60)) / 1000);

            if (this.countDown < 0) {
                console.log("Time is over");
                clearInterval(this.interval);
                this.finished = true;
            }

        }, 1000);
    }

    draw(context) {
        context.fillStyle = "white";
        context.font = "30px Silkscreen";
        context.fillText(this.minutes+":"+this.seconds, this.posX, this.posY);
    }

    isOver(){
        return this.finished;
    }
}