import { useState } from "react";
import Modal from "react-modal";

import css from "./ImageModal.module.scss";

Modal.setAppElement("#root");

function ImageModal({isOpen, toogleModal, modalImage}) {

  function closeModal() {
    toogleModal(false);
    document.body.style.overflow = 'unset';
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className={css.modal}
        overlayClassName={css.overlay}
      >
        <img src={modalImage} alt="" />
      </Modal>
    </>
  );
}

export default ImageModal;
