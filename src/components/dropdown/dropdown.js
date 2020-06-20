document.querySelectorAll('.js-dropdown').forEach(dropdown => {
    let totalCounter = 0
    dropdown.querySelectorAll('.js-counter-item').forEach(el => {
        totalCounter += Number(el.value)
    })
    dropdown.addEventListener('click', dropdownClicked)

    function dropdownClicked(event) {
        window.addEventListener('click', closeDropdown)
        if (event.target.closest('.js-dropdown__selection')) {
            showDropdown()
        }
        if (event.target.className.indexOf('js-accept')>=0) {
            event.preventDefault();
            showDropdown()
        }
        if (event.target.className.indexOf('js-clean')>=0) {
            event.preventDefault();
            totalCounter = 0;
            dropdown.querySelector('.dropdown__title').textContent = titleCounter(totalCounter, dropdown);
            dropdown.querySelectorAll('.counter-item').forEach((item)=> {
                item.value = 0;
            })
        }
        if (event.target.closest('.js-menu__option')) {
            changeOptions()
        }
        
    }

    function showDropdown() {
        dropdown.classList.toggle('show')
    }

    function changeOptions() {
        let item = event.target.closest('.js-menu__option').querySelector('.js-counter-item')
        let counter = Number(item.value)
        if (event.target.className === 'counter__increment' && counter<4) {
            counter++;
            totalCounter++;
        }
        if (event.target.className === 'counter__decrement' && counter>0) {
            counter--;
            totalCounter--;
        }
        if (totalCounter == 0 && dropdown.querySelectorAll('.js-clean').length>0) {
            dropdown.querySelector('.js-clean').style.visibility='hidden';
        }
        if (totalCounter>0 && dropdown.querySelectorAll('.js-clean').length>0) {
            dropdown.querySelector('.js-clean').style.visibility='visible';
        }
        item.value = counter.toString();
        dropdown.querySelector('.js-dropdown__title').textContent = titleCounter();
    }

    function titleCounter() {
        let word ='';
        let title='';
        if (dropdown.querySelector('.dropdown__title').classList.contains('room')){
            roomsTitle()
        }
        else {
            guestsTitle()
        }
        return title;
        function roomsTitle() {
            if (totalCounter === 0) {
                title= 'Сколько комнат'
            }
            else {
                let arr = []
                dropdown.querySelectorAll('.menu__option').forEach(el => {
                    if (el.querySelector('.counter-item').value>0) {
                        arr.push(elementTitle(el.querySelector('.option__title').textContent, parseInt(el.querySelector('.counter-item').value)))
                    }
                    title = arr.join(', ')
                    function elementTitle(name, value) {
                        if (name === 'спальни') {
                            switch(value) {
                                case 1: 
                                    name = 'спальня';
                                    break;
                                default:
                                    name = 'спальни';
                            }
                        }
                        if (name === 'кровати') {
                            switch(value) {
                                case 1: 
                                    name = 'кровать';
                                    break;
                                default:
                                    name = 'кровати';
                            }
                        }
                        if (name === 'ванные комнаты') {
                            switch(value) {
                                case 1: 
                                    name = 'ванная комната';
                                    break;
                                default:
                                    name = 'ванные комнаты';
                            }
                        }
                        const elementTitle = value + ' ' + name
                        return elementTitle
                    }
                })
            }
        }
        function guestsTitle() {
            let baby = 0;
            let babyCount='';
            dropdown.querySelectorAll('.menu__option').forEach(el => {
                if (el.querySelector('.option__title').textContent === 'младенцы'){
                    baby = el.querySelector('.counter-item').value;
                }
            })
            if (baby == 1) {
                babyCount= `, ${baby} младенец`;
            }
            if (baby > 1) {
                babyCount = `, ${baby} младенца`;
            }
            title = 'Сколько гостей';
            switch(totalCounter) {
                case 0:
                    return title;
                case 1:
                    word= 'гость';
                    title = `${totalCounter} ${word} ${babyCount}`;
                    break;
                case 2:
                case 3:
                case 4:
                    word= 'гостя';
                    title = `${totalCounter} ${word} ${babyCount}`;
                    break;
                default:
                    word= 'гостей';
                    title = `${totalCounter} ${word} ${babyCount}`;
        }
        }
    }

    function closeDropdown() {
        if (event.target.closest('.js-dropdown') !== dropdown) {
            showDropdown();   
            window.removeEventListener('click', closeDropdown);
        }
    }
})


