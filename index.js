let showMessage = function (target, message, index, interval) {
    if (index < message.length) {
        $(target).append(message[index++]);
        let timeout = setTimeout(function () { showMessage(target, message, index, interval); }, interval);
    } else {

        $('.start').css('display', 'block');
    }
};


// Path: portfolio\index.js
// when button is clicked, show message
$('.start').click(function () {
    let message = "Hello World! I'm a web developer. I'm currently looking for a job. I'm also looking for a me.";
    $('#nav').html('');
    showMessage('#nav', message, 0, 50);
    $(this).css('display', 'none');
});

// Html Canvas and Javascript
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, 1024, 576);

const gravity = 0.7;



const background = new Sprite({
    pos:{
        x: 0,
        y: 0
    },
    imageSrc: './background.png',
})

const shop = new Sprite({
    pos:{
        x: 600,
        y:130,
    },
    imageSrc: './shop.png',
    scale: 2.75,
    framesMax : 6,
})


const player = new Fighter({
    pos: {
        x: 200,
        y: 100
    },
    vel: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0
    }

});




const enemy = new Fighter({
    pos: {
        x: 750,
        y: 100
    },
    vel: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: -70,
        y: 0
    }

});

const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
    ArrowUp: {
        pressed: false,
    },
    ArrowRight: {
        pressed: false,
    },
    ArrowLeft: {
        pressed: false,
    },



}





// game loop
function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    background.update();
    shop.update();
    player.update();
    enemy.update();


    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // player movement
    if (keys.a.pressed && player.lastKey === 'a') {
        if (player.position.x > 0) {
            player.velocity.x = -5;
        }

    } else if (keys.d.pressed && player.lastKey === 'd') {
        if (player.position.x < canvas.width - player.width) {
            player.velocity.x = 5;
        }


    }

    // enemy movement
    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        if (enemy.position.x > 0) {
            enemy.velocity.x = -5;
        }

    } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        if (enemy.position.x < canvas.width - enemy.width) {
            enemy.velocity.x = 5;
        }

    }





    // player attack
    if (player.isAttacking) {


        if (rectangularCollision({ rectangle1: player, rectangle2: enemy })
            && player.isAttacking
        ) {
            player.isAttacking = false;
            let enemyHealth = document.querySelector('#enemyHealth');
            enemyHealth.style.width = `${enemy.health -= 20}%`;
        }

    }

    if (enemy.isAttacking) {


        if (rectangularCollision({ rectangle1: enemy, rectangle2: player })
            && enemy.isAttacking
        ) {
            enemy.isAttacking = false;
            let enemyHealth = document.querySelector('#playerHealth');
            enemyHealth.style.width = `${player.health -= 20}%`;
        }

    }





}

animate();


// key events
window.addEventListener('keydown', function (e) {
    if (e.key === 'd') {
        keys.d.pressed = true;
        player.lastKey = 'd';
    }
    if (e.key === 'a') {
        keys.a.pressed = true;
        player.lastKey = 'a';
    }
    if (e.key === 'w' && player.canJump) {
        player.velocity.y = -15;
        player.canJump = false;

    }
    if (e.key === ' ') {
        player.attack();
    }

    if (e.key === 'ArrowRight') {
        keys.ArrowRight.pressed = true;
        enemy.lastKey = 'ArrowRight';
    }
    if (e.key === 'ArrowLeft') {
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = 'ArrowLeft';
    }
    if (e.key === 'ArrowUp' && enemy.canJump) {
        enemy.velocity.y = -15;
        enemy.canJump = false;
    }
    if (e.key === 'Enter') {
        enemy.attack();
    }


    if(e.key === 'r'){
        location.reload();
    }


});

window.addEventListener('keyup', function (e) {
    if (e.key === 'd') {
        keys.d.pressed = false;
    }
    if (e.key === 'a') {

        keys.a.pressed = false;
    }
    if (e.key === 'w') {

        keys.w.pressed = false;
    }

    if (e.key === 'ArrowRight') {
        keys.ArrowRight.pressed = false;
    }
    if (e.key === 'ArrowLeft') {
        keys.ArrowLeft.pressed = false;
    }
    if (e.key === 'ArrowUp') {
        keys.ArrowUp.pressed = false;
    }

});