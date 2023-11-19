const body = document.querySelector('.page');
const header = document.querySelector('.header');
const menuButton = document.querySelector('.toggler');
const menu = document.querySelector('.menu');
const searchHeader = document.querySelector('.header__search');
const searchForm = document.querySelector('.search');

function showMenu() {
    const middleLine = document.querySelector('.toggler__line--middle');
    const topLine = document.querySelector('.toggler__line--top');
    const bottomLine = document.querySelector('.toggler__line--bottom');
    
    topLine.classList.toggle('x__top');
    middleLine.classList.toggle('x__middle');
    bottomLine.classList.toggle('x__bottom');

    body.classList.toggle('scroll--hidden');
    menu.classList.toggle('menu--hidden');

    window.addEventListener('keydown', (e)=>{
        if ((e.key === 'Escape') && (!menu.classList.contains('menu--hidden'))){
            topLine.classList.remove('x__top');
            middleLine.classList.remove('x__middle');
            bottomLine.classList.remove('x__bottom');
            menu.classList.add('menu--hidden');
            body.classList.remove('scroll--hidden');
        }
    });
}

function setBoxShadow() {
    window.scrollY > 0 ? header.style.boxShadow = '0 2px 2px -2px var(--secondary-gray)': header.style.boxShadow = '';
} 

menuButton.onclick = searchHeader.onclick = showMenu;

searchForm.onsubmit = (e) => {
    e.preventDefault();
};

window.onscroll = setBoxShadow;


