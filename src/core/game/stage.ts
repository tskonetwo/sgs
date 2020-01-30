import { GameEventIdentifiers } from 'core/event/event';

export const enum PlayerStageListEnum {
  BeginPrepareStageStart,
  PrepareStageStart,
  EndPrepareStageStart,
  BeginPrepareStage,
  PrepareStage,
  EndPrepareStage,
  BeginPrepareStageEnd,
  PrepareStageEnd,
  EndPrepareStageEnd,

  BeginJudgeStageStart,
  JudgeStageStart,
  EndJudgeStageStart,
  BeginJudgeStage,
  JudgeStage,
  EndJudgeStage,
  BeginJudgeStageEnd,
  JudgeStageEnd,
  EndJudgeStageEnd,

  BeginDrawCardStageStart,
  DrawCardStageStart,
  EndDrawCardStageStart,
  BeginDrawCardStage,
  DrawCardStage,
  EndDrawCardStage,
  BeginDrawCardStageEnd,
  DrawCardStageEnd,
  EndDrawCardStageEnd,

  BeginPlayCardStageStart,
  PlayCardStageStart,
  EndPlayCardStageStart,
  BeginPlayCardStage,
  PlayCardStage,
  EndPlayCardStage,
  BeginPlayCardStageEnd,
  PlayCardStageEnd,
  EndPlayCardStageEnd,

  BeginDropCardStageStart,
  DropCardStageStart,
  EndDropCardStageStart,
  BeginDropCardStage,
  DropCardStage,
  EndDropCardStage,
  BeginDropCardStageEnd,
  DropCardStageEnd,
  EndDropCardStageEnd,

  BeginFinishStageStart,
  FinishStageStart,
  EndFinishStageStart,
  BeginFinishStage,
  FinishStage,
  EndFinishStage,
  BeginFinishStageEnd,
  FinishStageEnd,
  EndFinishStageEnd,
}

export const enum StagePriority {
  Low,
  Medium,
  High,
}

export const enum PlayerStage {
  PrepareStage,
  JudgeStage,
  DrawCardStage,
  PlayCardStage,
  DropCardStage,
  FinishStage,
}

const playerStagesList: {
  [K in PlayerStage]: PlayerStageListEnum[];
} = {
  [PlayerStage.PrepareStage]: [
    PlayerStageListEnum.BeginPrepareStageStart,
    PlayerStageListEnum.PrepareStageStart,
    PlayerStageListEnum.EndPrepareStageStart,
    PlayerStageListEnum.BeginPrepareStage,
    PlayerStageListEnum.PrepareStage,
    PlayerStageListEnum.EndPrepareStage,
    PlayerStageListEnum.BeginDrawCardStageEnd,
    PlayerStageListEnum.DrawCardStageEnd,
    PlayerStageListEnum.EndDrawCardStageEnd,
  ],
  [PlayerStage.JudgeStage]: [
    PlayerStageListEnum.BeginJudgeStageStart,
    PlayerStageListEnum.JudgeStageStart,
    PlayerStageListEnum.EndJudgeStageStart,
    PlayerStageListEnum.BeginJudgeStage,
    PlayerStageListEnum.JudgeStage,
    PlayerStageListEnum.EndJudgeStage,
    PlayerStageListEnum.BeginDrawCardStageEnd,
    PlayerStageListEnum.DrawCardStageEnd,
    PlayerStageListEnum.EndDrawCardStageEnd,
  ],
  [PlayerStage.DrawCardStage]: [
    PlayerStageListEnum.BeginDrawCardStageStart,
    PlayerStageListEnum.DrawCardStageStart,
    PlayerStageListEnum.EndDrawCardStageStart,
    PlayerStageListEnum.BeginDrawCardStage,
    PlayerStageListEnum.DrawCardStage,
    PlayerStageListEnum.EndDrawCardStage,
    PlayerStageListEnum.BeginDrawCardStageEnd,
    PlayerStageListEnum.DrawCardStageEnd,
    PlayerStageListEnum.EndDrawCardStageEnd,
  ],
  [PlayerStage.PlayCardStage]: [
    PlayerStageListEnum.BeginPlayCardStageStart,
    PlayerStageListEnum.PlayCardStageStart,
    PlayerStageListEnum.EndPlayCardStageStart,
    PlayerStageListEnum.BeginPlayCardStage,
    PlayerStageListEnum.PlayCardStage,
    PlayerStageListEnum.EndPlayCardStage,
    PlayerStageListEnum.BeginPlayCardStageEnd,
    PlayerStageListEnum.PlayCardStageEnd,
    PlayerStageListEnum.EndPlayCardStageEnd,
  ],
  [PlayerStage.DropCardStage]: [
    PlayerStageListEnum.BeginDropCardStageStart,
    PlayerStageListEnum.DropCardStageStart,
    PlayerStageListEnum.EndDropCardStageStart,
    PlayerStageListEnum.BeginDropCardStage,
    PlayerStageListEnum.DropCardStage,
    PlayerStageListEnum.EndDropCardStage,
    PlayerStageListEnum.BeginDropCardStageEnd,
    PlayerStageListEnum.DropCardStageEnd,
    PlayerStageListEnum.EndDropCardStageEnd,
  ],
  [PlayerStage.FinishStage]: [
    PlayerStageListEnum.BeginFinishStageStart,
    PlayerStageListEnum.FinishStageStart,
    PlayerStageListEnum.EndFinishStageStart,
    PlayerStageListEnum.BeginFinishStage,
    PlayerStageListEnum.FinishStage,
    PlayerStageListEnum.EndFinishStage,
    PlayerStageListEnum.BeginFinishStageEnd,
    PlayerStageListEnum.FinishStageEnd,
    PlayerStageListEnum.EndFinishStageEnd,
  ],
};

const gameEventStageList: {
  [K in GameEventIdentifiers]?: GameEventStage[];
} = {
  [GameEventIdentifiers.CardUseEvent]: [
    CardUseStage.BeforeCardUseEffect,
    CardUseStage.CardUsed,
    CardUseStage.AfterCardUseEffect,
  ],
  [GameEventIdentifiers.CardEffectEvent]: [
    CardUseStage.BeforeCardUseEffect,
    CardUseStage.CardUsed,
    CardUseStage.AfterCardUseEffect,
  ],
  [GameEventIdentifiers.CardResponseEvent]: [
    CardResponseStage.BeforeCardResponseEffect,
    CardResponseStage.CardResponsed,
    CardResponseStage.AfterCardResponseEffect,
  ],
  [GameEventIdentifiers.CardDropEvent]: [
    CardDropStage.BeforeCardDropEffect,
    CardDropStage.CardDropped,
    CardDropStage.AfterCardDropEffect,
  ],
  [GameEventIdentifiers.DamageEvent]: [
    DamageEffectStage.BeforeDamageEffect,
    DamageEffectStage.DamageEffect,
    DamageEffectStage.AfterDamageEffect,
  ],
  [GameEventIdentifiers.JudgeEvent]: [
    JudgeEffectStage.BeforeJudgeEffectStage,
    JudgeEffectStage.JudgeEffect,
    JudgeEffectStage.AfterJudgeEffectStage,
  ],
  [GameEventIdentifiers.PlayerDyingEvent]: [
    PlayerDyingStage.BeforePlayerDying,
    PlayerDyingStage.PlayerDying,
    PlayerDyingStage.AfterPlayerDying,
  ],
  [GameEventIdentifiers.PlayerDiedEvent]: [
    PlayerDiedStage.BeforePlayerDied,
    PlayerDiedStage.PlayerDied,
    PlayerDiedStage.AfterPlayerDied,
  ],
  [GameEventIdentifiers.SkillUseEvent]: [
    SkillEffectStage.BeforeSkillEffect,
    SkillEffectStage.SkillEffect,
    SkillEffectStage.AfterSkillEffect,
  ],
  [GameEventIdentifiers.RecoverEvent]: [
    RecoverEffectStage.BeforeRecoverEffect,
    RecoverEffectStage.RecoverEffect,
    RecoverEffectStage.AfterRecoverEffect,
  ],
  [GameEventIdentifiers.DrawCardEvent]: [
    DrawCardStage.BeforeDrawCardEffect,
    DrawCardStage.CardDrawed,
    DrawCardStage.AfterDrawCardEffect,
  ],
  [GameEventIdentifiers.ObtainCardEvent]: [
    ObtainCardStage.BeforeObtainCardEffect,
    ObtainCardStage.CardObtained,
    ObtainCardStage.AfterObtainCardEffect,
  ],
  [GameEventIdentifiers.PinDianEvent]: [
    PinDianStage.BeforePinDianEffect,
    PinDianStage.PinDianEffect,
    PinDianStage.AfterPinDianEffect,
  ],
};

export const enum CardUseStage {
  BeforeCardUseEffect,
  CardUsed,
  AfterCardUseEffect,
}

export const enum CardEffectStage {
  BeforeCardEffect,
  CardEffect,
  AfterCardEffect,
}

export const enum CardResponseStage {
  BeforeCardResponseEffect,
  CardResponsed,
  AfterCardResponseEffect,
}

export const enum DrawCardStage {
  BeforeDrawCardEffect,
  CardDrawed,
  AfterDrawCardEffect,
}

export const enum ObtainCardStage {
  BeforeObtainCardEffect,
  CardObtained,
  AfterObtainCardEffect,
}

export const enum CardDropStage {
  BeforeCardDropEffect,
  CardDropped,
  AfterCardDropEffect,
}

export const enum DamageEffectStage {
  BeforeDamageEffect,
  DamageEffect,
  AfterDamageEffect,
}

export const enum DamagedEffectStage {
  BeforeDamagedEffect,
  DamagedEffect,
  AfterDamagedEffect,
}

export const enum JudgeEffectStage {
  BeforeJudgeEffectStage,
  JudgeEffect,
  AfterJudgeEffectStage,
}

export const enum PinDianStage {
  BeforePinDianEffect,
  PinDianEffect,
  AfterPinDianEffect,
}

export const enum PlayerDyingStage {
  BeforePlayerDying,
  PlayerDying,
  AfterPlayerDying,
}
export const enum PlayerDiedStage {
  BeforePlayerDied,
  PlayerDied,
  AfterPlayerDied,
}

export const enum SkillEffectStage {
  BeforeSkillEffect,
  SkillEffect,
  AfterSkillEffect,
}

export const enum RecoverEffectStage {
  BeforeRecoverEffect,
  RecoverEffect,
  AfterRecoverEffect,
}

export type GameEventStage =
  | CardEffectStage
  | CardUseStage
  | CardDropStage
  | CardResponseStage
  | DrawCardStage
  | ObtainCardStage
  | JudgeEffectStage
  | RecoverEffectStage
  | PinDianStage
  | PlayerDyingStage
  | PlayerDiedStage
  | DamageEffectStage
  | DamagedEffectStage
  | SkillEffectStage;

export type AllStage = PlayerStageListEnum | GameEventStage;

export class StageProcessor {
  private currentPlayerStageInSpecific: PlayerStageListEnum | undefined;
  private currentPlayerStage: PlayerStage | undefined;
  private stagePointer: number;
  private readonly playerSpecificStagesList: PlayerStageListEnum[];

  private gameEventStageList: GameEventStage[] | undefined;
  private currentGameEventStage: GameEventStage | undefined;
  private processingGameEvent = false;

  constructor() {
    for (let i = 0; i < PlayerStageListEnum.EndFinishStageEnd; i++) {
      this.playerSpecificStagesList.push(i);
    }

    this.stagePointer = -1;
    this.currentPlayerStageInSpecific = undefined;
    this.currentPlayerStage = undefined;
  }

  public insertGameEvent(identifier: GameEventIdentifiers) {
    if (!this.gameEventStageList) {
      this.involve(identifier);
    } else {
      const stageList = gameEventStageList[identifier];
      if (stageList === undefined) {
        throw new Error(`Unable to get game event of ${identifier}`);
      }

      this.gameEventStageList = [...stageList, ...this.gameEventStageList];
      this.currentGameEventStage = this.gameEventStageList.shift();
    }
  }

  public involve(identifier: GameEventIdentifiers) {
    const stageList = gameEventStageList[identifier];
    if (stageList === undefined) {
      throw new Error(`Unable to get game event of ${identifier}`);
    }

    this.gameEventStageList = stageList.slice();
    this.currentGameEventStage = this.gameEventStageList.shift();
    this.processingGameEvent = true;

    return this.currentGameEventStage;
  }

  public nextInstantEvent(): GameEventStage | undefined {
    if (!this.gameEventStageList || !this.processingGameEvent) {
      return;
    }

    this.currentGameEventStage = this.gameEventStageList.shift();
    if (this.currentGameEventStage === undefined) {
      this.processingGameEvent = false;
      return;
    }

    return this.currentGameEventStage;
  }

  public nextStage(): PlayerStage | undefined {
    if (++this.stagePointer >= this.playerSpecificStagesList.length) {
      return;
    }

    this.currentPlayerStageInSpecific = this.playerSpecificStagesList[
      this.stagePointer
    ];
    this.currentPlayerStage = this.getInsidePlayerStage(
      this.currentPlayerStageInSpecific,
    );

    return this.currentPlayerStage;
  }

  public turnToNextPlayer() {
    this.stagePointer = -1;
    return this.nextStage();
  }

  public get CurrentGameEventStage() {
    return this.currentGameEventStage;
  }

  public get CurrentPlayerStageInSpecific() {
    return this.currentPlayerStageInSpecific;
  }

  public get CurrentPlayerStage() {
    return this.currentPlayerStage;
  }

  public isCurrentGameEventDone() {
    return !this.processingGameEvent;
  }

  public isProcessingGameEvent() {
    return this.processingGameEvent;
  }

  public createPlayerStage(stage?: PlayerStage) {
    if (stage !== undefined) {
      return playerStagesList[stage].slice();
    } else {
      const stages = [
        PlayerStage.PrepareStage,
        PlayerStage.JudgeStage,
        PlayerStage.DrawCardStage,
        PlayerStage.PlayCardStage,
        PlayerStage.DropCardStage,
        PlayerStage.FinishStage,
      ];

      let createdStages: PlayerStageListEnum[] = [];
      for (const stage of stages) {
        createdStages = [...createdStages, ...playerStagesList[stage].slice()];
      }

      return createdStages;
    }
  }

  public getInsidePlayerStage(specificStage: PlayerStageListEnum): PlayerStage {
    for (const [stage, stageList] of (Object.entries(
      playerStagesList,
    ) as unknown) as [PlayerStage, PlayerStageListEnum[]][]) {
      if (stageList.includes(specificStage)) {
        return stage;
      }
    }

    throw new Error(`Unknown player stage: ${specificStage}`);
  }
}