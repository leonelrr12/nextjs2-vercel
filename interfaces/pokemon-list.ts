export interface PokemonListStruct {
  count:    number;
  next:     string;
  previous: string;
  results:  SmallResult[];
}

export interface SmallResult {
  name: string;
  url:  string;
  id: string;
  img: string;
}
