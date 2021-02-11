import '../css/app.scss';
import Background from './background';
import Greeting from './greeting';
import Quote from './quote';
import $ from 'jquery';

class App {
    constructor () {
      this.initApp();
      this.apiClash();
    }

    initApp () {
      // Start application
      new Background();
      new Greeting();
      new Quote();
    }
  
    apiClash() {
      const url = 'https://rickandmortyapi.com/api/character';

      $.ajaxSetup({cache: false}); // enlever le cache
      $.getJSON(url) // récupérer l'API
        .then((response) => {
          console.log(response);
        } )
        .catch((error) => {
          console.log('Error quote', error);
        } )
    }
}

new App();
