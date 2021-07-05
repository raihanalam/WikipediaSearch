let submitBtn = document.querySelector('#submit-btn');
let input = document.querySelector('.input-field');
let error = document.querySelector('#error');
let output = document.querySelector('#output');


submitBtn.addEventListener('click',getData);
input.addEventListener('enter',getData);


function clearOldOutput(){
    while (output.firstChild) {
        output.removeChild(output.lastChild);
      }
}

function getData(e){
    clearOldOutput();
    if(input.value === ''){
        output.innerHTML = "Input field empty!";
    }
    else{
        let inputSearch = input.value;
       let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${inputSearch}`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let resultArray = data.query.search;
            displayData(resultArray);
        })
        .catch(function(){
            console.log("Ohh shit!");
            output.innerHTML = "OWW shit! API isn't working!"
        });
    }
    e.preventDefault();
}
function displayData(result){
    result.forEach(item =>{
        let itemTitle = item.title;
        let itemSnippet = item.snippet;
        let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);

        output.insertAdjacentHTML('beforeend',        `
        <div class="row">
            <h3><a href="${itemUrl}">${itemTitle}</a></h3>
            <p>${itemSnippet}...</p>
            <a href="${itemUrl}"><button>View Full Article</button></a>
        </div>
        `
        );
    })
}