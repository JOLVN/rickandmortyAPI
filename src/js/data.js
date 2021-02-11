import $ from 'jquery'

export default class Data {

  constructor() {
    this.initElements()
    this.getAPI()
  }

  initElements() {
    this.datas = {
      urlCharacters: 'https://rickandmortyapi.com/api/character',
    }
  }

  getAPI() {

    const elements = this.datas
    $.ajaxSetup({ cache: false }) // enlever le cache
    $.getJSON(elements.urlCharacters) // récupérer l'API
      .then((response) => {
        return this.response = response
      })
      .catch((error) => {
        console.log('Error api', error)
      })
  
  }


}
