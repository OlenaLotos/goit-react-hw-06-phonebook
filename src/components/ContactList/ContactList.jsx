import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, getContacts, getFilter } from '../../Redux/contactsSlice';
import { ContactItem } from '../ContactItem/ContactItem';
import { ListUl } from './ContactList.styled';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filterContacts = useSelector(getFilter);
  const dispatch = useDispatch();

  const onDeleteContact = contactId => {
    dispatch(remove(contactId));
  };

  const setContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filterContacts.toLocaleLowerCase())
  );

  return (
    <ListUl>
      {setContacts.map(({ id, name, number }) => (
        <ContactItem
          key={id}
          id={id}
          name={name}
          number={number}
          onClick={onDeleteContact}
        />
      ))}
    </ListUl>
  );
}
