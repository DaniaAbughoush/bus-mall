// global
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}




let leftIndex;
let middleIndex;
let rightIndex;
let rounds =25;
let shownImages = [];
let views=[];
let votes=[];

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



function renderImage(){
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



function render() {
  do {
    leftIndex = randomNumber(0, Products.all.length - 1);
  }while (leftIndex === middleIndex || leftIndex === rightIndex || checkAvailability(leftIndex));
  do{
    rightIndex = randomNumber(0, Products.all.length - 1);
  } while ( leftIndex === rightIndex || rightIndex === middleIndex|| checkAvailability(rightIndex));
  do {middleIndex = randomNumber(0, Products.all.length - 1);
  } while (leftIndex === middleIndex || rightIndex === middleIndex || checkAvailability(middleIndex));

  shownImages. push(leftIndex);
  shownImages. push(rightIndex);
  shownImages. push(middleIndex);
  // console.log(shownImages);
  renderImage();
}
render();



function checkAvailability(selectedImageName) {
  for (let i = 0; i < shownImages.length; i++) {
    if (shownImages[i] === selectedImageName) {
      return true;
    }

    return false;

  }
}

// } console.log(checkAvailability());

imageSection.addEventListener('click', handelClick);


let totalVote = 0;

function handelClick(event) {
  event.preventDefault();
  if (event.target.id !== 'product') {
    if (event.target.id === 'right') {
      totalVote++;
      Products.all[rightIndex].vote++;
      votes.push( Products.all[rightIndex].vote++);
    } else if (event.target.id === 'left') {
      totalVote++;
      Products.all[leftIndex].vote++;
      votes.push( Products.all[leftIndex].vote++);
    } else {
      totalVote++;
      Products.all[middleIndex].vote++;
      votes.push( Products.all[middleIndex].vote++);

    }

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
    resultChart();

  }

  finalResult.removeEventListener('click', ProductList);

}

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
        data: shownImages
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
