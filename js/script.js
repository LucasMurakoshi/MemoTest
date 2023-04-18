
class Memotest{
    constructor(){
        this.canPlay = false;

        this.card1 = null;
        this.card2 = null;

        this.foundPairs = 0;

        this.imgs = []
        this.imgsNewOrder = []
        this.cards = Array.from(document.querySelectorAll('.container .card'));
        this.maxPairsCards = this.cards.length/2
    
        this.startGame();
    }

    startGame(){
        this.setNewOrder();
        this.canPlay = true
        this.flipCard()
    }

    setNewOrder(){
        // Desordenamos las imgs
        for(let i = 1; i<=this.maxPairsCards; i++){
            this.imgs.push(`img${i}.png`);
            this.imgs.push(`img${i}.png`);
        };

        this.imgsNewOrder = this.imgs.sort(()=> Math.random()-0.5 );
        
        // Colocalmos las imgs en las cards
        for(const i in this.cards){
            const card = this.cards[i];
            const img = this.imgsNewOrder[i];
            const imgLabel = card.children[0];
            
            card.dataset.image = img
            imgLabel.src = `./icons/${img}`
        }
    }

 
    flipCard(){
        this.cards.forEach(card=> card.addEventListener('click',()=>{
            if(this.canPlay && !card.classList.contains('open')){
                card.classList.add('open')
                this.checkPair(card.dataset.image);
            }
        }));
    }

    checkPair(image){
        if(!this.card1){
            this.card1 = image;  
        } else {
            this.card2 = image;
        }
        if (this.card1 && this.card2) {
            if (this.card1 == this.card2) {
                console.log('IGUALES')
                this.checkIfWon();

            } else {
                console.log('DISTINTOS');
                this.canPlay = false
                setTimeout(this.resetOpenCards.bind(this),800)
            }
        }
    }

    resetOpenCards(){
        const newlyOpened1 = document.querySelector(`.card.open[data-image='${this.card1}']`);
        const newlyOpened2 = document.querySelector(`.card.open[data-image='${this.card2}']`);
        newlyOpened1.classList.remove('open');
        newlyOpened2.classList.remove('open');
  

        this.card1 = null;
        this.card2 = null;

        this.canPlay = true
    }


    checkIfWon(){
        this.foundPairs++;
        this.card1 = null;
        this.card2 = null;

        if(this.foundPairs==this.maxPairsCards){
            console.log('WIN');
        }
    }

}

document.addEventListener("DOMContentLoaded",()=>{
    new Memotest();
});
