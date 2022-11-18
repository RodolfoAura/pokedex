const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

var colooo
var colo2

let searchPokemon = 1

const fetchPokemon = async pokemon => {
  const APIresponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  )

  if (APIresponse.status == 200) {
    const data = await APIresponse.json()


    return data
  } else {
    pokemonImage.style.display = 'none'
    pokemonName.innerHTML = ' erro  - Pokemon inexistente'

    console.log(APIresponse)
  }
}

// Renderizando pokemon
const renderPokemon = async pokemon => {
  pokemonNumber.innerHTML = ''

  const data = await fetchPokemon(pokemon)

  if (data) {
    pokemonImage.style.display = 'block'
  }
  pokemonNumber.innerHTML = data.id + ' - '
  pokemonName.innerHTML = data.name
  if(data['sprites']['versions']['generation-v']['black-white']['animated'][
    'front_default'
    ]!==null){
      pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white']['animated'][
    'front_default'
    ]
    }else{
      pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white'][
    'front_default'
    ]
    }
  

    document.querySelector('#modalImg').src =
    data['sprites']['versions']['generation-v']['black-white'][
    'front_default'
    ]
    
    colo2 = data['sprites']['versions']['generation-v']['black-white'][
      'front_default'
      ]

    colooo = data['sprites']['versions']['generation-v']['black-white'][
      'front_shiny'
      ]

  document.querySelector('#hp').innerHTML = 'hp: ' + data['stats'][0]['base_stat']
  document.querySelector('#atk').innerHTML = 'atk: ' + data['stats'][1]['base_stat']
  document.querySelector('#def').innerHTML = 'def: ' + data['stats'][2]['base_stat']
  document.querySelector('#ats').innerHTML = 'Special atk: ' + data['stats'][3]['base_stat']
  document.querySelector('#des').innerHTML = 'Special def: ' + data['stats'][4]['base_stat']
  document.querySelector('#vel').innerHTML = 'speed: ' + data['stats'][5]['base_stat']
  document.querySelector('.nome').innerHTML = data.id +"-"+ data['name']
  searchPokemon = parseInt(pokemonNumber.innerHTML.split(' ')[0])

 data['types'].forEach((e,indice) => {

 if(indice==0){
  document.querySelector('.modal').style.border="5px solid " + bordinha(e.type.name)
  document.querySelector('.type').src = tipo(e.type.name)
 }else if (indice==1){
  console.log(indice)
  document.querySelector('.type2').src = tipo(e.type.name)
 }else{
  document.querySelector('.type2').src = ""
 }
 });
  
}
// FIM

// evento da barra de pesquisa
form.addEventListener('submit', function (event) {
  event.preventDefault()
  console.log(pokemonNumber.innerHTML.split(' ')[0])
  renderPokemon(input.value.toLowerCase())
  
  input.value = ''
})
// FIM

buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

// Pokemon inicial
renderPokemon(searchPokemon)
// FIM
function modal_info() {
  let modal_info = document.querySelector(".modal")

  modal_info.style.display = "flex"

  let resto = document.querySelector(".buttons")

  resto.style.display = "none"
  let img = document.querySelector(".pokemon__image")

  img.style.display = "none"

  let data = document.querySelector(".pokemon__data")

  data.style.display = "none"

}

function shiny(){
  document.querySelector("#modalImg").src = colooo
  document.querySelector("#modalImg").setAttribute("onclick", "tirashiny()")
}

function tirashiny(){
  document.querySelector("#modalImg").src = colo2
  document.querySelector("#modalImg").setAttribute("onclick", "shiny()")
}

function fechar() {
  let modal_info = document.querySelector(".modal")

  modal_info.style.display = "none"

  let resto = document.querySelector(".buttons")

  resto.style.display = "flex"
  let img = document.querySelector(".pokemon__image")

  img.style.display = "block"

  let data = document.querySelector(".pokemon__data")

  data.style.display = "block"

}

const bordinha = (corzinha) => {
  switch (corzinha) {
    case 'fire': return ("#dc4047")
    case 'water': return ("#54b9e3")
    case 'poison': return ("#83539b")
    case 'grass': return ("#43a04c")
    case 'bug': return ("#a0b65a")
    case 'ground': return ("#9b5e3f")
    case 'electric':return ("#dcb602")
    case 'fairy':return ("#ef9cb7")
    case 'flying':return ("#5884ef")
    case 'dark':return ("#545361")
    case 'dragon':return ("#0786a3")
    case 'fighting':return ("#d87b47")
    case 'ghost':return ("#a3739b")
    case 'ice':return ("#6db6bb")
    case 'steel':return ("#7e889b")
    case 'rock':return ("#a38e7a")
    case 'psychic':return ("#e86e9b")
    case 'normal':return ("#979693")

    default: 
    return ("#fff")
  }
}

const tipo = (imagemzinha) => {
  switch (imagemzinha) {
    case 'fire': return ("./assets/fire.png")
    case 'water': return ("./assets/water.png")
    case 'poison': return ("./assets/poison.png")
    case 'grass': return ("./assets/grass.png")
    case 'bug': return ("./assets/bug.png")
    case 'ground': return ("./assets/ground.png")
    case 'electric':return ("./assets/electric.png")
    case 'fairy':return ("./assets/fairy.png")
    case 'flying':return ("./assets/flying.png")
    case 'dark':return ("./assets/dark.png")
    case 'dragon':return ("./assets/dragon.png")
    case 'fighting':return ("./assets/fighting.png")
    case 'ghost':return ("./assets/ghost.png")
    case 'ice':return ("./assets/ice.png")
    case 'steel':return ("./assets/steel.png")
    case 'rock':return ("./assets/rock.png")
    case 'psychic':return ("./assets/psychic.png")
    case 'normal':return ("./assets/normal.png")

    default: 
    return ("")
  }
}




