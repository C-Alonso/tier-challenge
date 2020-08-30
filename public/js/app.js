console.log('Joe!')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e) => { //'e' stands for event
    e.preventDefault() //Prevent the browser from refreshing
    
    const location = searchElement.value
    
    messageOne.textContent = 'Loading info...'
    messageTwo.textContent = ''

    const headers = {
        "Content-Type": "application/json",
    }
    const addressBody = {
        "address": searchElement.value
    }    

    fetch("/addresses", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addressBody)
    }).then((res) => res.json())
    .then((data) => {
        if(data.errors) {
            if(data.errors.address) {
                messageOne.textContent = data.errors.address.message
                console.log(data.error)
            }
            else {
                messageOne.textContent = "ERROR!"
                console.log(data.error)
            }
        } else {
            messageOne.textContent = "Short TIER address:"
            messageTwo.textContent = "tier.app/" + data.shortAddress
            messageTwo.href = "addresses/" + data.shortAddress
            searchElement.value = null           
        }
    }).catch((err) => console.log(err))

    // fetch('/addresses').then((response) => {
    //     response.json().then((data) => {
    //         if(data.error) {
    //             messageOne.textContent = data.error
    //             console.log(data.error)
    //         } else {
    //             messageOne.textContent = data.location
    //             messageTwo.textContent = data.forecast
    //             console.log(data.forecast)
    //             console.log(data.location)
    //         }
    //     })
    // })     

    //get_data()
      

    // fetch('/generate?address=' + location).then((response) => {
    //     response.json().then((data) => {
    //         if(data.error) {
    //             messageOne.textContent = data.error
    //             console.log(data.error)
    //         } else {
    //             messageOne.textContent = data.location
    //             messageTwo.textContent = data.forecast
    //             console.log(data.forecast)
    //             console.log(data.location)
    //         }
    //     })
    // })     
    
    
    
})