/*
* Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
*
* Étapes :
* 1- Créer une référence vers les éléments du DOM qu'on va utiliser
* 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
* 3- Afficher la citation
* */

import $ from 'jquery';
import QuoteTemplate from './hbs/quote.hbs';

export default class Quote {

  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    this.$els = {
      container: $('.js-container'),
      quote: $('.js-quote')
    }
  }

  initEvents() {
    this.getQuote();
  }

  getQuote() {
    const api = {
      endpoint: 'https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand',
      params: {
        'per_page': 1,
      },
    };

    $.ajaxSetup({cache: false}); // enlever le cache
    $.getJSON(api.endpoint, api.params) // récupérer l'API
      .then((response) => {
        this.renderQuote(response);
      } )
      .catch((error) => {
        console.log('Error quote', error);
      } )
  }

  renderQuote(quoteData) {
    const quoteContent = quoteData[0].content.rendered;
    const quoteAuthor = quoteData[0].title.rendered;

    const quote = QuoteTemplate({
      text: quoteContent,
      author: quoteAuthor,
    });
    this.$els.quote.html(quote);

    this.$els.container.addClass('is-ready');
  }

}