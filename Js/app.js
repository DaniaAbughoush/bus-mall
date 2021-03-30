// global
// let stringObject=localStorage.getItem('storeProduct');
// if(!strobject){
//   return false
// }
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




let leftIndex;
let middleIndex;
let rightIndex;
let rounds =25;
let shownImages=[];
let votes=[];
let views=[];

//products name:
let names = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'tauntaun',
  'unicorn',
  'water-can',
  'wine-glass',
  'usb',
  'sweep',

];
//bring images and section from html
const rightImage = document.getElementById('right');
const leftImage = document.getElementById('left');
const middleImage = document.getElementById('middle');
const imageSection = document.getElementById('product');
const finalResult = document.getElementById('finalResult');
//constructer
function Products(name) {
  this.name = name;
  this.path=`./images/${name}.jpg`;
  this.vote = 0;
  this.view = 0;
  Products.all.push(this);

  // gettingItem();
  // settingIteam();
}
Products.all = [];
// gettingItem();
// settingIteam();
// gettingItem();

//bulding object
for (let i = 0; i < names.length; i++) {
  new Products(names[i]);
}


function randomIndex(){
  leftIndex = randomNumber(0, Products.all.length - 1);
  rightIndex = randomNumber(0, Products.all.length - 1);
  middleIndex = randomNumber(0, Products.all.length - 1);
}






function render() {

  do{randomIndex();
  }
  while(leftIndex === middleIndex || leftIndex === rightIndex ||rightIndex === middleIndex);


  renderImages();

}
// renderImages();

// if(shownImages.includes(leftIndex)||shownImages.includes(middleIndex)||shownImages.includes(rightIndex)){
//   randomIndex();
// }


render();

function renderImages(){
  leftImage.src = Products.all[leftIndex].path;
  leftImage.alt = Products.all[leftIndex].name;
  leftImage.title = Products.all[leftIndex].name;
  Products.all[leftIndex].view++;
  // console.log(leftIndex);
  middleImage.src = Products.all[middleIndex].path;
  middleImage.alt = Products.all[middleIndex].name;
  middleImage.title = Products.all[middleIndex].name;
  Products.all[middleIndex].view++;
  // console.log(middleIndex);

  rightImage.src = Products.all[rightIndex].path;
  rightImage.alt = Products.all[rightIndex].name;
  rightImage.title = Products.all[rightIndex].name;
  Products.all[rightIndex].view++;
}



// function checkAvailability(selectedImageName) {
//   for (let i = 0; i < shownImages.length; i++) {
//     if (shownImages[i] === selectedImageName) {
//       return true;
//     }

//     return false;

//   }
// }

// } console.log(checkAvailability());

imageSection.addEventListener('click', handelClick);


let totalVote = 0;

function handelClick(event) {
  event.preventDefault();
  if (event.target.id !== 'product') {

    if (event.target.id === 'right') {
      totalVote++;
      Products.all[rightIndex].vote++;
      // votes.push( Products.all[rightIndex].vote++);
    } else if (event.target.id === 'left') {
      totalVote++;
      Products.all[leftIndex].vote++;
      // votes.push( Products.all[leftIndex].vote++);
    } else {
      totalVote++;
      Products.all[middleIndex].vote++;
      // votes.push( Products.all[middleIndex].vote++);


    }
    //moving shownimages here to not consider first render in counting


    // for(let i=0;i<names.length;){
    //   votes.push( Products.all[i].vote);
    //   console.log(votes);
    // }
    render();

  }





  if (totalVote > rounds - 1) {
    imageSection.removeEventListener('click', handelClick);
    finalResult.addEventListener('click', ProductList);



  }

}



function ProductList() {
  const container = document.getElementById('buttonList');
  const ulEl = document.createElement('ul');
  container.appendChild(ulEl);


  for (let i = 0; i < names.length; i++) {
    // votes.push(Products.all[i].vote)
    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Products.all[i].name} had ${Products.all[i].vote} votes, and was seen ${Products.all[i].view} times.`;
    votes.push(Products.all[i].vote);
    views.push(Products.all[i].view);

  shownImages. push(leftIndex);
  shownImages. push(rightIndex);
  shownImages. push(middleIndex);
  // console.log(shownImages);
  resultChart();
  // gettingItem();
  settingIteam();
  // gettingItem();

}

}
// settingIteam();

// console.log(votes);

function resultChart(){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'views',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data:views
      },
      {
        label: 'votes',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: votes

      }]
    },

    // Configuration options go here
    options: {}
  });
}
//local storge
function settingIteam(){
  let data=JSON.stringify(Products.all);
  localStorage.setItem('storeProduct',data);
  // console.log(data);
}

function gettingItem(){
  let stringObject=localStorage.getItem('storeProduct');
  console.log(stringObject);

  let normal=JSON.parse(stringObject);
  if(normal !== null){
    Products.all=normal;

    // lastResults();


  }
  // ProductList();
//   result();
//
}
gettingItem();

// function lastResults(){
//   let namesArr = [];
//   let viewsArr = [];

//   for (let j = 0; j < Products.all.length; j++){
//     let namesResults = Products.all[j].name;
//     namesArr.push(namesResults);

//     let viewResults = Products.all[j].views;
//     viewsArr.push(viewResults);
//   }}
// function resultstore(){
//   for (let i = 0; i < names.length; i++){
//     `${Products.all[i].name} had ${Products.all[i].vote} votes, and was seen ${Products.all[i].view} times.`
//     votes.push(Products.all[i].vote);
//     views.push(Products.all[i].view);

//   }

//  function traceYourCode(){
//   const container = document.getElementById('trace');
//   const ul1El = document.createElement('ul');
//   container.appendChild(ul1El);
   
//   for (let i = 0; i < names.length; i++) {
//     // votes.push(Products.all[i].vote)
//     const li1El = document.createElement('li');
//     ul1El.appendChild(li1El);
//     li1El.textContent = `${Products.all[i].name} had ${Products.all[i].vote} votes, and was seen ${Products.all[i].view} times.`;
   

//   // shownImages. push(leftIndex);
//   // shownImages. push(rightIndex);
//   // shownImages. push(middleIndex);
//   // console.log(shownImages);
//   // resultChart();
//   // gettingItem();
//   // settingIteam();
//   // gettingItem();



// }
//  }