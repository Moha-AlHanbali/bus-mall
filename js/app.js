'use strict';



//Getting HTMl Elements
let imgFirstEl = document.getElementById('imgFirst');
let imgSecondEl = document.getElementById('imgSecond');
let imgThirdEl = document.getElementById('imgThird');
let resultsButtonEl = document.getElementById('resultsButton');
let resultsDivEl = document.getElementById('resultsDiv');
let leftSectionDivEl = document.getElementById('leftSectionDiv');

//Declaring

let imgPaths= ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let imgArray = [];
let productArray = [];
let votesArray = [];
let viewsArray = [];
let attemptCounter = 0;
let attemptLimit = 25;
let viewsTotal = [];
let votesTotal = [];
let currentVotesTotal = [];
let currentViewsTotal = [];

//Prepare Totals

for (let i = 0 ; i<imgPaths.length; i++){
  votesTotal[i]=0;
  viewsTotal[i]=0;
  currentVotesTotal[i]=0;
  currentViewsTotal[i]=0;
}




//Constructor

function ProductImage (imgPath){
  this.imgPath = 'img/' + imgPath;
  this.product = imgPath.split('.')[0];
  this.views = 0;
  this.votes = 0;

  imgArray.push(this);
  productArray.push(this.product);
}


//Random Number

function randomNumber(){
  let min = 0;
  let max = imgPaths.length;
  return Math.floor(Math.random() * (max - min) + min);
}


//Adding Products

for (let i=0; i<imgPaths.length; i++){
  new ProductImage (imgPaths[i]);
}


//Appending to HTML

let randomFirst;
let randomSecond;
let randomThird;

//Unique values

let uniqueArray = [];
uniqueArray[0] = randomFirst;
uniqueArray[1] = randomSecond;
uniqueArray[2] = randomThird;


//Duplicate Check

function checkDuplicate(){

  while(uniqueArray.includes(randomFirst) || uniqueArray.includes(randomSecond) || uniqueArray.includes(randomThird) ||
      (randomFirst === randomSecond || randomFirst === randomThird || randomSecond === randomThird)){
    randomFirst = randomNumber();
    randomSecond = randomNumber();
    randomThird = randomNumber();
  }
  uniqueArray[0] = randomFirst;
  uniqueArray[1] = randomSecond;
  uniqueArray[2] = randomThird;
}


//Render Images

function renderImage(){

  viewsArray = [];
  votesArray= [];

  checkDuplicate();

  // console.log('random', randomFirst, randomSecond, randomThird);
  // console.log('unique', array[0], array[1], array[2]);

  imgFirstEl.setAttribute('src', imgArray[randomFirst].imgPath);
  imgSecondEl.setAttribute('src', imgArray[randomSecond].imgPath);
  imgThirdEl.setAttribute('src', imgArray[randomThird].imgPath);


  imgFirstEl.setAttribute('title', imgArray[randomFirst].product);
  imgSecondEl.setAttribute('title', imgArray[randomSecond].product);
  imgThirdEl.setAttribute('title', imgArray[randomThird].product);

  imgArray[randomFirst].views++;
  imgArray[randomSecond].views++;
  imgArray[randomThird].views++;

}


renderImage();
retrieveInteractions();

//Adding Event

imgFirstEl.addEventListener('click', clickCounter);
imgSecondEl.addEventListener('click', clickCounter);
imgThirdEl.addEventListener('click', clickCounter);


function clickCounter(event){

  if(attemptCounter < attemptLimit){

    let imgClick = event.target.id;

    if(imgClick === imgFirstEl.id){
      imgArray[randomFirst].votes++;
      renderImage();


    } else if(imgClick === imgSecondEl.id){
      imgArray[randomSecond].votes++;
      renderImage();


    }else if(imgClick === imgThirdEl.id){
      imgArray[randomThird].votes++;
      renderImage();

    }}

  else{
    imgFirstEl.removeEventListener('click', clickCounter);
    imgSecondEl.removeEventListener('click', clickCounter);
    imgThirdEl.removeEventListener('click', clickCounter);

  }
  attemptCounter++;

}


//Viewing Results

resultsButtonEl.addEventListener('click', renderResults);

let ulEl = document.createElement('ul');
resultsDivEl.appendChild(ulEl);

let ulTotalEl =document.createElement('ul');
resultsDivEl.appendChild(ulTotalEl);



function renderResults(){
  if (attemptCounter >= attemptLimit){


    for (let i=0; i<imgArray.length; i++){

      let liEl = document.createElement('li');
      liEl.textContent = `${imgArray[i].product} had ${imgArray[i].votes} votes, and was seen ${imgArray[i].views} times.`;
      ulEl.appendChild(liEl);

      votesArray.push(imgArray[i].votes);
      viewsArray.push(imgArray[i].views);
      leftSectionDivEl.style.border = ('solid 1px black');

    }


    for (let i=0; i<imgArray.length; i++){

      currentVotesTotal[i] = votesTotal[i] + votesArray[i];
      currentViewsTotal[i] = viewsTotal[i] + viewsArray[i];

      let liTotalEl = document.createElement('li');

      liTotalEl.textContent = `In total, ${imgArray[i].product} had ${currentVotesTotal[i]} votes, and ${currentViewsTotal[i]} views.`;

      ulTotalEl.appendChild(liTotalEl);
      ulTotalEl.style.listStyle = ('square');

    }

    saveInteractions();

    renderChart();


    resultsButtonEl.removeEventListener('click', renderResults);
  } else{
    alert('Please complete the number of rounds then try again.' + 'You are at (' + attemptCounter + '/' +attemptLimit +').');
  }

}

//Render Charts

function renderChart(){
  let barEl = document.getElementById('barChart');
  let barChart = new Chart(barEl, {
    type: 'bar',
    data: {
      labels: productArray,
      datasets: [{
        label: 'Votes Total',
        data: currentVotesTotal,
        backgroundColor: [
          'rgba(255, 174, 200, 0.5)',
          'rgba(255, 174, 224, 0.5)',
          'rgba(255, 174, 250, 0.5)',
          'rgba(202, 174, 255, 0.5)',
          'rgba(174, 175, 255, 0.5)',
          'rgba(174, 196, 255, 0.5)',
          'rgba(174, 232, 255, 0.5)',
          'rgba(174, 255, 248, 0.5)',
          'rgba(174, 255, 231, 0.5)',
          'rgba(174, 255, 205, 0.5)',
          'rgba(177, 255, 174, 0.5)',
          'rgba(200, 255, 174, 0.5)',
          'rgba(220, 255, 174, 0.5)',
          'rgba(240, 255, 174, 0.5)',
          'rgba(255, 247, 174, 0.5)',
          'rgba(255, 223, 174, 0.5)',
          'rgba(255, 193, 174, 0.5)',
          'rgba(255, 179, 174, 0.5)',
          'rgba(255, 179, 174, 0.5)',

        ],
        borderColor: [
          'rgba(255, 174, 200, 1)',
          'rgba(255, 174, 224, 1)',
          'rgba(255, 174, 250, 1)',
          'rgba(202, 174, 255, 1)',
          'rgba(174, 175, 255, 1)',
          'rgba(174, 196, 255, 1)',
          'rgba(174, 232, 255, 1)',
          'rgba(174, 255, 248, 1)',
          'rgba(174, 255, 231, 1)',
          'rgba(174, 255, 205, 1)',
          'rgba(177, 255, 174, 1)',
          'rgba(200, 255, 174, 1)',
          'rgba(220, 255, 174, 1)',
          'rgba(240, 255, 174, 1)',
          'rgba(255, 247, 174, 1)',
          'rgba(255, 223, 174, 1)',
          'rgba(255, 193, 174, 1)',
          'rgba(255, 179, 174, 1)',
          'rgba(255, 179, 174, 1)',
        ],
        borderWidth: 1
      },

      {
        label: 'Views Total',
        data: currentViewsTotal,
        backgroundColor: [
          'rgba(255, 174, 200, 1)',
          'rgba(255, 174, 224, 1)',
          'rgba(255, 174, 250, 1)',
          'rgba(202, 174, 255, 1)',
          'rgba(174, 175, 255, 1)',
          'rgba(174, 196, 255, 1)',
          'rgba(174, 232, 255, 1)',
          'rgba(174, 255, 248, 1)',
          'rgba(174, 255, 231, 1)',
          'rgba(174, 255, 205, 1)',
          'rgba(177, 255, 174, 1)',
          'rgba(200, 255, 174, 1)',
          'rgba(220, 255, 174, 1)',
          'rgba(240, 255, 174, 1)',
          'rgba(255, 247, 174, 1)',
          'rgba(255, 223, 174, 1)',
          'rgba(255, 193, 174, 1)',
          'rgba(255, 179, 174, 1)',
          'rgba(255, 179, 174, 1)',
        ],
        borderColor: [
          'rgba(255, 174, 200, 0.5)',
          'rgba(255, 174, 224, 0.5)',
          'rgba(255, 174, 250, 0.5)',
          'rgba(202, 174, 255, 0.5)',
          'rgba(174, 175, 255, 0.5)',
          'rgba(174, 196, 255, 0.5)',
          'rgba(174, 232, 255, 0.5)',
          'rgba(174, 255, 248, 0.5)',
          'rgba(174, 255, 231, 0.5)',
          'rgba(174, 255, 205, 0.5)',
          'rgba(177, 255, 174, 0.5)',
          'rgba(200, 255, 174, 0.5)',
          'rgba(220, 255, 174, 0.5)',
          'rgba(240, 255, 174, 0.5)',
          'rgba(255, 247, 174, 0.5)',
          'rgba(255, 223, 174, 0.5)',
          'rgba(255, 193, 174, 0.5)',
          'rgba(255, 179, 174, 0.5)',
          'rgba(255, 179, 174, 0.5)',
        ],
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}



//Saving to Local Storage

function saveInteractions(){

  let votesInteractions = JSON.stringify(votesArray);
  localStorage.setItem('votes', votesInteractions);

  let viewsInteractions = JSON.stringify(viewsArray);
  localStorage.setItem('views', viewsInteractions);




  let votesTotalStore = JSON.stringify(votesTotal);
  localStorage.setItem('votesTotal', votesTotalStore);


  let viewsTotalStore = JSON.stringify(viewsTotal);
  localStorage.setItem('viewsTotal', viewsTotalStore);


}

//Retrieve from Local Storage

function retrieveInteractions(){


  let votesStr = localStorage.getItem('votes');
  let votesObj = JSON.parse(votesStr);

  let viewsStr = localStorage.getItem('views');
  let viewsObj = JSON.parse(viewsStr);



  let votesTotalStr = localStorage.getItem('votesTotal');
  let votesTotalObj = JSON.parse(votesTotalStr);


  let viewsTotalStr = localStorage.getItem('viewsTotal');
  let viewsTotalObj = JSON.parse(viewsTotalStr);


  if (votesObj !== null && viewsObj !== null){
    votesArray = votesObj;
    viewsArray = viewsObj;
    votesTotal = votesTotalObj;
    viewsTotal = viewsTotalObj;

    for (let i = 0; i<imgPaths.length; i++){
      votesTotal[i] = votesTotal[i] + votesArray[i];
      viewsTotal[i] = viewsTotal[i] + viewsArray[i];
    }


  }
}


