// Pour importer le menu dans la balise avec la classe "menu"


import MenuTemplate from '../parts/components/menu.hbs'


export default class Header {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.data = {
      menu: document.querySelector('.menu')
    }
  }

  initEvents() {
    this.getHeader();
  }

  getHeader() {
    const menu = MenuTemplate();
    this.data.menu.innerHTML = menu;
  }
}