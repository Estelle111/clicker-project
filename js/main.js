window.onload = () => {

    var game = new Game(0);

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
        this.updateAffichageScore (score) {
            document.querySelector('#score').innerHTML(score);
        }
        this.increaseScore = function(){}
    }

    function Multiple(price, level){
        this.price = price
        this.level = level
        this.evolPrice = function(price){
            return price*2
        }
        this.evolLevel = function(level){
            return level*2
        }
    }
}