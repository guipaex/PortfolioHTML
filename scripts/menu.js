const openButton = document.querySelector('[data-button="open"]')

openButton.addEventListener('click', toggleMenu);

function toggleMenu(e){
    if(e.type === 'touchstart'){
        e.preventDefault();
    }
    //menu.classList.toggle('active');

    console.log('click')

}

 console.log(openButton)