import { getUrl } from './functions/getUrl'
import LocationTemplate from '../templates/location.hbs'
import $ from 'jquery'
import { filterSearch } from './functions/filterSearch'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.urlCharacters = getUrl('character', 1)
    this.locations = document.querySelector('.locations')
    this.loadPage = 1
    this.button = document.querySelector('input[type="button"]')
    this.searchDiv = document.querySelector('.search-bar')
    this.episode = []
  }

  initEvents() {
    if (this.locations != undefined) {

      this.getDatas(this.loadPage)
      this.pressButton()
      this.searchCharacter()
    }
  }


  // Récupérer les données de l'API
  getDatas(loadPage) {
    this.urlCharacters = getUrl('location', loadPage)
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

  

  // Permet de faire une recherche
  searchCharacter() {
    this.searchDiv.addEventListener('keyup', () => {
      let input = this.searchDiv.querySelector('input[type="text"]')
      if (input.value != '' && !this.isSearch) {
        this.isSearch = true
        this.loadPage = 1
        this.locations.innerText = ""
        for (let i = 1; i < 7; i++) {
          this.getDatas(i)
        }
        filterSearch()
      } else if (input.value == '') {
        this.isSearch = false
        this.locations.innerText = ""
        this.loadPage = 1
        this.getDatas(this.loadPage)
      }
    })
  }


  // Parcours la réponse et lance la fonction permettant de trouver l'episode
  readyDatas(response) {
    for (let i = 0; i < response.results.length; i++) {
      const result = response.results[i]
      this.returnDatas(result)
    }
  }
  

  // Retourne les données
  returnDatas(result) {
    const location = LocationTemplate({
      name: result.name,
      type: result.type,
      dimension: result.dimension,
    })
    
    let li = document.createElement('li');
    li.classList.add('location')
    this.locations.appendChild(li)
    li.innerHTML = location
  }

}