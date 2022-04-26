const section = document.querySelector('section');
const playerLivesCount = document.querySelector('span');

let playerLives = 6;

playerLivesCount.textContent = playerLives;

const getData = () => [
    {imsSrc:'./images/beatles.jpeg',name: 'beatles'},
    {imsSrc:'./images/linkinpark.jpg',name: 'Linkin Park'},
    {imsSrc:'./images/fkatwigs.jpeg',name: 'fka twigs'},
    {imsSrc:'./images/fleetwood.jpeg',name: 'fleetwood'},
    {imsSrc:'./images/joy-division.jpeg',name: 'joy division'},
    {imsSrc:'./images/ledzep.jpeg',name: 'led zepplin'},
    {imsSrc:'./images/metallica.jpeg',name: 'metallica'},
    {imsSrc:'./images/pinkfloyd.jpeg',name: 'pink floyd'},
    {imsSrc:'./images/beatles.jpeg',name: 'beatles'},
    {imsSrc:'./images/linkinpark.jpg',name: 'Linkin Park'},
    {imsSrc:'./images/fkatwigs.jpeg',name: 'fka twigs'},
    {imsSrc:'./images/fleetwood.jpeg',name: 'fleetwood'},
    {imsSrc:'./images/joy-division.jpeg',name: 'joy division'},
    {imsSrc:'./images/ledzep.jpeg',name: 'led zepplin'},
    {imsSrc:'./images/metallica.jpeg',name: 'metallica'},
    {imsSrc:'./images/pinkfloyd.jpeg',name: 'pink floyd'}
];

const randomise = () => {
    const cardData = getData();
    cardData.sort(()=>Math.random() - 0.5);
    return cardData;
}

const cardGenerator = () => {
    const cardData = randomise();

    cardData.forEach((item) => {
        
        const card = document.createElement('div');
        const face = document.createElement('img');
        const back = document.createElement('div');
        card.classList = 'card';
        face.classList = 'face';
        back.classList = 'back';

        face.src = item.imsSrc;
        card.setAttribute('name',item.name);

        section.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);

        card.classList.add('toggleCard');
        setTimeout(()=>{
            card.classList.remove('toggleCard')
        },2500)
         
        card.addEventListener("click", (e)=>{
            card.classList.toggle('toggleCard');
            checkCards(e);
        })
    });
}

const checkCards = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add('flipped');
    const flippedCards = document.querySelectorAll('.flipped');
    const toggleCard = document.querySelectorAll('.toggleCard');

    if(flippedCards.length===2){
        if(flippedCards[0].getAttribute('name') ===
        flippedCards[1].getAttribute('name')){
            console.log('match');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                card.style.pointerEvents = "none";
            })
            
        }
        else {
            console.log('wrong');
            flippedCards.forEach(card => {
                card.classList.remove('flipped');
                setTimeout(()=>card.classList.remove('toggleCard'),1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if(playerLives===0){
                restart('Try again!!');
            }


        }
    }
    if(toggleCard.length===16){
        restart('You have won the game!!');
    }
}

const restart = (text) => {
    setTimeout(()=>window.alert(text),1000);

    let cardData = randomise();
    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    
    section.style.pointerEvents = 'none';
    cardData.forEach((item,index)=> {

        setTimeout(()=>{
            cards[index].classList.remove('toggleCard');
            cards[index].style.pointerEvents = 'all';
            faces[index].src = item.imsSrc;
            cards[index].setAttribute("name",item.name);
            section.style.pointerEvents = 'all';
        },500);
    })
    playerLives = 6;
    playerLivesCount.textContent = playerLives;
    
}

cardGenerator();