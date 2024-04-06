import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

import ContactForm from "./ContactForm/ContactForm";
import SearchBox from "./SearchBox/SearchBox";
import ContactList from "./ContactList/ContactList";

import "./App.scss";

function App() {
  const defaultContacts = [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ];

  const [contacts, setContacts] = useState(() => {
    const contactsStorage = localStorage.getItem("contactsStorage");

    if (contactsStorage !== null) {
      return JSON.parse(contactsStorage);
    }
  
    return defaultContacts;
  });

  const [search, setSearch] = useState("");

  const addContact = (values) => {
    setContacts((prevContacts) => {
      return [
        ...prevContacts,
        {
          id: nanoid(),
          name: values.name,
          number: values.phone,
        },
      ];
    });
  };

  const deleteContact = (id) => {
    const delatedContact = contacts.filter((contact) => contact.id !== id);

    setContacts(() => {
      return delatedContact;
    });
  };

  useEffect(() => {
    localStorage.setItem("contactsStorage", JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <SearchBox search={search} onSearch={setSearch} />
        <ContactList
          visibleContacts={visibleContacts}
          deleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
