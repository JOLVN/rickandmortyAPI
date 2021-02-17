import { getUrl } from './getUrl'
import CharacterTemplate from '../templates/character.hbs'
import $ from 'jquery'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.urlCharacters = getUrl('character', 1)
    this.characters = document.querySelector('.characters')
  }

  initEvents() {
    this.getDatas()
  }

  getDatas() {
    for (let i = 1; i < 30; i++) {
      $.ajaxSetup({ cache: false }) // enlever le cache
      $.getJSON(this.urlCharacters) // récupérer l'API
        .then((response) => {
          this.readyDatas(response);
        })
        .catch((error) => {
          console.log('Error api', error)
        })
      this.urlCharacters = getUrl('character', i)
    }
  }

  readyDatas(response) {
    if (this.characters != null) {
      for (let i = 0; i < response.results.length ; i++) {
        this.returnDatas(response, i)
      }
    }
  }

  returnDatas(response, i) {
    const result = response.results[i]
    const character = CharacterTemplate({
      name: result.name,
      image: result.image,
      species: result.species,
      gender: result.gender,
      episode: result.episode[0],
      origin: result.origin.name,
      status: result.status
    })
    
    let li = document.createElement('li');
    li.classList.add('character')
    this.characters.appendChild(li)
    li.innerHTML = character
  }

}