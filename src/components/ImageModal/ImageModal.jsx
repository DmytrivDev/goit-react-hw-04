import {RemoveScroll} from 'react-remove-scroll';
import Modal from "react-modal";

import css from "./ImageModal.module.scss";

Modal.setAppElement("#root");

function ImageModal({isOpen, toogleModal, modalImage, clearModal}) {

  function closeModal() {
    toogleModal(false);
    clearModal("");
  }

  return (
    <RemoveScroll>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <img src={modalImage} alt="" />
      </Modal>
    </RemoveScroll>
  );
}

export default ImageModal;
