export default class DropdownOption {
  constructor(htmlElement) {
    this.container = htmlElement.querySelector('.js-dropdown-option')
    this.name = htmlElement.querySelector('.js-dropdown-option__name').textContent
    this.input = htmlElement.querySelector('.js-dropdown-option__input')
    this.value = 0
    this.getHTMLElements();
    this.bindEventListeners()
  }

  getHTMLElements() {
    const signs = {
      increment: '+',
      decrement: '-',
    }
    this.container.querySelectorAll('.js-dropdown-option__btn').forEach((el) => {
      if (el.textContent === signs.increment) {
        this.incrementButton = el
      }
      if (el.textContent === signs.decrement) {
        this.decrementButton = el
      }
    })
  }

  bindEventListeners() {
    this.incrementButton.addEventListener('click', this.increaseCounter.bind(this))
    this.decrementButton.addEventListener('click', this.decreaseCounter.bind(this))
  }

  increaseCounter() {
    if (this.value < 4) {
      this.value +=1
    }
    this.displayResult()
  }

  decreaseCounter() {
    if (this.value > 0) {
      this.value -=1
    }
    this.displayResult()
  }

  displayResult() {
    this.input.setAttribute('value', this.value)
    this.input.value = this.value 
    this.result = `${this.value} ${this.name} `
  }
}