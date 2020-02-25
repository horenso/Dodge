class Player {
    
    constructor() {
        this.x;
        this.reset();
        this.hit = false;
        this.life = 100;
        this.slowMoEnergy = 100;
    }

    reset() {
        this.x = WIDTH / 2;
    }

    move(amount) {
        this.x += amount;
        this.x = constrain(this.x, PLAYERSIZE / 2, WIDTH - PLAYERSIZE / 2);
    }

    draw() {
        this.changeSlowMoEnergy(SLOWMORECHARGESPEED);
        strokeWeight(1);
        rectMode(CORNER);
        // background square
        fill('white');
        square(this.x - PLAYERSIZE / 2, HEIGHT - PLAYERSIZE, PLAYERSIZE);

        // life square
        if (this.hit) {
            fill('red');
            this.life -= DAMAGE;
            if (this.life <= 0.0) {
                gameState = State.LOST;
            }
        } else {
            fill('darkgreen');
        }

        rect(this.x - PLAYERSIZE / 2, HEIGHT - PLAYERSIZE / 2, PLAYERSIZE * this.life * 0.01, PLAYERSIZE / 4);

        // slowMo energy

        fill('blue');
        rect(this.x - PLAYERSIZE / 2, HEIGHT - PLAYERSIZE / 4, PLAYERSIZE * this.slowMoEnergy * 0.01, PLAYERSIZE / 4);

        // shell 
        noFill();
        square(this.x - PLAYERSIZE / 2, HEIGHT - PLAYERSIZE, PLAYERSIZE);
    }

    canSlowMo() {
        if (this.slowMoEnergy > SLOWMOMINIMAL) {
            this.changeSlowMoEnergy(SLOWMOCOST)
            if (this.slowMoEnergy < 0) {
                this.slowMoEnergy = 0;
            }
            return true;
        } else {
            return false;
        }
    }

    changeSlowMoEnergy(amount) {
        this.slowMoEnergy = constrain(this.slowMoEnergy + amount, 0, 100);
    }
}