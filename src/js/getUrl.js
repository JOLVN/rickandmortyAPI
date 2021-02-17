
export function getUrl(param, page) {
  var url = ""
  if (page == 1) {
    url = `https://rickandmortyapi.com/api/${param}`
  } else {
    url = `https://rickandmortyapi.com/api/${param}?page=${page}`
  }

  return url
  
}