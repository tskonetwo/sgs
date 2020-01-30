import { BasicCard } from 'core/cards/basic_card';
import { DamageType, GameCardExtensions } from 'core/game/game_props';
import { SkillLoader } from 'core/game/package_loader/loader.skills';
import { SlashSkill } from 'core/skills/characters/standard/slash';
import { CardId, CardSuit } from '../libs/card_props';

export class Slash extends BasicCard {
  constructor(id: CardId, cardNumber: number, suit: CardSuit) {
    super(
      id,
      cardNumber,
      suit,
      'slash',
      'slash_description',
      GameCardExtensions.Standard,
      SkillLoader.getInstance().getSkillByName('slash'),
    );
  }

  public get Skill() {
    return this.skill as SlashSkill;
  }
}

export class ThunderSlash extends Slash {
  constructor(id: CardId, cardNumber: number, suit: CardSuit) {
    super(id, cardNumber, suit);

    this.skill = SkillLoader.getInstance().getSkillByName('thunder_slash');
  }
}
export class FireSlash extends Slash {
  constructor(id: CardId, cardNumber: number, suit: CardSuit) {
    super(id, cardNumber, suit);

    this.skill = SkillLoader.getInstance().getSkillByName('fire_slash');
  }
}