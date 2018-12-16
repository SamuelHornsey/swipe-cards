export default class Cards {
    constructor () {
        this.mainCard = document.querySelector('.js-card-main');

        this._reset();

        this._touchDown = this._touchDown.bind(this);
        this._touchMove = this._touchMove.bind(this);
        this._touchEnd = this._touchEnd.bind(this);

        this.mainCard.addEventListener('touchstart', this._touchDown);
        this.mainCard.addEventListener('touchmove', this._touchMove);
        this.mainCard.addEventListener('touchend', this._touchEnd);

        this.mainCard.addEventListener('transitionend', () => {
            this.mainCard.style.transition = "";
        });
    }

    _reset () {
        this.mainCard.style.transform = `translate(0px, 0px)`;
 
        this.isGoingOut = false;
   
        this.startX = 0;
        this.startY = 0;

        this.currentX = 0;
        this.currentY = 0;

        this.velocityX = 0;
        this.velocityY = 0;
        
        this.DEGREES = 25;
    }

    _touchDown (event) {
        this.startX = event.touches[0].clientX;
        this.startY = event.touches[0].clientY;

        this.currentX = event.touches[0].clientX;
        this.currentY = event.touches[0].clientY;

        const rect = this.mainCard.getBoundingClientRect();

        if (this.startY - rect.y > rect.height / 2) {
            this.isTop = false;
        } else {
            this.isTop = true;
        }
    }

    _touchMove (event) {
        const x = event.touches[0].clientX;
        const y = event.touches[0].clientY;

        const rect = this.mainCard.getBoundingClientRect();

        if (Math.abs(x - this.startX) > rect.width / 2) {
            this.isGoingOut = true;
        } else {
            this.isGoingOut = false;
        }

        requestAnimationFrame(() => {
            this._update(x, y);
        });
    }

    _touchEnd () {
        if (Math.abs(this.velocityX) >= 8) {
            this.isGoingOut = true;
        }

        if (this.isGoingOut) {
            requestAnimationFrame(() => {
                this._sendOut();
            })
        } else {
            requestAnimationFrame(() => {
                this._clear();
            });
        }
    }

    _update (x, y) {
        // Set Velocity
        this.velocityX = (x - this.startX) - this.currentX;
        this.velocityY = (y - this.startY) - this.currentY;

        // Current Position
        this.currentX = x - this.startX;
        this.currentY = y - this.startY;

        const inverse = this.isTop ? 1 : -1;
        const degrees = this.currentX / (window.innerWidth / 2) * this.DEGREES;

        this.mainCard.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${degrees * inverse}deg)`;
    }

    _sendOut () {
        let x = this.currentX;
        let y = this.currentY;

        let vx = Math.abs(this.velocityX) > 5 ? this.velocityX : 5 * Math.sign(this.velocityX);
        let vy = this.velocityY;

        if (vx === 0) {
            vx = 5;
        }

        const update = () => {
            
            if (Math.abs(x) > 400) {
                this._reset();
                return;
            }

            const inverse = this.isTop ? 1 : -1;
            const degrees = x / (window.innerWidth / 2) * this.DEGREES;
            this.mainCard.style.transform = `translate(${x}px, ${y}px) rotate(${degrees * inverse}deg)`;

            x += vx;
            y += vy;

            requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
    }

    _clear () {
        this.mainCard.style.transition = `transform .2s ease`;
        this._reset();
    }
}