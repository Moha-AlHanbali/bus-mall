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
let attemptLimit = 5;


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

let randomFirst = 0;
let randomSecond = 0;
let randomThird = 0;

//Unique values

let uniqueFirst;
let uniqueSecond;
let uniqueThird;


function renderImage(){
  randomFirst = randomNumber();
  randomSecond = randomNumber();
  randomThird = randomNumber();



  while ((randomFirst === randomSecond || randomFirst === randomThird || randomSecond === randomThird) || (uniqueFirst === randomFirst || uniqueFirst === randomSecond || uniqueFirst === randomThird || uniqueSecond === randomFirst || uniqueSecond === randomSecond || uniqueSecond === randomThird || uniqueThird === randomFirst || uniqueThird === randomSecond || uniqueThird === randomThird)){

    randomFirst = randomNumber();
    randomSecond = randomNumber();
    randomThird = randomNumber();

  }
  console.log(randomFirst, randomSecond, randomThird);
  console.log(uniqueFirst, uniqueSecond, uniqueThird);


  uniqueFirst = randomFirst;
  uniqueSecond = randomSecond;
  uniqueThird = randomThird;


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

function renderResults(){
  if (attemptCounter >= attemptLimit){

    for (let i=0; i<imgArray.length; i++){
      let liEl = document.createElement('li');
      liEl.textContent = `${imgArray[i].product} had ${imgArray[i].votes} votes, and was seen ${imgArray[i].views} times.`;
      ulEl.appendChild(liEl);

      votesArray.push(imgArray[i].votes);
      viewsArray.push(imgArray[i].views);

    }
    renderChart();

    leftSectionDivEl.style.border = ('solid 1px black');
    resultsButtonEl.removeEventListener('click', renderResults);
  } else{
    alert('Please complete the number of rounds then try again.' + 'You are at (' + attemptCounter + '/' +attemptLimit +').');
  }

}


//Render Charts

function renderChart(){
  let ctx = document.getElementById('myChart');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productArray,
      datasets: [{
        label: 'Votes',
        data: votesArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },

      {
        label: 'Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
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

