
let categories = [];
const NUM_CATEGORIES = 6;
const NUM_CLUES = 5;
let board = [];
let categoryTitle= [];
let HEIGHT = 5;
let WIDTH = 6;

      
async function getCategoryIds() {

  const response = await axios.get('http://jservice.io/api/categories', {params:{count:100}})

  const pickedArray = [];

    for(let i = 0; i < 7; i++){
  let randomPicked;
      do {randomPicked = Math.floor(Math.random() * 99);

       } while (pickedArray.includes(response.data[randomPicked]));

pickedArray.push(response.data[randomPicked]);    
  }

 console.log(pickedArray);
  


  return pickedArray.map(category => category.id);

}

//return 6 random
//loop over the 25 ids that i got and get just 6 

getCategoryIds();

  
async function getCategory(catId) {
  const response = await axios.get(`https://jservice.io/api/category?id=${catId}`);
      
   const category = response.data
                //loops through all items of the array and returns for 
                //each item another item 
     category.clues = category.clues.map(c => {c.showing = null;
       return c})
            

     return category; 
      }



/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {


  let categoryIds =  await getCategoryIds();
//get the data array of everything I need... just need to extract now 
  for(let i = 0; i < categoryIds.length; i++){
      const categoryId = categoryIds[i];
      categories.push(await getCategory(categoryId));

  }

      function makeHtmlBoard(){

        const board = document.getElementById('board');
       let result = [];
    
            //just the top row .. i need to innerTEXT different categories
       const top = document.createElement('tr');
    
    
      for (let x = 0; x < WIDTH; x++) {
          const headCell = document.createElement('td');
        //  headCell.innerText = categories.title;
          headCell.setAttribute('id', x);
          headCell.innerText = categories[x].title;
           top.append(headCell);
      }
    
         board.append(top);
    
        
    
    //i need to correlate the category of each row and add in the different questions
    
     for (let y = 0; y < HEIGHT; y++) {
       const row = document.createElement('tr');
    
       for (let x = 0; x < WIDTH; x++) {
          const cell = document.createElement('td');
         //setting the id so I can reference each cell GPS
        
         cell.innerText = '?';

         
         cell.style.textAlign = 'center';
         cell.style.fontSize = '16px';
         cell.setAttribute('id', `${y}-${x}`);
    
         row.append(cell);
    
         cell.addEventListener("click", function(){
            cell.innerText = categories[x].clues[y].question;

         })


         cell.addEventListener("dblclick", function(){
          cell.innerText = categories[x].clues[y].answer;
         })





    
       }
       board.append(row);
       
     }
    } 
    
     makeHtmlBoard();

}
fillTable();



function handleClick(evt) {
  evt.preventDefault();
 
  const x = +evt.target.id;

  if (board.every(row => row.every(cell => cell))) {
    return endGame('Game Over!');
  }

}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  let loadingView = document.getElementById('loading');
  loadingView.classList.remove('invisible');


  let board = document.getElementById('board');
  board.classList.add('invisible');
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  let loadingView = document.querySelector('#loading');
  loadingView.classList.add('invisible');
  
  
  let board = document.getElementById('board');
  board.classList.remove('invisible');

}




/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */


async function setupAndStart() {

  

  fillTable();

  }



console.log(categories);


let restart = document.getElementById("restart");
restart.addEventListener("click", function(){
  window. location. reload();
})




setupAndStart();














