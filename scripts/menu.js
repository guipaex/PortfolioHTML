const menuButton = document.querySelector('.mobile__btn')
const openMenu = document.querySelector('.btn__open');
const closeMenu = document.querySelector('.btn__close');
const menu = document.querySelector('.nav__links')
const links = document.querySelectorAll('.nav__item')

const menuButtons = [openMenu, closeMenu]

menuButton.addEventListener('click', toggleMenu);
links.forEach(link => {
link.addEventListener('click', toggleMenu);
})


function teste(event){
    console.log('clique no link')
}

function toggleMenu(event){
    if(event.type === 'touchstart'){
        event.preventDefault();
    }
    menu.classList.toggle('active');
    openMenu.classList.toggle('active');
    closeMenu.classList.toggle('active');
}