const menuButton = document.querySelector('.mobile__btn')
const openMenu = document.querySelector('.btn__open');
const closeMenu = document.querySelector('.btn__close');
const menu = document.querySelector('.nav__links')

const menuButtons = [openMenu, closeMenu]

menuButton.addEventListener('click', toggleMenu);


function toggleMenu(event){
    if(event.type === 'touchstart'){
        event.preventDefault();
    }
    menu.classList.toggle('active');
    openMenu.classList.toggle('active');
    closeMenu.classList.toggle('active');
}