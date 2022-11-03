const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {



    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    pokemon.firstattack = pokeDetail.abilities[0].ability.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    const ataque = pokeDetail.abilities.map((typeataques) => typeataques.ability.name)
    const dados = pokeDetail.stats.map((dadospokemo) => (dadospokemo))

    pokemon.types = types;
    pokemon.type = type;
    pokemon.ataque = ataque;
    pokemon.dados = dados

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}