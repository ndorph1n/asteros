const control = document.querySelector('.slider__control');
const controlPoints = document.querySelectorAll('.control__item');
const slides = document.querySelectorAll('.slider__card');
const sliderContainer = document.querySelector('.slider__container');

function handleClick(e) {
    for (let i = 0; i < controlPoints.length; i++) {
        if (controlPoints[i].classList.contains('control__item--active')){
            controlPoints[i].classList.remove('control__item--active');
        }
        if (e.target === controlPoints[i]) {
            controlPoints[i].classList.add('control__item--active');
            if (window.innerWidth >= 768) {
                sliderContainer.scrollTo(0,slides[i].offsetTop - 99);
            } else {
                sliderContainer.scrollTo(slides[i].offsetLeft - 20,0)
            }
        }
    }
}

controlPoints.forEach(item => item.addEventListener('click', handleClick));
