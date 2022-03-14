export default class ImageSlider {
  #currentPosition = 0;
  #slideNumber = 0;
  #slideWidth = 0;
  sliderWrapEl;
  sliderListEl;
  sliderLi;
  nextBtnEl;
  previousBtnEl;
  indicatorWrapEl;

  constructor() {
    this.assignElement();
    this.initSliderNumber();
    this.initSlideWidth();
    this.initSliderListWidth();
    this.addEvent();
    this.createIndicator();
  }

  assignElement() {
    this.sliderWrapEl = document.getElementById("slider-wrap");
    this.sliderListEl = this.sliderWrapEl.querySelector("#slider");
    this.sliderLi = this.sliderListEl.querySelector("#slider > li");
    this.nextBtnEl = this.sliderWrapEl.querySelector("#next");
    this.previousBtnEl = this.sliderWrapEl.querySelector("#previous");
    this.indicatorWrapEl = this.sliderWrapEl.querySelector("#indicator-wrap");
  }

  initSliderNumber() {
    this.#slideNumber = this.sliderListEl.querySelectorAll("li").length;
    console.log("this.#slideNumber", this.#slideNumber);
  }

  initSlideWidth() {
    this.#slideWidth = this.sliderLi.clientWidth;
  }

  initSliderListWidth() {
    this.sliderListEl.style.width = `${this.#slideNumber * this.#slideWidth}px`;
  }

  addEvent() {
    this.nextBtnEl.addEventListener("click", this.moveToRight.bind(this));
    this.previousBtnEl.addEventListener("click", this.moveToLeft.bind(this));
  }

  moveToRight() {
    this.#currentPosition += 1;

    if (this.#currentPosition > this.#slideNumber - 1) {
      this.#currentPosition = 0;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    console.log("this.#currentPosition", this.#currentPosition);
  }

  moveToLeft() {
    this.#currentPosition -= 1;
    console.log("this.#slideNumber", this.#slideNumber);
    if (this.#currentPosition < 0) {
      this.#currentPosition = this.#slideNumber - 1;
    }
    this.sliderListEl.style.left = `-${
      this.#slideWidth * this.#currentPosition
    }px`;
    console.log("this.#currentPosition", this.#currentPosition);
  }

  createIndicator() {
    const docFragment = document.createDocumentFragment();
    for (let i = 0; this.#slideNumber; i++) {
      const li = document.createElement("li");
      li.dataset.index = i;
      docFragment.appendChild(li);
    }
    this.indicatorWrapEl.querySelector("ul").appendChild(docFragment);
  }
}
