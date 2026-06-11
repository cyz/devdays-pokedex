export interface PokemonType {
  slot: number;
  type: { name: string; url: string };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export interface PokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number | null;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: {
    front_default: string | null;
    front_shiny: string | null;
    back_default: string | null;
    other: {
      'official-artwork': {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  results: Array<{ name: string; url: string }>;
}

export interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }>;
  evolution_chain: { url: string };
  genera: Array<{
    genus: string;
    language: { name: string };
  }>;
  capture_rate: number;
  base_happiness: number;
  growth_rate: { name: string };
  habitat: { name: string } | null;
  is_legendary: boolean;
  is_mythical: boolean;
  color: { name: string };
}

export interface EvolutionDetail {
  min_level: number | null;
  trigger: { name: string };
  item: { name: string } | null;
  held_item: { name: string } | null;
  min_happiness: number | null;
  time_of_day: string;
  location: { name: string } | null;
  known_move: { name: string } | null;
}

export interface EvolutionNode {
  species: { name: string; url: string };
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionNode;
}

export interface LocationEncounter {
  location_area: { name: string; url: string };
  version_details: Array<{
    version: { name: string };
    max_chance: number;
    encounter_details: Array<{
      chance: number;
      min_level: number;
      max_level: number;
      method: { name: string };
    }>;
  }>;
}
