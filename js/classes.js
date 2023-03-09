class Sprite {
    constructor({ pos, imageSrc, scale=1,framesMax = 1}) {
        this.position = pos;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold=10;





    }

    draw() {
        ctx.drawImage(this.image,this.framesCurrent * (this.image.width/ this.framesMax),0, this.image.width / this.framesMax, this.image.height, this.position.x, this.position.y,(this.image.width / this.framesMax )* this.scale, this.image.height * this.scale)
    }


    update() {
        this.draw();
        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold == 0){
        
            if(this.framesCurrent < this.framesMax -1){
                this.framesCurrent++;
            }
            else{
                this.framesCurrent = 0;
            }
        }

    }


}

class Fighter {
    constructor({ pos, vel, color = 'red', offset }) {
        this.position = pos;
        this.velocity = vel;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.color = color;
        this.canJump = true;
        this.canAttack = false;
        this.isAttacking = false;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,

            },
            offset,
            width: 120,
            height: 50
        }
        this.health = 100;

    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);


        if (this.isAttacking) {
            ctx.fillStyle = 'white';
            ctx.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y + 10,
                this.attackBox.width,
                this.attackBox.height);
        }

    }


    update() {
        this.draw();


        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;


        if (this.position.y + this.height >= canvas.height - 96) {
            this.canJump = true;
            this.velocity.y = 0;
            this.position.y = 330;
        } else {
            this.velocity.y += gravity;
        }
    }




    attack() {
        this.isAttacking = true;



        setTimeout(() => {
            this.isAttacking = false;
        }, 100);


    }

}