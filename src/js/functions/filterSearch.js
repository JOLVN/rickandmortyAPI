export function filterSearch() {

  var searchDiv = document.querySelector('.search-bar')
  var list = document.querySelector('.list')

  searchDiv.addEventListener('keyup', () => {

    let input = searchDiv.querySelector('input')
    let valInput = input.value

    // Gagne du temps
    if (valInput == '') {
      let li = list.querySelectorAll('li')
      li.forEach((li) => {
      li.style.display = "block"
    })
    }

    // Faire évoluer le regex en fonction des cracatères recherchés
    let regexp = '\\b(.*)'
    for (let i in valInput) {
      regexp += '('+valInput[i]+')(.*)'
    }
    regexp += '\\b'
    
    // Montrer tous les personnages avant de vérifier
    let li = list.querySelectorAll('li')
    li.forEach((li) => {
      li.style.display = "block"
    })

    // Vérifier tous les spans
    let spans = list.querySelectorAll('span')
    spans.forEach((span) => {
      // Comparer les spans avec le regex
      let res = span.innerText.match(new RegExp(regexp, 'i'))
      let string = ''
      if (res) {
        // Surligner les lettres recherchées
        for (let i in res) {
          if (i > 0) {
            if (i % 2 == 0) {
              string += '<span class="highlighted">' + res[i] + '</span>'
            } else {
              string += res[i]
            } 
          }
        }
        span.innerText = ""
        span.innerHTML = string
      } else {
        // Cacher les personnages non recherchés
        if (!span.classList.contains('highlighted')) {
          span.parentNode.parentNode.style.display = "none"
        }
      }
    })

  })
}