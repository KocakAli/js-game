class Sprite {
    constructor({ pos, imageSrc }) {
        this.position = pos;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;





    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }


    update() {
        this.draw();
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


        if (this.position.y + this.height >= canvas.height) {
            this.canJump = true;
            this.velocity.y = 0;
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