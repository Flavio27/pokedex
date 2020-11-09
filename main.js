//FILTRANDO 152 POKEMONS 1 GERAÇÃO  https://pokeapi.co/api/v2/pokemon/?limit=152
//https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png


const POKE_API = "https://pokeapi.co/api/v2/pokemon";
const HTTP_STATUS_OK = 200;
const POKE_PICTURE_NEW = "https://assets.pokemon.com/assets/cms2/img/pokedex/full"


async function buscar() {

  let pokeName = document.querySelector('#nomePoke').value.toLowerCase();
  let showPoke = document.querySelector('#fotoPoke');
  let pokePicture = document.querySelector('#PokePicture')
  let alertSearch = document.querySelector('#alertSearch')
  let pokeIcon = document.querySelector('#elementIcon')
  let adv = document.querySelector('#advantage')
  let des = document.querySelector('#disadvantage')
  let pokemonName = document.querySelector('#pokemonName')
  let typeExb = document.querySelector('#typePoke')
  let abilities = document.querySelector('#abilities')
  let evolutions = document.querySelector('#evolution')
  let pokemonStats = document.querySelector('#statesPoke')
  let desvArray2 = []
  let advArray2 = []
  let elementNumber = -1;
  let elementsPoke = []


  //Validation pokemon name
  if (pokeName.length < 1) {
    alertSearch.innerHTML = `Put a Pokémon name!</br>`
    pokePicture.src = './img/noPoke.png'
    PokePicture.alt = ''
    PokePicture.style.backgroundImage = ''
    pokeIcon.innerHTML = ''
    adv.innerHTML = ''
    des.innerHTML = ''
    pokemonName.innerHTML = ''
    typeExb.innerHTML = ''
    abilities.innerHTML = ''
    info.style.display = "none";
    document.querySelector('#first').innerHTML = ``
    document.querySelector('#second').innerHTML = ``
    document.querySelector('#third').innerHTML = ``
    document.querySelector('#typePokemon').innerHTML = ``
    document.querySelector('#statesPoke').innerHTML = ``
    backInfo()

  } else {

    const pokeSearch = await fetch(`${POKE_API}/${pokeName}`)
    if (pokeSearch.status == HTTP_STATUS_OK) {
      let resultPoke = await pokeSearch.json();

      alertSearch.innerHTML = ``
      pokemonStats.innerHTML = `<span style="margin-left: 50px">Base stats</span>`
      //pokemon stats bar
      for (let i = 0; i < resultPoke.stats.length; i++) {
        if (resultPoke.stats[i].base_stat <= 100) {
          document.querySelector('#statesPoke').innerHTML +=
            `
        <div>
        <span class="statName">${resultPoke.stats[i].stat.name}</span>
        <div class="statsColor">
        <div class="statsColor2" style="background-color: rgba(39, 112, 247, 0.534); width:${resultPoke.stats[i].base_stat}%; color: blue">
        <span class="numberStat">${resultPoke.stats[i].base_stat}</span>
        <div>
        </div>
        <div>
        <br>
        `
        } else {
          document.querySelector('#statesPoke').innerHTML +=
            `
        <div>
        <span class="statName">${resultPoke.stats[i].stat.name}</span>
        <div class="statsColor">
        <div class="statsColor2" style="background-color: rgba(253, 71, 71, 0.534); width:100%; color: red">
        <span class="numberStat">${resultPoke.stats[i].base_stat}</span>
        <div>
        </div>
        <div>
        <br>
        `
        }

      }


      // If pokemon have a special evolution. Mega, Alola, etc...
      const pokeSpecies = await fetch(`${POKE_API}-species/${pokeName}`)
      if (pokeSpecies.status == HTTP_STATUS_OK) {
        let speciesResult = await pokeSpecies.json();
        if (speciesResult.evolution_chain.url != null) {

        }
        let URL_EVOLUTION = speciesResult.evolution_chain.url

        if (speciesResult.varieties.length > 1) {
          let searchmega
          let resultmega
          evoSpecial.style.display = 'block'
          document.querySelector('#mega').innerHTML = ''
          for (const number in speciesResult.varieties) {
            if (number != 0) {
              searchmega = await fetch(`${POKE_API}/${speciesResult.varieties[number].pokemon.name}`)
              resultmega = await searchmega.json();
              if (resultmega.sprites.front_default == null) {

                document.querySelector('#mega').innerHTML +=
                  `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="./img/noPoke.png" alt="">
                      <div class="PokeNameEvo">${resultmega.name}</div>
                      </div>
                     `
              } else {
                document.querySelector('#mega').innerHTML +=
                  `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="${resultmega.sprites.front_default}" alt="">
                      <div class="PokeNameEvo">${resultmega.name}</div>
                      </div>
                     `
              }
            }
          }
        } else {
          evoSpecial.style.display = 'none'
        }
        typePokemon(speciesResult, speciesResult.id)
        textPokemon(speciesResult)
        pokeGender(speciesResult)
        pokeGeneration(speciesResult)


        const pokeEvolution = await fetch(URL_EVOLUTION)
        if (pokeEvolution.status == HTTP_STATUS_OK) {
          let evolutions = await pokeEvolution.json();
          document.querySelector('#first').innerHTML = ``
          document.querySelector('#second').innerHTML = ``
          document.querySelector('#third').innerHTML = ``

          let firstPoke
          let picFirstPoke
          let pokeEvolution1
          let picEvolution1
          let pokeEvolution2
          let picEvolution2
          let ramification1
          let picramification1

          if (evolutions.chain.evolves_to.length > 0) { //if exist evolution
            arrowFirst.style.display = 'block';
            firstPoke = await fetch(`${POKE_API}/${evolutions.chain.species.name}`)
            picFirstPoke = await firstPoke.json()

            console.log('primeira: ' + evolutions.chain.species.name) //first 
            document.querySelector('#first').innerHTML =
              `
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picFirstPoke.id}.png" alt="">
            <div class="PokeNameEvo">${evolutions.chain.species.name}</div> 
            `

            console.log(picFirstPoke)

            if (evolutions.chain.evolves_to.length > 1) { // if exist more than one evolution

              let evolveNumber1 = evolutions.chain.evolves_to.length

              console.log('Segunda Evoluções: ')
              for (let i = 0; i < evolveNumber1; i++) {

                console.log(evolutions.chain.evolves_to[i].species.name)
                console.log(evolutions.chain.evolves_to[i])

                if (evolutions.chain.evolves_to[i].evolves_to.length > 0) {
                  var ramification = true
                  console.log(evolutions.chain.evolves_to[i].evolves_to[0].species.name)

                } else {
                  var ramification = false
                }

                if (i >= evolveNumber1 - 1) {

                  pokeEvolution1 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[i].species.name}`)
                  picEvolution1 = await pokeEvolution1.json()

                  if (ramification == true) {

                    ramification1 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[i].evolves_to[0].species.name}`)
                    picramification1 = await ramification1.json()

                    document.querySelector('#second').innerHTML +=
                      `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution1.id}.png" alt="">
                      <div class="PokeNameEvo">${evolutions.chain.evolves_to[i].species.name}</div>
                      <br>
                      <p class="arrowNew">↓</p>
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picramification1.id}.png" alt="">
                      <div class="PokeNameEvo">${picramification1.name}</div>
                      </div>
                     `
                  } else {
                    document.querySelector('#second').innerHTML +=
                      `
                    <div class="col-lg-2 pokeSpaceLeft">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution1.id}.png" alt="">
                    <div class="PokeNameEvo">${evolutions.chain.evolves_to[i].species.name}</div>
                    </div>
                   `
                  }

                } else {

                  pokeEvolution1 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[i].species.name}`)
                  picEvolution1 = await pokeEvolution1.json()

                  if (ramification == true) {

                    ramification1 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[i].evolves_to[0].species.name}`)
                    picramification1 = await ramification1.json()

                    document.querySelector('#second').innerHTML +=
                      `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution1.id}.png" alt="">
                      <div class="PokeNameEvo">${evolutions.chain.evolves_to[i].species.name}</div>
                      <br>
                      <p class="arrowNew">↓</p>
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picramification1.id}.png" alt="">
                      <div class="PokeNameEvo">${picramification1.name}</div>
                      </div>
                      <div class="col-lg-1 pokeSpaceLeft"><p class="or">OR</p></div>
                     `
                  } else {
                    document.querySelector('#second').innerHTML +=
                      `
                    <div class="col-lg-2 pokeSpaceLeft">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution1.id}.png" alt="">
                    <div class="PokeNameEvo">${evolutions.chain.evolves_to[i].species.name}</div>
                    </div>
                   `
                  }
                }
              }

            } else {
              pokeEvolution1 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[0].species.name}`)
              picEvolution1 = await pokeEvolution1.json()

              document.querySelector('#second').innerHTML +=
                `<div class="col-lg-2 pokeSpaceLeft">
                  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution1.id}.png" alt="">
                  <div class="PokeNameEvo">${evolutions.chain.evolves_to[0].species.name}</div>
                  </div>
                  `

              console.log('Segunda: ' + evolutions.chain.evolves_to[0].species.name)  //second
            }

            if (evolutions.chain.evolves_to[0].evolves_to.length > 0) { //if exist third evolution
              arrowSecond.style.display = 'block';
              if (ramification == true) {
                thirdEvo.style.display = "none";
                arrowSecond.style.display = "none";
              } else {
                thirdEvo.style.display = "block";
                arrowSecond.style.display = "block";
              }

              if (evolutions.chain.evolves_to[0].evolves_to.length > 1) { //if exist more than one evolution

                let evolveNumber2 = evolutions.chain.evolves_to[0].evolves_to.length

                console.log('Terceira Evoluções: ')
                for (let i = 0; i < evolveNumber2; i++) {

                  // console.log(evolutions.chain.evolves_to[0].evolves_to[i].species.name)

                  pokeEvolution2 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[0].evolves_to[i].species.name}`)
                  picEvolution2 = await pokeEvolution2.json()

                  console.log(picEvolution2.name)

                  if (i >= evolveNumber2 - 1) {

                    document.querySelector('#third').innerHTML +=
                      `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution2.id}.png" alt="">
                      <div class="PokeNameEvo">${picEvolution2.name}</div>
                      </div> 
                     `


                  } else {

                    pokeEvolution2 = await fetch(`${POKE_API}/${picEvolution2.name}`)
                    picEvolution2 = await pokeEvolution2.json()

                    document.querySelector('#third').innerHTML +=
                      `
                      <div class="col-lg-2 pokeSpaceLeft">
                      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution2.id}.png" alt="">
                      <div class="PokeNameEvo">${picEvolution2.name}</div>
                      </div>
                     `

                  }

                }

              } else {

                pokeEvolution2 = await fetch(`${POKE_API}/${evolutions.chain.evolves_to[0].evolves_to[0].species.name}`)
                picEvolution2 = await pokeEvolution2.json()

                document.querySelector('#third').innerHTML =
                  `
                <div class="col-lg-2 pokeSpaceLeft">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${picEvolution2.id}.png" alt="">
                <div class="PokeNameEvo">${evolutions.chain.evolves_to[0].evolves_to[0].species.name}</div>
                </div>
               `
                console.log(speciesResult)
                console.log('Terceira: ' + evolutions.chain.evolves_to[0].evolves_to[0].species.name) //third
              }

            } else {
              thirdEvo.style.display = "none";
              arrowSecond.style.display = "none";
            }

          } else {
            arrowFirst.style.display = 'none';
            arrowSecond.style.display = 'none';
            evolutions.innerHTML = ''
            document.querySelector('#first').innerHTML = `<p>This pokemon dont have evolution chain!</p>`

          }

        }

      } else {

      }



      moreInfo.style.display = "block";
      info.style.display = "block";
      backInfo()
      AlertPokedex()
      pokeCharact(resultPoke)
      pokeIcon.innerHTML = ''
      adv.innerHTML = ''
      des.innerHTML = ''
      pokemonName.innerHTML = ''
      typeExb.innerHTML = ''
      abilities.innerHTML = ''

      // Poke IMG
      let imgPoke = await resultPoke.sprites.front_default
      let imgPokeBack = await resultPoke.sprites.back_default
      // Poke Name
      let namePoke = resultPoke.name
      // Poke Element
      let elementPoke = []
      // Poke Abilities
      let abilitiesPoke = []

      //Advantage and Disadvantage
      let advantage = []
      let disadvantage = []
      //Change SRC IMG with PokeName
      let searchNewPic
      let resultNewPic
      // newPokemonPic(resultPoke.id,searchNewPic,resultNewPic)
      if (resultPoke.id < 10) {
        pokePicture.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/00${resultPoke.id}.png`
      } else if (resultPoke.id < 100 && resultPoke.id >= 10) {
        pokePicture.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/0${resultPoke.id}.png`
      } else if (resultPoke.id >= 100 && resultPoke.id <= 800) {
        pokePicture.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${resultPoke.id}.png`
      } else if (resultPoke.id > 800) {
        pokePicture.src = imgPoke
      }


      //Create element icon front
      var icon = document.createElement('img');
      icon.setAttribute("class", "element--icon");

      // Catch elements of Poke
      const elementTypes = resultPoke.types.map((types) => {
        return types.type
      });

      // Catch Poke abilities
      const pokemonAbilities = resultPoke.abilities.map((info) => {
        return info.ability
      });
      let comparision = typePoke => {

        let advArray = []
        let compArray = []
        let desvArray = []
        //



        let elementalVantage = (typePoke, advantage) => {

          advArray = advantage
          return adv.innerHTML += `<span>${typePoke}: ${advantage}.</span><br>`;


        }
        let elementalDisadvantage = (typePoke, disadvantage) => {
          desvArray = disadvantage
          return des.innerHTML += `<span>${typePoke}: ${disadvantage}.</span><br>`;
        }

        switch (typePoke) {
          case 'grass':

            advantage = ['Water', 'Ground', 'Rock']
            disadvantage = ['Fire', 'Ice', 'Poison', 'Flying', 'Bug']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)

            break;

          case 'poison':

            advantage = ['Grass', 'Fairy']
            disadvantage = ['Ground', 'Psychic']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'rock':

            advantage = ['Fire', 'Ice', 'Flying', 'Bug']
            disadvantage = ['Water', 'Grass', 'Fighting', 'Ground', 'Steel']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'ice':

            advantage = ['Grass', 'Ground', 'Flying', 'Dragon']
            disadvantage = ['Fire', 'Fighting', 'Rock', 'Steel']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'dragon':

            advantage = ['Dragon']
            disadvantage = ['Ice', 'Dragon', 'Fairy']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'dark':

            advantage = ['Psychic', 'Ghost']
            disadvantage = ['Fighting', 'Bug', 'Fairy']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'psychic':

            advantage = ['Fighting', 'Poison']
            disadvantage = ['Bug', 'Ghost', 'Dark']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'bug':

            advantage = ['Grass', 'Psychic', 'Dark']
            disadvantage = ['Fire', 'Flying', 'Rock']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'flying':

            advantage = ['Grass', 'Fighting', 'Bug']
            disadvantage = ['Electric', 'Ice', 'Rock']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'steel':

            advantage = ['Ice', 'Rock', 'Fairy']
            disadvantage = ['Fire', 'Fighting', 'Ground']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'fire':

            advantage = ['Grass', 'Ice', 'Bug', 'Steel']
            disadvantage = ['Water', 'Ground', 'Rock']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'fighting':

            advantage = ['Normal', 'Ice', 'Rock', 'Dark', 'Steel']
            disadvantage = ['Flying', 'Psychic', 'Fairy']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'ground':

            advantage = ['Fire', 'Electric', 'Poison', 'Rock', 'Steel']
            disadvantage = ['Flying', 'Psychic', 'Fairy']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'ghost':

            advantage = ['Psychic', 'Ghost']
            disadvantage = ['Ghost', 'Dark']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'water':

            advantage = ['Fire', 'Ground', 'Rock']
            disadvantage = ['Electric', 'Grass']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;


          case 'fairy':

            advantage = ['Fight', 'Dragon', 'Dark']
            disadvantage = ['Poison', 'Steel']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'electric':

            advantage = ['Water', 'Flying']
            disadvantage = ['Ground']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;

          case 'normal':

            advantage = ['none']
            disadvantage = ['Fighting']

            elementalVantage(typePoke, advantage)
            elementalDisadvantage(typePoke, disadvantage)
            break;
        }

        console.log(typePoke + ' vantagem a: ' + advArray)
        console.log(advArray)
        advArray2.splice(advArray2.length, 0, ...advArray);
        // advArray2 += advArray
        //console.log(advArray2)

        elementNumber += 1;
        console.log(elementNumber)
        elementsPoke[elementNumber] = desvArray
        console.log(typePoke + ' desvantagem a: ' + desvArray)
        console.log(desvArray)
        desvArray2.splice(desvArray2.length, 0, ...desvArray);

        // desvArray2 += desvArray
        //console.log(desvArray2)

        compArray = advArray // for one element, if more than one use +=
        desvArray = desvArray // for one element, if more than one use +=
        if (resultPoke.types.length < 2) {
          document.querySelector('#elemAdv').innerHTML = `<br><p class="elemental">Advantage:<br> ${compArray}</p>`
          document.querySelector('#elemDis').innerHTML = `<p class="elemental">Disadvantage:<br> ${desvArray}</p>`
          console.log(typePoke + ': Vantagem:' + compArray)
          console.log(typePoke + ': Desvantagem:' + desvArray)
        } else {
          document.querySelector('#elemAdv').innerHTML = ''
          document.querySelector('#elemDis').innerHTML = ''

        }
      }

      for (let info of pokemonAbilities) {
        pokemonAbilities > 1 ? abilities.innerHTML += `${info.name}` : abilities.innerHTML += `${info.name}. `


      }
      for (let element of elementTypes) {
        elementTypes > 1 ? elementPoke += `${element.name} ` : elementPoke += `${element.name}. `
        typeExb.innerHTML = `Type: `
        pokeIcon.innerHTML += `${element.name}`
        icon.src = `./img/poke_element/${element.name}.png`
        pokeIcon.appendChild(icon)
        PokePicture.style.backgroundImage = `url('./img/background/Type_Background_${elementTypes[0].name}.png')`;
        comparision(element.name)
        pokemonName.innerHTML = `Name: ${resultPoke.name}`
        pokePicture.alt = resultPoke.name
        // pokePicture.src = resultPoke.sprites.back_default
        console.log(resultPoke.sprites.back_default)

      }
      if (resultPoke.types.length > 1) {
        console.log(advArray2)
        console.log(desvArray2)
        console.log('---------------------------------')
        console.log(elementsPoke[0])
        console.log(elementsPoke[1])
        console.log('---------------------------------')

        let newAdvantage = advArray2.filter(function (here, i) {
          return advArray2.indexOf(here) !== i;
        });
        console.log(newAdvantage)

        let newDesadvantage = desvArray2.filter(function (here, i) {
          return desvArray2.indexOf(here) !== i;
        });
        console.log(newDesadvantage)
      }

    } else {
      alertSearch.innerHTML = `This Pokémon does not exist!<br>`
      pokePicture.src = './img/noPoke.png'
      PokePicture.style.backgroundImage = ''
      pokeIcon.innerHTML = ''
      adv.innerHTML = ''
      des.innerHTML = ''
      pokemonName.innerHTML = ''
      typeExb.innerHTML = ''
      abilities.innerHTML = ''
      info.style.display = "none";
      moreInfo.style.display = "none";
      document.querySelector('#first').innerHTML = ``
      document.querySelector('#second').innerHTML = ``
      document.querySelector('#third').innerHTML = ``
      document.querySelector('#typePokemon').innerHTML = ``
      document.querySelector('#statesPoke').innerHTML = ``
      backInfo()

    }
  }
}

async function AlertPokedex() {
  document.getElementById("main").style.backgroundImage = "url('./img/pokedexAlert.gif')";

  setTimeout(function () {
    document.getElementById("main").style.backgroundImage = "url('./img/pokedexinfo.png')";
  }, 3000);
}

async function Loading() {
  document.getElementById("loading").innerHTML = `<img id="loading" src="./img/loadingGif.gif" alt="">`
  setTimeout(function () {
    document.getElementById("loading").innerHTML = ``
    loading.style.display = "none";
  }, 1000);
}

async function nextInfo() {
  screen_one.style.display = "none";
  screen_two.style.display = "block";
  next.style.display = "none";
  back.style.display = "block";
}

async function backInfo() {
  screen_one.style.display = "block";
  screen_two.style.display = "none";
  back.style.display = "none";
  next.style.display = "block";
  screen_two.display = "none"
}

async function pokeCharact(poke) {

  let pokeHeight = poke.height.toFixed(1) / 10
  let pokeWeight = poke.weight.toFixed(1) / 10


  document.querySelector('#height').innerHTML = `<span>- Height: ${pokeHeight}M.</span>`
  document.querySelector('#weight').innerHTML = `<span>- Weight: ${pokeWeight}KG.</span>`
  console.log(pokeHeight, pokeWeight)

}

async function typePokemon(pokemon, pokeID) {

  if (pokemon.is_legendary == true) {
    console.log('Legendary!')
    document.querySelector('#typePokemon').innerHTML = `<span class="typePokemonLegendary"> Legendary <img id="star" src="./img/star.png" alt=""></span>`
  } else if (pokemon.is_mythical == true) {
    console.log('Mythical!')
    document.querySelector('#typePokemon').innerHTML = `<span class="typePokemonLegendary">Mythical <img id="star" src="./img/star.png" alt=""></span>`
  } else {
    document.querySelector('#typePokemon').innerHTML = ``
  }

}

async function textPokemon(pokemon) {
  var first = 0
  for (var number in pokemon.flavor_text_entries) {
    if (pokemon.flavor_text_entries[number].language.url == 'https://pokeapi.co/api/v2/language/9/') {
      first += 1;
      if (first < 2) {
        console.log(pokemon.flavor_text_entries[number].flavor_text);
        if (pokemon.flavor_text_entries[number].flavor_text.length > 150) {
          document.querySelector('#textPoke').classList.add("smallerText");
        } else {
          document.querySelector('#textPoke').classList.remove("smallerText");
        }
        document.querySelector('#textPoke').innerHTML = pokemon.flavor_text_entries[number].flavor_text.replace('\f', '').toLowerCase()
      }
    }


  }
}


async function pokeGender(pokemonGender) {
  document.querySelector('#gender').innerHTML = ``

  if (pokemonGender.gender_rate == 1 || pokemonGender.gender_rate == 2 || pokemonGender.gender_rate == 4 || pokemonGender.gender_rate == 6) {
    document.querySelector('#gender').innerHTML = `<span>- Gender: Male & Female</span>`
  } else if (pokemonGender.gender_rate == 8) {
    document.querySelector('#gender').innerHTML = `<span>- Gender: Female</span>`
  } else if (pokemonGender.gender_rate == 0) {
    document.querySelector('#gender').innerHTML = `<span>- Gender: Male</span>`
  } else if (pokemonGender.gender_rate == -1) {
    document.querySelector('#gender').innerHTML = `<span>- Gender: Unknown</span>`
  }

  console.log('sexo: ' + pokemonGender.gender_rate)

}

async function pokeGeneration(pokemon) {
  console.log(pokemon.generation.name)
  console.log(pokemon.id)
  document.querySelector('#pokeGeneration').innerHTML = `
  <span class="generation">Pokemon created at: ${pokemon.generation.name}</span>
  <span class="pokeNumber">Pokémon number: ${pokemon.id}</span>
  `
}

async function changePic(url) {
  document.querySelector('#PokePicture').src.innerHTML = url;
}

async function newPokemonPic(id, search, result) {
  search = await fetch(POKE_PICTURE_NEW + '/00' + id + '.png', {
    Origin: '*',
    method: 'GET',
    headers: {
      'Content-type': 'img/png'
    }
  })
  console.log(search.status)
  result = await search.json()
  console.log(result)
}




function showEvo() {
  $('#editModal').modal('show')
}