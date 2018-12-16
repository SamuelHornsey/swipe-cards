export default class Nav {
    constructor () {
        this.reveal = document.querySelector('.js-nav-reveal');
        this.container = document.querySelector('.js-main-container');

        this.open = false;

        this._toggle = this._toggle.bind(this);

        this.reveal.addEventListener('click', this._toggle);
    }

    _toggle () {
        if (!this.open) {
            this.container.classList.add('container--open');
        }

        if (this.open) {
            this.container.classList.remove('container--open');
        }

        this.open = !this.open;
    }
}