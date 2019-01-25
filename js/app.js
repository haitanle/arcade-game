// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   //console.log(window.ctx.canvas.width);
   if (this.x > window.ctx.canvas.width){
    //reset back to original position 
    this.x = -150;
   }else{
    this.x = (this.x + this.speed*dt);
   }
   //this.y = (this.y + (50*dt));

   // console.log(this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    //console.log(this.sprite);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){

    this.sprite = 'images/char-boy.png';
    this.x = x; 
    this.y = y;
}


Player.prototype.update = function() {
    //handle off screen? 

    //function handleCanvasWEdge 
    const canvasWEdge = window.ctx.canvas.width -105;
    if (this.x > canvasWEdge){
            this.x = canvasWEdge;
    }else if (this.x < 0){
            this.x = 0;
    }
    
    //handle collison? 

    //handle when goal is reached? 




};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(key){
    console.log(key);

    const moveY = 80;
    const moveX = 100;

    switch(key){
        case 'up': this.y-= moveY;
                    break;
        case 'down': this.y+= moveY;
                    break;
        case 'left': this.x-= moveX;
                    break;
        case 'right': this.x+= moveX;
                    break;
    }

    console.log(`x position ${this.x}, y position ${this.y}`)
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let player = new Player(100,300);

let enemey1 = new Enemy(-150,145,50);
let enemey2 = new Enemy(-150,225,150);
let enemey3 = new Enemy(-150,55,100);


allEnemies.push(enemey1);
allEnemies.push(enemey2);
allEnemies.push(enemey3);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

