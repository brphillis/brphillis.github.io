//CANVAS SETTINGS
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;
c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

const shop = new Sprite({
  position: {
    x: 650,
    y: 223.5,
  },
  imageSrc: "./img/shop.png",
  scale: 2,
  framesMax: 6,
});

/////////PLAYER/////////
const player = new Fighter({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/king/Idle.png",
  framesMax: 6,
  scale: 1.4,
  offset: {
    x: 10,
    y: 14,
  },
  sprites: {
    idle: {
      imageSrc: "./img/king/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/king/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/king/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/king/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/king/Attack_1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/king/Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/king/Death.png",
      framesMax: 11,
    },
  },
  attackBox: {
    offset: {
      x: 0,
      y: 50,
    },
    width: 90,
    height: 100,
  },
});

player.draw();

/////////ENEMY/////////
const enemy = new Fighter({
  position: {
    x: 600,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./img/wizard/Idle.png",
  framesMax: 6,
  scale: 1.4,
  offset: {
    x: 10,
    y: 47.5,
  },
  sprites: {
    idle: {
      imageSrc: "./img/wizard/Idle.png",
      framesMax: 6,
    },
    run: {
      imageSrc: "./img/wizard/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./img/wizard/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./img/wizard/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./img/wizard/Attack_1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./img/wizard/Hit.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./img/wizard/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -50,
      y: 50,
    },
    width: 200,
    height: 100,
  },
});

enemy.draw();

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

decreaseTimer();

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  c.fillStyle = "rgba(255, 255, 255, 0.08)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // PLAYER MOVEMENT

  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  // jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // ENEMY MOVEMENT
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  // jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // DETECT COLLISION ENEMY
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.framesCurrent === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    gsap.to("#enemyHealth", {
      width: enemy.health + "%",
    });
  }

  // PLAYER HIT
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  // PLAYER GETS HIT
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.framesCurrent === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    gsap.to("#playerHealth", {
      width: player.health + "%",
    });
  }

  // PLAYER MISSES
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  // FINISH GAME BASED ON HP
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;
    }
  }

  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
      case "ArrowDown":
        enemy.attack();

        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  // ENEMY KEYS
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});
