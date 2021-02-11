import Data from './data'
import CharacterTemplate from '../templates/character.hbs'

export default class character {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.datas = new Data()
    this.characters = document.querySelector('.characters')
  }

  initEvents() {
    this.getDatas()
  }

  getDatas() {
    if (this.datas.response == undefined) {
      setTimeout(() => {
        this.readyDatas()
      }, 600)
    }
  }

  readyDatas() {
    if (this.characters != null) {
      for (let i = 0; i < this.datas.response.results.length ; i++) {
        this.returnDatas(i)
      }
    }
  }

  returnDatas(i) {
    const character = CharacterTemplate({
      name: this.datas.response.results[i].name
    })
    let div = document.createElement('div');
    div.classList.add('character')
    this.characters.appendChild(div)
    div.innerHTML = character
    console.log(this.datas.response);
  }

}