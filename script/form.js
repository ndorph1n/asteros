const input = document.querySelector('.software');
const inputLabel = document.querySelector('.order__subtitle');
const applications = ['Adobe Acrobat Pro' , 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Adobe After Effects', 'Adobe Lightroom', 'Adobe XD', 'Microsoft Windows 10 Enterprise', 'Microsoft Windows 11 Enterprise', 'Microsoft Office'];
const optionList = document.createElement('div');
optionList.classList.add('software-list', 'software__list', 'options');
let isShowing = false;
let amountBlock;
let options;
const amountList = document.createElement('div');
let isAmountShowing = false;
const summaryBlock = document.querySelector('.summary');
const form = document.querySelector('.order__form');

function createOptions(arr) {
    const regexp = /\s/g;
    let optionArr = 
        arr.map(item => `<label class="option__label option"><input type="checkbox" class="option__checkbox option" name=${item.replace(regexp,'')}>${item}</label>`);
    optionList.innerHTML = optionArr.join(" ");
    options = optionList;
};

function createList() {
    if (!isShowing) {
        inputLabel.append(options);
        isShowing = true;
        input.style.border = '1px solid var(--main-blue)';
    }
};

function filterOptions(e) {
    e.preventDefault;
    optionList.style.display="flex";
    let filteredArr = applications.filter(string => string.toLowerCase().includes(e.target.value.toLowerCase()));
    filteredArr.length === 0 ? optionList.style.display="none" : createOptions(filteredArr);
    
}

function hideElements(e) {
    if (isShowing && !e.target.classList.contains('option')){
        optionList.remove();
        isShowing = false;
        input.style.border = '1px solid var(--main-gray)';
    } else if (isAmountShowing && !e.target.classList.contains('amt')) {
        amountList.remove();
        isAmountShowing = false;
    } 
}

function checkboxChange(e){
    if ((e.target.getAttribute('type') == 'checkbox') && (e.target.checked)){
        createSummaryElem();
    }
}

function createAmountList() {
    amountList.classList.add('amount__content');
    let amountListHTML = '';

    for (let i = 1; i <= 10; i++) {
        amountListHTML += `
            <label class="value form__value amt">${i}
                <input type="radio" class="value__input amt" name="value" value="${i}" ${i === 1 ? 'checked' : ''}>
            </label>
        `;
    }

    amountList.innerHTML = amountListHTML;
}

function createSummaryElem(node, amount = 0, amountInfo = 4000,){
    const summaryElem = document.createElement('div');
    summaryElem.classList.add('summary__elem');
    summaryElem.setAttribute('name',node.name)
    summaryElem.innerHTML = 
        `
            <span class="order__name elem__row">
                ${node.name.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span class="order__cost elem__row">
                ${amount*amountInfo} ₽
            </span>
            <div class="amount order__amount amt elem__row--amount">
                <div class="amount__value amt" tabindex="0"><span class="amount__item amt">0</span>
                </div>
                <span class="amount__info">${amountInfo} ₽/шт</span>
            </div>

            <button class="order__remove elem__row">Удалить</button>
        `
    summaryBlock.append(summaryElem);
    amountBlock = summaryBlock.querySelectorAll('.amount__value');
    
    amountBlock.forEach( block => block.onclick = function(){
        if (isAmountShowing) {
            isAmountShowing = false;
            const costs = document.querySelectorAll('.order__cost');
            const values = document.querySelectorAll('.value__input');
            let costArr=[];
            values.forEach( value => value.onclick = (e) =>{
                e.target.closest('.amount__value').childNodes[0].innerText = e.target.value;
                changePrice(e.target.value,e.target.closest('.summary__elem').childNodes[3]);
                e.target.closest('.amount__content').remove();
                isAmountShowing = true;
                costs.forEach(cost =>costArr.push(Number.parseInt(cost.innerText)));
                setTotalPrice(costArr.reduce((acc,curr) => acc+=curr,0));
            });
        } else {
            block.append(amountList);
            amountList.focus();
            isAmountShowing = true;
        }
    });

    function changePrice(value,elem) {
        elem.innerText = `${value*amountInfo} ₽`;        
    }

    const removeButton = document.querySelectorAll('.order__remove');
    removeButton.forEach( button => button.onclick = (e) => {
        e.preventDefault();
        e.target.closest('.summary__elem').remove();
        const costs = document.querySelectorAll('.order__cost');
        let costArr=[];
        costs.forEach(cost =>costArr.push(Number.parseInt(cost.innerText)));
        setTotalPrice(costArr.reduce((acc,curr) => acc+=curr,0));
        options.querySelector(`[name=${e.target.closest('.summary__elem').getAttribute('name')}]`).checked = false;
    });
}

function deleteSummaryElem(name) {
    summaryBlock.querySelector(`[name=${name}]`).remove();
}

function checkboxesChange(e){
    if (!e.target.matches('.option__checkbox')) {
        return false;
    }
    e.target.checked ? createSummaryElem(e.target) : deleteSummaryElem(e.target.name);
}

function setTotalPrice(num) {
    let totalPrice = 0;
    totalPrice+=num;
    const total = document.querySelector('.price__amount');
    total.innerText = `${totalPrice} ₽`
}

createOptions(applications);
createAmountList();

input.onclick = createList;
input.oninput = filterOptions;
document.addEventListener('click', hideElements);
document.addEventListener('change', checkboxesChange);
form.onsubmit = (e) => {
    e.preventDefault();
    document.querySelector('.order').style.display='none';
    const thankYou = document.createElement('article');
    thankYou.classList.add('end');
    thankYou.innerHTML = `
        <h3 class="end__title">Спасибо за ваш заказ!</h3>
        <h3 class="end__title">В ближайшее время менеджер<br> 
        свяжется с вами, чтобы обсудить детали заказа.</h3>
        <a href="/index.html" class="button end__button">Вернуться на главную</a>
    `;
    document.querySelector('.page').append(thankYou);
}