import { getUrl } from './functions/getUrl'
import CharacterTemplate from '../templates/character.hbs'
import $ from 'jquery'
import { filterSearch } from './functions/filterSearch'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
    this.pressButton()
    this.searchCharacter()
  }

  initElements() {
    this.urlCharacters = getUrl('character', 1)
    this.characters = document.querySelector('.characters')
    this.loadPage = 1
    this.button = document.querySelector('input[type="button"]')
    this.searchDiv = document.querySelector('.search-bar')
  }

  initEvents() {
    this.getDatas(this.loadPage)
  }


  // Récupérer les données de l'API
  getDatas(loadPage) {
    this.urlCharacters = getUrl('character', loadPage)
      $.ajaxSetup({ cache: false })
      $.getJSON(this.urlCharacters) 
        .then((response) => {
          this.readyDatas(response);
        })
        .catch((error) => {
          console.log('Error api', error)
        })
  }

  // Charger plus de personnages
  pressButton() {
    this.button.addEventListener('click', () => {
      this.loadMore()
    })
  }

  loadMore() {
    this.loadPage += 1
    this.getDatas(this.loadPage)
  }
  // Charger plus de personnages


  searchCharacter() {
    this.searchDiv.addEventListener('keyup', () => {
      let input = this.searchDiv.querySelector('input[type="text"]')
      if (input.value != '' && !this.isSearch) {
        this.isSearch = true
        this.loadPage = 1
        this.characters.innerText = ""
        for (let i = 1; i < 30; i++) {
          this.getDatas(i)
        }
        filterSearch()
      } else if (input.value == '') {
        this.isSearch = false
        this.characters.innerText = ""
        this.loadPage = 1
        this.getDatas(this.loadPage)
      }
    })
  }


  // Afficher les données
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
  // Afficher les données

}