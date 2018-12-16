import Nav from './components/nav.js'
import Cards from './components/cards.js'


const bootstrap = () => {
    const nav = new Nav;
    const cards = new Cards;
}

window.addEventListener('load', bootstrap);