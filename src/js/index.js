import '../css/app.scss'
import Header from './header'
import Data from './data'
import Character from './character'

class App {
    constructor () {
      this.initApp()

    }
    
    initApp () {
      // Start application
      new Header()
      new Data()
      new Character()
    }
  
}

new App()
