import css from "./ImageCard.module.css";
export default function ImageCard({ card, onClick }) {
  return (
    <div className={css.imgWrapper} onClick={() => onClick(card)}>
      <img className={css.img} src={card.smallUrl} alt={card.alt} />
    </div>
  );
}
