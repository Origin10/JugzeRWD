'use strict';

// Решал Георгий Волокитин

/**
 * Карусель
 *
 * Листание бесконечное (круговое) в обе стороны.
 * Осуществляется заменой src у <img />.
 * Добавления новых элементов в DOM не происходит.
 *
 * Листать можно, кликая мышкой по стрелкам,
 * или нажимая клавиши стрелок на клавиатуре.
 *
 * При клике по элементу карусели, соответствующее изображение
 * показывается крупно.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Carousel = function () {
  function Carousel(element, options) {
    _classCallCheck(this, Carousel);

    this.element = element;
    this.showcaseImage = element.querySelector('.js-showcase-image');
    this.container = element.querySelector('.js-item-container');
    this.prev = element.querySelector('.js-prev');
    this.next = element.querySelector('.js-next');
    this.images = element.querySelectorAll('.js-item-image');

    this.items = ['https://useful-info.github.io/kittens/1.jpg', 'https://useful-info.github.io/kittens/2.jpg', 'https://useful-info.github.io/kittens/3.jpg', 'https://useful-info.github.io/kittens/4.jpg', 'https://useful-info.github.io/kittens/5.jpg', 'https://useful-info.github.io/kittens/6.jpg', 'https://useful-info.github.io/kittens/7.jpg', 'https://useful-info.github.io/kittens/8.jpg', 'https://useful-info.github.io/kittens/9.jpg', 'https://useful-info.github.io/kittens/10.jpg', 'https://useful-info.github.io/kittens/11.jpg'];

    this.count = options.count;
    this.position = 0;

    if (!this.element) {
      throw new Error('Something is missing! Check the layout!');
    }

    this.init();
  }

  Carousel.prototype.init = function init() {
    window.addEventListener('keydown', this.catchKeyDown.bind(this));
    window.addEventListener('keyup', this.catchKeyUp.bind(this));
    this.prev.addEventListener('click', this.moveBack.bind(this));
    this.next.addEventListener('click', this.moveForward.bind(this));
    this.container.addEventListener('click', this.catchClick.bind(this));

    this.setup();
  };

  /**
   * Осуществляет начальную расстановку картинок
   */

  Carousel.prototype.setup = function setup() {
    this.showcaseImage.setAttribute('src', this.items[0]);

    var index = 0;
    this.setImages(this.items);
  };

  /**
   * Определяет, стрелка ли была нажата,
   * и вызывает соответствующие методы подсветки
   * и листания карусели
   * @param {Event Object} :: объект события
   */

  Carousel.prototype.catchKeyDown = function catchKeyDown(event) {
    if (event.keyCode === 37) {
      this.lightOn(this.prev);
      this.moveBack();
    } else if (event.keyCode == 39) {
      this.lightOn(this.next);
      this.moveForward();
    }
  };

  /**
   * Подсвечивает стрелку соответствующего направления
   * @param {HTMLElement} :: элемент нажатой стрелки
   */

  Carousel.prototype.lightOn = function lightOn(element) {
    element.querySelector('i').setAttribute('style', 'color: #F44336;');
  };

  /**
   * Листает карусель назад
   */

  Carousel.prototype.moveBack = function moveBack() {
    var links = this.getLinks('back');
    this.setImages(links);
  };

  /**
   * Собирает и возвращает массив ссылок
   * в зависимости от направления листания карусели
   * @param {string} :: направление листания карусели
   * @return {Array Object}
   */

  Carousel.prototype.getLinks = function getLinks(direction) {
    var src = [];
    if (direction === 'back') {
      switch (this.position) {
        case 0:
          src.push(this.items[this.count - 1]);
          src.push(this.items[0]);
          src.push(this.items[1]);
          this.position = this.count - 1;
          break;

        case this.count - 1:
          src.push(this.items[this.count - 2]);
          src.push(this.items[this.count - 1]);
          src.push(this.items[0]);
          --this.position;
          break;

        default:
          src.push(this.items[this.position - 1]);
          src.push(this.items[this.position]);
          src.push(this.items[this.position + 1]);
          --this.position;
      }

      return src;
    } else if (direction === 'forward') {
      switch (this.position) {
        case this.count - 1:
          src.push(this.items[0]);
          src.push(this.items[1]);
          src.push(this.items[2]);
          this.position = 0;
          break;

        case this.count - 2:
          src.push(this.items[this.count - 1]);
          src.push(this.items[0]);
          src.push(this.items[1]);
          this.position++;
          break;

        case this.count - 3:
          src.push(this.items[this.count - 2]);
          src.push(this.items[this.count - 1]);
          src.push(this.items[0]);
          this.position++;
          break;

        default:
          src.push(this.items[this.position + 1]);
          src.push(this.items[this.position + 2]);
          src.push(this.items[this.position + 3]);
          this.position++;
      }

      return src;
    }
  };

  /**
   * Устанавливает изображениям новые src
   * @param {Array Object} :: массив ссылок
   */

  Carousel.prototype.setImages = function setImages(links) {
    var index = 0;
    Array.prototype.forEach.call(this.images, function (image) {
      image.setAttribute('src', '');
      image.setAttribute('src', links[index]);
      index++;
    });
  };

  /**
   * Листает карусель вперед
   */

  Carousel.prototype.moveForward = function moveForward() {
    var links = this.getLinks('forward');
    this.setImages(links);
  };

  /**
   * Определяет, стрелка ли была отпущена,
   * и вызывает соответствующий метод снятия подсветки
   * @param {Event Object} :: объект события
   */

  Carousel.prototype.catchKeyUp = function catchKeyUp(event) {
    if (event.keyCode === 37) {
      this.lightOff(this.prev);
    } else if (event.keyCode == 39) {
      this.lightOff(this.next);
    }
  };

  /**
   * Снимает подсветку стрелки соответствующего направления
   * @param {HTMLElement} :: элемент отпущенной стрелки
   */

  Carousel.prototype.lightOff = function lightOff(element) {
    element.querySelector('i').setAttribute('style', '');
  };

  /**
   * Отлавливает клики по элементам карусели
   * и вызывает метод показа изображения
   * @param {Event Object} :: объект события
   */

  Carousel.prototype.catchClick = function catchClick(event) {
    var link = event.target.closest('.js-carousel-link');
    if (link) this.show(link);
  };

  /**
   * Показывает выбранное изображение в блоке Showcase
   * @param {HTMLElement} :: нажатая ссылка с изображением
   */

  Carousel.prototype.show = function show(element) {
    var src = element.querySelector('.js-item-image').getAttribute('src');
    this.showcaseImage.setAttribute('src', src);
  };

  return Carousel;
}();

/**
 * Инициализирует карусели на странице
 */

function initCarousel() {
  var carousel = [];
  Array.prototype.forEach.call(document.querySelectorAll('.js-carousel'), function (item) {
    carousel.push(new Carousel(item, {
      count: 11
    }));
  });
}

initCarousel();
