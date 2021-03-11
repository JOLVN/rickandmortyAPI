import '../css/app.scss'
import Header from './header'
import Character from './character'
import Location from './location'
import Episode from './episode'
import SearchBar from './searchBar'

class App {
    constructor () {
      this.initApp()

    }
    
    initApp () {
      // Start application
      new Header()
      new Character()
      new Location()
      new Episode()
      new SearchBar()
    }
  
}

new App()
