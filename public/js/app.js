// fetch('http://puzzle.mead.io/puzzle'.then((response) => { //dohvatamo uz pomoc fetcha sa linka podatke i smestamo ih u response
//     response.json().then((data)=>{ //kasnije parsiramo u json i pravimo funkciju koja ce uz paramater data moci da dohvati iz jsona odredjene podatke
//         console.log(data);
//     })
// }))
console.log('Client side java');
const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const location = search.value
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ' ';
    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
        response.json().then((data) =>{
            if(data.error)
            {
                messageOne.textContent = data.error;
            }       
            else{
                
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        })
    })
})  