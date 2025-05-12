export default function ImageCard({ card, onClick }) {
  return (
    <div onClick={() => onClick(card.largeUrl)}>
      <img src={card.smallUrl} alt={card.description} />
    </div>
  );
}
