export interface Collection {
  count: number,
  next: string,
  previous: string,
  results: Pokemon[]
}

export interface Pokemon {
  name: string,
  url: string,
  id: number
}


export interface PokemonInfo {
  abilities: PokemonInfoAbilities[]
}

export interface PokemonInfoAbilities {
  ability: Ability
}

export interface Ability {
  name: string
}
