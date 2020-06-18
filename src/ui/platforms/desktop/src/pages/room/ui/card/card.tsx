import classNames from 'classnames';
import { Card } from 'core/cards/card';
import { ClientTranslationModule } from 'core/translations/translation_module.client';
import { ImageLoader } from 'image_loader/image_loader';
import * as mobx from 'mobx';
import * as mobxReact from 'mobx-react';
import * as React from 'react';
import styles from './card.module.css';
import { CardNumberItem } from './card_number';
import { CardSuitItem } from './card_suit';

export type ClientCardProps = {
  card?: Card;
  translator: ClientTranslationModule;
  imageLoader: ImageLoader;
  className?: string;
  disabled?: boolean;
  unselectable?: boolean;
  onSelected?(selected: boolean): void;
  tag?: string;
  width?: number;
  offsetLeft?: number;
  offsetTop?: number;
  style?: React.CSSProperties;
  onMouseUp?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onMouseDown?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onMouseMove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  onMouseLeave?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  ref?: string | ((instance: HTMLDivElement | null) => void) | React.RefObject<HTMLDivElement>;
};

@mobxReact.observer
export class ClientCard extends React.Component<ClientCardProps> {
  @mobx.observable.ref
  private selected: boolean = false;
  @mobx.observable.ref
  private cardComponent: JSX.Element | undefined;

  private soundTracks: string[] = [];

  readonly onClick = mobx.action(() => {
    if (this.props.disabled === false) {
      if (!this.props.unselectable) {
        this.selected = !this.selected;
      }
      this.props.onSelected && this.props.onSelected(this.selected);
    }
  });

  @mobx.action
  getSelected() {
    if (!!this.props.disabled) {
      this.selected = false;
    }
    return this.selected;
  }

  playAudio(): string {
    const randomIndex = Math.round(Math.random() * this.soundTracks.length);
    return this.soundTracks[randomIndex];
  }

  getCardRatioSize(): React.CSSProperties {
    const { width = 120, offsetLeft = 0, offsetTop = 0 } = this.props;
    const height = (width * 4) / 3;
    return {
      width,
      height,
      transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
    };
  }

  componentDidMount() {
    this.getCardComponent().then(
      mobx.action(component => {
        this.cardComponent = component;
      }),
    );
  }

  async getCardComponent() {
    const { card, translator, imageLoader, tag } = this.props;
    if (!card) {
      const cardBack = await imageLoader.getCardBack();
      return (
        <div className={styles.emptyCard}>
          <img src={cardBack.src} className={styles.cardImage} alt={translator.tr(cardBack.alt)} />
        </div>
      );
    }

    const image = await imageLoader.getCardImage(card.Name);
    return (
      <div className={styles.innerCard}>
        <div className={styles.cornerTag}>
          <CardNumberItem cardNumber={card.CardNumber} />
          <CardSuitItem suit={card.Suit} />
        </div>
        {image.src ? (
          <img className={styles.cardImage} src={image.src} alt={card.Name} />
        ) : (
          <span>{translator.tr(card.Name)}</span>
        )}
        {tag && <span className={styles.cardTag}>{translator.trx(tag)}</span>}
      </div>
    );
  }

  render() {
    const { className, style = {} } = this.props;

    return (
      <div
        ref={this.props.ref}
        className={classNames(styles.clientCard, className, {
          [styles.selected]: this.getSelected() && !this.props.disabled,
        })}
        style={{
          ...this.getCardRatioSize(),
          ...style,
        }}
        onClick={this.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        onMouseMove={this.props.onMouseMove}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.cardComponent}
      </div>
    );
  }
}
