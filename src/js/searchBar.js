import SearchTemplate from '../templates/search.hbs'

export default class SearchBar {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.searchDiv = document.querySelector('.search-bar')
  }

  initEvents() {
    this.placeholder()
    // this.filterSearch()

  }


  placeholder() {
    if (this.searchDiv.classList.contains('search-bar__home')) {
      this.placeholderStr = "Search a character, location or episode"
      this.injectTemplate(this.placeholderStr)
    }
    else if (this.searchDiv.classList.contains('search-bar__characters')) {
      this.placeholderStr = "Search a character"
      this.injectTemplate(this.placeholderStr)
    }
    else {
      this.placeholderStr = "Search a location"
      this.injectTemplate(this.placeholderStr)
    }
  }

  injectTemplate(placeholder) {
    const search = SearchTemplate({
      placeholder: placeholder
    })
    this.searchDiv.innerHTML = search
  }


}