import { Character } from 'core/characters/character';
import { StandardCharacterPackage } from 'core/characters/standard';
import { GameCharacterExtensions } from 'core/game/game_props';

export type CharacterPackages = {
  [K in GameCharacterExtensions]: Character[];
};
export type CharacterPackage<Extension extends GameCharacterExtensions> = {
  [K in Extension]: Character[];
};
export type CharacterPackageLoader = (
  index: number,
) => CharacterPackage<GameCharacterExtensions>;

const allCharacterLoaders: CharacterPackageLoader[] = [
  StandardCharacterPackage,
];

export class CharacterLoader {
  private static instance: CharacterLoader;
  private characters: CharacterPackages = {} as any;

  private constructor() {
    this.loadCharacters();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new CharacterLoader();
    }

    return this.instance;
  }

  private loadCharacters() {
    let index = 0;
    for (const loader of allCharacterLoaders) {
      const packages = loader(index);
      for (const [packageName, characters] of Object.entries(packages) as [GameCharacterExtensions, Character[]][]) {
        this.characters[packageName] = characters;

        index += characters.length;
      }
    }
  }

  public getAllCharacters() {
    return Object.values(this.characters).reduce<Character[]>(
      (addedCards, characters) => addedCards.concat(characters),
      [],
    );
  }

  public getPackages(...extensions: GameCharacterExtensions[]): Character[] {
    return extensions.reduce<Character[]>(
      (addedCards, extension) => addedCards.concat(this.characters[extension]),
      [],
    );
  }
}
