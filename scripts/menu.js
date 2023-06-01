const openBtn = document.querySelector('.btn__open');
const closeBtn = document.querySelector('.btn__close');
const menu = document.querySelector('.nav__links')
const links = document.querySelectorAll('[data-navTrigger]')

links.forEach(button => {
    button.addEventListener('click', toggleMenu);
});

export function toggleMenu(event){
    if(event.type === 'touchstart'){
        event.preventDefault();
    }
    closeBtn.classList.toggle('active');
    openBtn.classList.toggle('active');
    menu.classList.toggle('active');
}
