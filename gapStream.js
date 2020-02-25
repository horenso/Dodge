class GapStream {
    constructor() {
        this.gapArray;
        this.currentGapIndex = 0;
        this.currentGap = null;
        this.initArray(); 
    }

    initArray() {
        this.gapArray = new Array(GAPARRAYLENGTH);
        this.gapArray[0] = new Gap(null);
        for (let i = 1; i < GAPARRAYLENGTH; i++) {
            var newGap = new Gap(this.gapArray[i - 1]);
            this.gapArray[i] = newGap;
        }
        this.currentGap = this.gapArray[this.currentGapIndex];
    }

    update() {
        this.gapArray.forEach(element => {
            element.move();
        });
        this.updateCurrentGap();
    }

    draw() {
        this.gapArray.forEach(element => {
            element.draw();
        });
    }

    updateCurrentGap() {
        if (this.currentGap.y - GAPHEIGHT / 2 - 20 > HEIGHT) {
            score++;
            let nextIndex = (this.currentGapIndex + 1) % GAPARRAYLENGTH;
            let previousGap = this.gapArray[(this.currentGapIndex - 1 + GAPARRAYLENGTH) % GAPARRAYLENGTH];
            this.gapArray[this.currentGapIndex] = new Gap(previousGap);
            this.currentGapIndex = (this.currentGapIndex + 1) % GAPARRAYLENGTH;
            this.currentGap = this.gapArray[this.currentGapIndex];
        }
    }

    checkCollition(player) {
        return this.currentGap.checkCollition(player);
    }

    currentGapY() {
        return this.currentGap.y;
    }
}