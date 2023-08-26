console.log('Hello client')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const Msg1 = document.querySelector('#msg1')
const Msg2 = document.querySelector('#msg2')


weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value

        Msg1.textContent = 'Loading..'
        Msg2.textContent = ''
        fetch('/weather?address=' + location).then((response) => {
            
            response.json().then((data) => {
                if(data.error){
                   Msg1.textContent = data.error
                }
                else{
                    Msg1.textContent = data[0].Location
                    Msg2.textContent = data[0].forecast
                }
            })
        })

})