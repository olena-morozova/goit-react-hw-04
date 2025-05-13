import Modal from "react-modal";

import css from "./ImageModal.module.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};
export default function ImageModal({ isOpen, onClose, image }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Selected Image"
      overlayClassName={css.overlay}
      style={customStyles}
    >
      <img
        className={css.modalImage}
        width={400}
        height={600}
        src={image.largeUrl}
        alt={image.alt}
      />
      <div className={css.infoBox}>
        <p>{image.description} </p>
        <p>Author: {image.author} </p>
        <p>Likes: {image.likes} </p>
      </div>
    </Modal>
  );
}
