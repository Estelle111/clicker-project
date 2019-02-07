window.onload = () => {

    var game = new Game(0);
    gameFlow();
    // Main Function 
    function gameFlow(){
        // 
        // INSERT CLICK FUNCTION HERE
        // 
        multBtn = document.querySelector('#hMultiplier')
        multObject = game.multiplier
        multBtn.addEventListener("click",() => {
            if (game.isBuyable(game.score,multObject.price == true)) { 
                multObject.price = multObject.evolPrice(multObject.price)
                multObject.level = multObject.evolLevel(multObject.level)
            }
        })
    }
    function Game(score){
        this.score = score
        this.multiplier = new Multiple(50,1)
        // Check if possible buy (score > 0)
        // return false if too expensive, true else
        this.isBuyable = function(score,price){
            if ((score - price) < 0) {
                return false;
            } else {
                return true;
            }
        }
        // Update score display on index.html
        this.updateAffichageScore = function () {
            document.querySelector('#score').innerHTML(this.score)
        }
        this.increaseScore = function(){}
    }
    function Multiple(price, level){
        this.price = price;
        this.level = level;
        this.evolPrice = function(price){
            return price*2
        }
        this.evolLevel = function(level){
            return level*2
        }
        this.updateAffichageMultiple = function () {
            document.querySelector('#hMultiplier').innerHTML(this.level)
        }
    }
}