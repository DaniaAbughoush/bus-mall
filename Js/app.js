// global
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




let leftIndex;
let middleIndex;
let rightIndex;
let rounds = 25;
let shownImages = [];

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
  'sweep',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'wine-glass',
];

const rightImage = document.getElementById('right');
const leftImage = document.getElementById('left');
const middleImage = document.getElementById('middle');
const imageSection = document.getElementById('product');
const finalResult = document.getElementById('finalResult');
const list = document.getElementById('list');
function Products(name) {
  this.name = name;
  this.path = `./images/${name}.jpg`;
  this.vote = [];
  this.view = [];
  Products.all.push(this);
}
Products.all = [];

for (let i = 0; i < names.length; i++) {
  new Products(names[i]);
}

function checkAvailability(selectedImageName) {
  for (let i = 0; i < shownImages.length; i++) {
    if (shownImages[i] === selectedImageName) {
      return true;
    } else {
      return false;
    }
  }

} console.log(checkAvailability());


function render() {
  do {
    leftIndex = randomNumber(0, Products.all.length - 1);
    rightIndex = randomNumber(0, Products.all.length - 1);
    middleIndex = randomNumber(0, Products.all.length - 1);
   shownImages. push(leftIndex);
   shownImages. push(leftIndex);
   shownImages. push(leftIndex);
   console.log(shownImages);


  } while (leftIndex === middleIndex || leftIndex === rightIndex || rightIndex === middleIndex || checkAvailability(leftIndex) || checkAvailability(rightIndex) || checkAvailability(middleIndex));
  
  






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
render();





imageSection.addEventListener('click', handelClick);


let totalVote = 0;

function handelClick(event) {
  event.preventDefault();
  if (event.target.id !== 'product') {
    if (event.target.id === 'right') {
      totalVote++;

      Products.all[rightIndex].vote++;
    } else if (event.target.id === 'left') {
      totalVote++;

      Products.all[leftIndex].vote++;
    } else {
      totalVote++;
      Products.all[leftIndex].vote++;

//       
    }
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

    const liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Products.all[i].name} had ${Products.all[i].vote} votes, and was seen ${Products.all[i].view} times.`;
  }

  finalResult.removeEventListener('click', ProductList);
}
// vote.push(Products.all[i].vote);
// console.log(vote);
// const container=document.getElementById('list');

// function list(){
//   for(let i=0;i<names.length;i++){
//    const liEl=document.createElement('li');
//    container.appendChild(liEl);
//    liEl.textContent=(names[i],Products.all);
//   }
// }list();

// function result(){
//   const container=getElementById('button');
//   const ulEl=document.createElement('ul');
//   for(i=0;i<names.length;i++){
//     const liEl=document.createElement('li')


//     liEl.textContent(names[i]+)

//   }
// }



// handelClick();



// if (totalVote >= rounds) {
//   imageSection.removeEventListener('click', handelClick);
// }
// finalResult.addEventListener('click', ProductList);

// function ProductList() {

//   const container = document.getElementById('buttonList');
//   const ulEl = document.createElement('ul');
//   container.appendChild(ulEl);

//   for (let i = 0; i < names.length; i++) {
//     const liEl = document.createElement('li');
//     ulEl.appendChild(liEl);
//     liEl.textContent = `${Products.all[i].name} had ${Products.all[i].vote} votes, and was seen ${Products.all[i].view} times.`;
//   }

//   finalResult.removeEventListener('click', ProductList);
// }
// render();
