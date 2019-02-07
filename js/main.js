window.onload = () => {
    // Check if possible buy (score > 0)
    // return false if too expensive, true else
    function testBuyableMultiplier (score, prixMultiplier) {
        if ((score - prixMultiplier) < 0) {
            return false;
        } else {
            return true;
        }
    };

    // Update score display on index.html
    function updateAffichageScore (score) {
        document.querySelector('#score').innerHTML(score);
    };
}