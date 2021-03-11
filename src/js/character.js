import { getUrl } from './functions/getUrl'
import CharacterTemplate from '../templates/character.hbs'
import $ from 'jquery'
import { filterSearch } from './functions/filterSearch'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.urlCharacters = getUrl('character', 1)
    this.characters = document.querySelector('.characters')
    this.loadPage = 1
    this.button = document.querySelector('input[type="button"]')
    this.searchDiv = document.querySelector('.search-bar')
    this.episode = []
  }

  initEvents() {
    if (this.characters != undefined) {

      this.getDatas(this.loadPage)
      this.pressButton()
      this.searchCharacter()
    }
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

  changeColorStatus() {
    // let statusColor = document.querySelectorAll('.color')
    let characters = document.querySelectorAll('.character')
    characters.forEach((char) => {
      let status = char.querySelector('.status__character')
      let color = char.querySelector('.color')
      switch (status.innerText) {
        case 'Alive':
          color.style.backgroundColor = "green"
          break;
        case 'Dead':
          color.style.backgroundColor = "red"
          break;
        default:
          color.style.backgroundColor = "orange"
          break;
      }
    })
  }
  

  // Permet de faire une recherche
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


  // Parcours la réponse et lance la fonction permettant de trouver l'episode
  readyDatas(response) {
    if (this.characters != null) {
      for (let i = 0; i < response.results.length; i++) {
        this.getEpisode(response, i)
      }
      this.changeColorStatus()
    }
  }
  
  // Trouve l'épisode et lance la fonction qui permet de retourner les données
  getEpisode(responseData, i) {
    const result = responseData.results[i]
    $.ajaxSetup({ cache: false })
    $.getJSON(result.episode[0]) 
      .then((response) => {
        this.episode[i] = response.episode
        this.returnDatas(result, i)
        this.changeColorStatus()
      })
      .catch((error) => {
        console.log('Error api', error)
      })
  }

  // Retourne les données
  returnDatas(result, i) {
    const character = CharacterTemplate({
      name: result.name,
      image: result.image,
      species: result.species,
      gender: result.gender,
      episode: this.episode[i],
      origin: result.origin.name,
      status: result.status
    })
    
    let li = document.createElement('li');
    li.classList.add('character')
    this.characters.appendChild(li)
    li.innerHTML = character
  }

}