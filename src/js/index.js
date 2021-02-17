import '../css/app.scss'
import Header from './header'
import Character from './character'
import SearchBar from './searchBar'

class App {
    constructor () {
      this.initApp()

    }
    
    initApp () {
      // Start application
      new Header()
      new Character()
      new SearchBar()
    }
  
}

new App()
