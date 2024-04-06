import { IoPerson } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

import css from "./Contact.module.scss";

function Contact({ contact, onDelete }) {
  const { id, name, number } = contact;

  const hendleDelete = (id) => {
    onDelete(id);
  };

  return (
    <li id={id} className={css.contactItem}>
      <div className={css.contactPart}>
        <div className={css.contactContact}>
          <IoPerson /> {name}
        </div>
        <a href="tel:number" className={css.contactContact}>
          <FaPhoneAlt /> {number}
        </a>
      </div>
      <div className={css.contactPart}>
        <button
          onClick={(evt) => {
            hendleDelete(id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Contact;
