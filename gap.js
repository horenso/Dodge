class Gap {
    constructor(previousGap) {
        if (previousGap === null) {
            this.x = WIDTH / 2;
            this.y = 300 - GAPHEIGHT / 2;
        } else {
            this.x = random(previousGap.x - MAXOFFSET, previousGap.x + MAXOFFSET);
            this.x = constrain(this.x, 0 + GAPWIDTH / 2, WIDTH - GAPWIDTH / 2);
            this.y = previousGap.y - GAPDISTANCE;
        }
    }

    draw() {
        fill('white');
        strokeWeight(1);
        rectMode(CORNER);
        rect(0, this.y - GAPHEIGHT / 2, this.x - GAPWIDTH / 2, GAPHEIGHT);
        rect(this.x + GAPWIDTH / 2, this.y - GAPHEIGHT / 2, WIDTH, GAPHEIGHT);
        // circle(WIDTH / 2, this.y + GAPHEIGHT / 2, 4);
        // circle(WIDTH / 2, HEIGHT - PLAYERSIZE, 4);
    }

    move() {
        this.y += obstacleSpeed * gameSpeed * deltaTime;
    }

    checkCollition(player) {
        // lower edge of the obstacle is at least on the same y as the player
        // and upper edge of the obstacle has not crossed the upper edge of the player
        // and the player is within the gap
        player.hit = ( (this.y + GAPHEIGHT / 2 >= HEIGHT - PLAYERSIZE) && 
                       (this.y - GAPHEIGHT / 2 < HEIGHT) && 
                       (Math.abs(player.x - this.x) > ((GAPWIDTH - PLAYERSIZE) / 2)));
    }
}