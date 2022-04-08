interface Species {
  name: string;
}
interface Sprites {
  front_shiny: string;
}
export interface Pokemon {
  species: Species;
  sprites: Sprites;
}
