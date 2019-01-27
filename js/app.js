//pass an object instead of making it a global variable 

window.playerPosX = 0;
window.playerPosY = 0;
window.isPlayerHit = false;

// Enemies our player must avoid
var Enemy = function(y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.startX = -150;
    this.x = this.startX; //intial position
    this.y = y;
    this.speed = speed;

    this.size = {top: 15, bottom: 15, left: 70, right: 70}
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
    this.x = this.startX;
   }else{
    this.x = (this.x + this.speed*dt);
   }
   //this.y = (this.y + (50*dt));

   //check if the enemy has hit the player
   const enemyHeight = {topHeight: this.y - this.size.top, lowHeight: this.y + this.size.bottom};
   const enemyWidth = {leftWidth: this.x - this.size.left, rightWidth: this.x + this.size.right};

   if ((window.playerPosY >= enemyHeight.topHeight && window.playerPosY <= enemyHeight.lowHeight) && 
            (window.playerPosX >= enemyWidth.leftWidth && window.playerPosX <= enemyWidth.rightWidth) 
    ){
        console.log('player hit!!!');
        window.playerPosX = 0;
        window.playerPosY = 0;
        window.isPlayerHit = true;
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y){

    this.sprite = 'images/char-boy.png';
    this.startX = 200;
    this.startY = 380;
    this.x = this.startX; 
    this.y = this.startY;

    this.moveY = 80;
    this.moveX = 100;

    this.size = {top: 15, bottom: 15, left: 40, right: 40}
}


Player.prototype.update = function() {
    //handle collison? 
    if (isPlayerHit){

        //rotate the player

        this.x = this.startX;
        this.y = this.startY;
        window.isPlayerHit = false;
    }

    //handle off screen? 

    //function handle canvasEdgeWidth 
    const  canvasEdgeWidth = window.ctx.canvas.width - (this.size.left + this.size.right);
    if (this.x >  canvasEdgeWidth){
            this.x -= this.moveX;
    }else if (this.x < 0){
            this.x = 0;
    }

    const canvasEdgeHeight = window.ctx.canvas.height - ((this.size.top + this.size.bottom)*5);
    if (this.y > canvasEdgeHeight){
        this.y -= this.moveY;
    }

    //handle when goal is reached? 
    const winLine = 60;

    if (this.y < winLine){
        this.x = this.startX;
        this.y = this.startY;
        console.log('Game won!');
    }




};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    //TODO: rotate player when hit
    //ctx.translate(Resources.get(this.sprite),20,20);
    //ctx.rotate(Resources.get(this.sprite), 20 * Math.PI / 180);
    //ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
//ctx.restore();

    
};


Player.prototype.handleInput = function(key){
    console.log(key);

    switch(key){
        case 'up': this.y-= this.moveY;
                    break;
        case 'down': this.y+= this.moveY;
                    break;
        case 'left': this.x-= this.moveX;
                    break;
        case 'right': this.x+= this.moveX;
                    break;
    }

    window.playerPosX = this.x;
    window.playerPosY = this.y;

    console.log(`x position ${this.x}, y position ${this.y}`)
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];

let player = new Player();

let enemey1 = new Enemy(145,50);
let enemey2 = new Enemy(225,150);
let enemey3 = new Enemy(55,100);


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

