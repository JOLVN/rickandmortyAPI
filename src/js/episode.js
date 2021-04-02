import { getUrl } from './functions/getUrl'
import EpisodeTemplate from '../templates/episode.hbs'
import $ from 'jquery'
import { filterSearch } from './functions/filterSearch'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.urlCharacters = getUrl('episode', 1)
    this.episodes = document.querySelector('.episodes')
    this.loadPage = 1
    this.button = document.querySelector('input[type="button"]')
    this.searchDiv = document.querySelector('.search-bar')
    this.episode = []
  }

  initEvents() {
    if (this.episodes != undefined) {

      this.getDatas(this.loadPage)
      this.pressButton()
      this.searchCharacter()
    }
  }


  // Récupérer les données de l'API
  getDatas(loadPage) {
    this.urlCharacters = getUrl('episode', loadPage)
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
        this.episodes.innerText = ""
        for (let i = 1; i < 4; i++) {
          this.getDatas(i)
        }
        filterSearch()
      } else if (input.value == '') {
        this.isSearch = false
        this.episodes.innerText = ""
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
    const episode = EpisodeTemplate({
      name: result.name,
      episode: result.episode,
      date: result. air_date
    })
    
    let li = document.createElement('li');
    li.classList.add('episode')
    this.episodes.appendChild(li)
    li.innerHTML = episode
  }

}