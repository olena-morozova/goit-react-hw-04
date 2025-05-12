import Modal from "react-modal";
//Modal.setAppElement("#root");
import css from "./ImageModal.module.css";
const customStyles = {
  overlay: {
    backgroundColor: "rgb(12 11 11 / 77%)",
  },
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
      //shouldCloseOnEsc={true}
      //shouldCloseOnOverlayClick={true}
      contentLabel="Selected Image"
      //overlayClassName="Overlay"
      //className="Modal"
      style={customStyles}
    >
      <img
        className={css.modalImage}
        //src={image.urls.regular}
        //alt={image.alt_description}
        width={400}
        height={600}
        src={image}
        alt=""
        //style={{ maxWidth: "100%" }}
      />
    </Modal>
  );
}
