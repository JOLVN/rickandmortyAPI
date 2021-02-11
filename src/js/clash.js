import $ from 'jquery';

export default class Clash {

  constructor() {
    this.initEls();
    this.initEvents();
  }

  initEls() {
    this.$els = {
      quoteText: $('.js-quote-text'),
      quoteAuthor: $('.js-quote-author'),
      container: $('.js-container')
    }
  }

  initEvents() {
    this.getQuote();
  }

  getQuote() {
    const api = {
      endpoint: 'https://api.clashroyale.com/v1/',
      params: {
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
    console.log(quoteContent, quoteAuthor);
    this.$els.quoteText.prepend(quoteContent);
    this.$els.quoteAuthor.text(quoteAuthor);
    this.$els.container.addClass('is-ready');
  }

}