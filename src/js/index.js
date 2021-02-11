import '../css/app.scss';
import $ from 'jquery';

class App {
    constructor () {
      this.initApp();
    }

    initApp () {
      // Start application

    }
  
    api() {
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
