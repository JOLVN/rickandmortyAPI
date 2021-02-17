import SearchTemplate from '../templates/search.hbs'

export default class SearchBar {

  constructor() {
    this.initElements()
    this.initEvents()
  }

  initElements() {
    this.searchDiv = document.querySelector('.search-bar')
    this.list = document.querySelector('.list')
    this.string = ''
  }

  initEvents() {
    this.placeholder()
    this.filterSearch()

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


  filterSearch() {
    this.searchDiv.addEventListener('keyup', () => {

      let input = this.searchDiv.querySelector('input')
      let valInput = input.value

      // Gagne du temps
      if (valInput == '') {
        this.showLi()
      }

      // Faire évoluer le regex en fonction des cracatères recherchés
      let regexp = '\\b(.*)'
      for (let i in valInput) {
        regexp += '('+valInput[i]+')(.*)'
      }
      regexp += '\\b'
      
      // Montrer tous les personnages avant de vérifier
      this.showLi()

      // Vérifier tous les spans
      let spans = this.list.querySelectorAll('span')
      spans.forEach((span) => {
        // Comparer les spans avec le regex
        let res = span.innerText.match(new RegExp(regexp, 'i'))
        this.string = ''
        if (res) {
          // Surligner les lettres recherchées
          for (let i in res) {
            if (i > 0) {
              if (i % 2 == 0) {
                this.string += '<span class="highlighted">' + res[i] + '</span>'
              } else {
                this.string += res[i]
              } 
            }
          }
          span.innerText = ""
          span.innerHTML = this.string
        } else {
          // Cacher les personnages non recherchés
          if (!span.classList.contains('highlighted')) {
            span.parentNode.parentNode.style.display = "none"
          }
        }
      })

    })
  }


  showLi() {
    let li = this.list.querySelectorAll('li')
    li.forEach((li) => {
      li.style.display = "block"
    })
  }

}