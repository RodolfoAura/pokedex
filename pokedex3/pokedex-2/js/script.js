const pokemonName = document.querySelector('.pokemon__name')
const pokemonNumber = document.querySelector('.pokemon__number')
const pokemonImage = document.querySelector('.pokemon__image')

const form = document.querySelector('.form')
const input = document.querySelector('.input__search')

const buttonPrev = document.querySelector('.btn-prev')
const buttonNext = document.querySelector('.btn-next')

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
  pokemonImage.src =
    data['sprites']['versions']['generation-v']['black-white']['animated'][
    'front_default'
    ]

    document.querySelector('#modalImg').src =
    data['sprites']['versions']['generation-v']['black-white'][
    'front_default'
    ]

  document.querySelector('#hp').innerHTML = 'hp: ' + data['stats'][0]['base_stat']
  document.querySelector('#atk').innerHTML = 'atk: ' + data['stats'][1]['base_stat']
  document.querySelector('#def').innerHTML = 'def: ' + data['stats'][2]['base_stat']
  document.querySelector('#ats').innerHTML = 'Special atk: ' + data['stats'][3]['base_stat']
  document.querySelector('#des').innerHTML = 'Special def: ' + data['stats'][4]['base_stat']
  document.querySelector('#vel').innerHTML = 'speed: ' + data['stats'][5]['base_stat']
  document.querySelector('.nome').innerHTML = data['order'] +"-"+ data['name']

 data['types'].forEach((e,indice) => {
  console.log(e.type.name[0])
 if(indice==0){
  document.querySelector('.modal').style.border="5px solid " + bordinha(e.type.name) 
 }
 });
  
}
// FIM

// evento da barra de pesquisa
form.addEventListener('submit', function (event) {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
  searchPokemon = parseInt(input.value)
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



}

function fechar() {
  let modal_info = document.querySelector(".modal")

  modal_info.style.display = "none"

  let resto = document.querySelector(".buttons")

  resto.style.display = "flex"
  let img = document.querySelector(".pokemon__image")

  img.style.display = "block"

}

const bordinha = (corzinha) => {
  switch (corzinha) {
    case 'fire': return ("#fc0808")
    case 'water': return ("#4aa7e0")
    case 'poison': return ("#6b32a8")
    case 'grass': return ("#4ab324")
    case 'bug': return ("#a2c920")
    case 'ground': return ("#734227")

    default: 
    return ("#fff")
  }
}



