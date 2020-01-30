import { Card } from 'core/cards/card';
import { EventPicker, GameEventIdentifiers, WorkPlace } from 'core/event/event';
import { AllStage } from 'core/game/stage';
import { ServerSocket } from 'core/network/socket.server';
import { Player } from 'core/player/player';
import { ServerPlayer } from 'core/player/player.server';
import {
  PlayerCardsArea,
  PlayerId,
  PlayerInfo,
} from 'core/player/player_props';

import { EquipCard } from 'core/cards/equip_card';
import { CardId } from 'core/cards/libs/card_props';
import { Character } from 'core/characters/character';
import { Sanguosha } from 'core/game/engine';
import { GameInfo } from 'core/game/game_props';
import { CardLoader } from 'core/game/package_loader/loader.cards';
import { CharacterLoader } from 'core/game/package_loader/loader.characters';
import { RoomInfo } from 'core/shares/types/server_types';
import { TriggerSkill } from 'core/skills/skill';
import { TranslationPack } from 'core/translations/translation_json_tool';
import { GameProcessor } from './game_processor';
import { Room, RoomId } from './room';

export class ServerRoom extends Room<WorkPlace.Server> {
  protected currentPlayer: Player | undefined;

  private loadedCharacters: Character[] = [];
  private loadedCards: Card[] = [];

  private cards: CardId[] = [];
  private drawDile: CardId[] = [];
  private dropDile: CardId[] = [];
  private gameStarted: boolean = false;

  constructor(
    protected roomId: RoomId,
    protected gameInfo: GameInfo,
    protected socket: ServerSocket,
    protected gameProcessor: GameProcessor,
    protected players: Player[] = [],
  ) {
    super();
  }

  protected init() {
    this.loadedCharacters = CharacterLoader.getInstance().getPackages(
      ...this.gameInfo.characterExtensions,
    );
    this.loadedCards = CardLoader.getInstance().getPackages(
      ...this.gameInfo.cardExtensions,
    );
    this.drawDile = this.cards.slice();
    this.dropDile = [];

    this.socket.emit(this);
  }

  private shuffle() {
    for (let i = 0; i < this.drawDile.length - 1; i++) {
      const swapCardIndex =
        Math.floor(Math.random() * (this.drawCards.length - i)) + i;
      if (swapCardIndex !== i) {
        [this.drawDile[i], this.drawDile[swapCardIndex]] = [
          this.drawDile[swapCardIndex],
          this.drawDile[i],
        ];
      }
    }
  }

  // @@TODO: TBA here
  public gameStart() {
    this.gameStarted = true;
  }

  public createPlayer(playerInfo: PlayerInfo) {
    const { Id, Name, Position, CharacterId } = playerInfo;
    this.players.push(new ServerPlayer(Id, Name, Position, CharacterId));
  }

  public notify(
    type: GameEventIdentifiers,
    content: EventPicker<typeof type, WorkPlace.Client>,
    to: PlayerId,
  ) {
    this.socket.sendEvent(type, content, to);
  }

  public async broadcast<I extends GameEventIdentifiers = GameEventIdentifiers>(
    type: I,
    content: EventPicker<I, WorkPlace.Server>,
  ) {
    this.socket.ClientIds.forEach(clientId => {
      if (content.messages && typeof content.messages === 'string') {
        content.messages = [content.messages];
      }
      if (content.translationsMessage) {
        content.messages
          ? content.messages.push(content.translationsMessage.toString())
          : (content.messages = [content.translationsMessage.toString()]);
      }
      this.socket.getSocketById(clientId).emit(type.toString(), content);
    });

    // const stages: GameEventStage[] | undefined =
    //   GameStages[type as GameEventIdentifiers];
    // if (!stages) {
    //   throw new Error(`Unable to get game stage by identifier ${type}`);
    // }

    //TODO: how to trigger skills?
    // for (const stage of stages) {
    //   this.currentGameEventStage = stage;
    //   if (this.currentGameEventStage === 1) {
    //     const skill =
    //       content.triggeredBySkillName &&
    //       Sanguosha.getSkillBySkillName(content.triggeredBySkillName);
    //     if (skill) {
    //       const { invoke } = await this.socket.waitForResponse<
    //         EventPicker<
    //           GameEventIdentifiers.AskForInvokeEvent,
    //           WorkPlace.Client
    //         >
    //       >('@skill_response');
    //       invoke && skill.onEffect(this, content);
    //     }
    //   }

    //   this.trigger(stage, content);
    // }
  }



  public async trigger(
    stage: AllStage,
    content: EventPicker<GameEventIdentifiers, WorkPlace.Server>,
  ) {
    if (!this.CurrentPlayer) {
      throw new Error('current player is undefined');
    }

    const start = this.players.length % this.CurrentPlayer.Position;
    for (
      let i = start;
      i !== this.CurrentPlayer.Position;
      i = this.players.length % (i + 1)
    ) {
      if (this.players[i].Dead) {
        continue;
      }

      // TODO: how to trigger skills?
      // const skills = this.players[i].getSkills<TriggerSkill>('trigger');
      // for (const skill of skills) {
      //   if (
      //     skill.isTriggerable(stage) &&
      //     skill.canUse(this, this.players[i], content)
      //   ) {
      //     if (skill.isAutoTrigger()) {
      //       skill.onTrigger(this, this.players[i], content);
      //     } else {
      //       const { invoke } = await this.socket.waitForResponse<
      //         EventPicker<
      //           GameEventIdentifiers.AskForInvokeEvent,
      //           WorkPlace.Client
      //         >
      //       >('@skill_response');
      //       invoke && skill.onTrigger(this, this.players[i], content);
      //     }
      //   }
      // }
    }
  }

  public async onReceivingAsyncReponseFrom<T>(
    identifier: GameEventIdentifiers,
    playerId: PlayerId,
  ): Promise<T> {
    return await this.socket.waitForResponse<T>(identifier, playerId);
  }

  public drawCards(numberOfCards: number, player?: Player) {
    const drawCards = this.drawDile.slice(0, numberOfCards);
    this.drawDile = this.drawDile.slice(numberOfCards);
    player
      ? player.drawCardIds(...drawCards)
      : this.currentPlayer && this.currentPlayer.drawCardIds(...drawCards);
  }

  public dropCards(cardIds: CardId[], from?: Player) {
    if (from) {
      from.dropCards(...cardIds);
    }

    this.dropDile.push(...cardIds);
    this.drawDile.filter(cardId => !cardIds.includes(cardId));
  }

  public moveCard(
    cardId: CardId,
    from: Player | undefined,
    to: Player,
    fromArea: PlayerCardsArea,
    toArea: PlayerCardsArea,
  ) {
    if (from) {
      from.dropCards(cardId);
    }

    const card = Sanguosha.getCardById(cardId);
    if (toArea === PlayerCardsArea.EquipArea) {
      // TODO: looks like the type of event object cannot be auto detected;
      const lostCardId = to.equip(card as EquipCard);
      lostCardId !== undefined && this.onLoseCard(to, lostCardId);

      this.broadcast<GameEventIdentifiers.CardUseEvent>(
        GameEventIdentifiers.CardUseEvent,
        {
          translationsMessage: TranslationPack.translationJsonPatcher(
            '{0} uses card {1}',
            to.Name,
            card.Name,
          ),
          fromId: to.Id,
          toIds: [to.Id],
          cardId,
        },
      );
    } else {
      to.getCardIds(toArea).push(cardId);
      this.broadcast<GameEventIdentifiers.MoveCardEvent>(
        GameEventIdentifiers.MoveCardEvent,
        {
          translationsMessage: TranslationPack.translationJsonPatcher(
            '{0} obtains card {1}',
            to.Name,
            card.Name,
          ),
          fromId: from && from.Id,
          toId: to.Id,
          fromArea,
          toArea,
        },
      );
    }
  }

  public onLoseCard(player: Player, cardId: CardId) {
    const card = Sanguosha.getCardById(cardId);
    card.Skill.onLoseSkill(player);
  }

  public get RoomId() {
    return this.roomId;
  }

  public getRoomInfo(): RoomInfo {
    return {
      name: this.gameInfo.roomName,
      activePlayers: this.players.length,
      totalPlayers: this.gameInfo.numberOfPlayers,
      packages: this.gameInfo.characterExtensions,
      status: this.gameStarted ? 'playing' : 'waiting',
    };
  }
}