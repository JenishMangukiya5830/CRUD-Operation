document.addEventListener('DOMContentLoaded',()=> {
    let successmessage = document.querySelector('.success');
    let errormessage = document.querySelector('.error');

    if(successmessage.innerHTML !== '' || errormessage.innerHTML !== '')
    {
        setTimeout(() => {
            successmessage.innerHTML = '';
            errormessage.innerHTML = ''
        },2000)
    }
})