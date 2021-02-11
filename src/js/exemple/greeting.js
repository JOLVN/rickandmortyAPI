/*
* Objectif : déterminer un "salut" en fonction de l'heure et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une salutation en fonction de l'heure
* 3- Récupérer une valeur aléatoire à partir d'un tableau
* 4- Afficher le résultat
* */


import { getGreetingByTime } from './helper/greetingsHelper';

export default class Greeting {

  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    this.$els = {
      greeting: document.querySelector('.js-greeting'),
    };
    this.names = ['S4 prog', 'BG', 'dude', 'my friend', 'Camille'];
  }

  initEvents() {
    this.displayMessage();
  }

  selectName() {
    const i = Math.floor(Math.random() * this.names.length);
    return this.names[i];
  }

  makeMessage() {
    return `Good ${getGreetingByTime()}, ${this.selectName()}`;
  }

  displayMessage() {
    this.$els.greeting.innerHTML = this.makeMessage();
  }

}
