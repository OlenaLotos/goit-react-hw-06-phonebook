import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { add, getContacts } from '../../Redux/contactsSlice';
import { Form, Label, Input, Button } from './ContactForm.styled';

export default function ContactForm() {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const onSubmit = formValue => {
    if (contacts.find(contact => contact.name === formValue.name)) {
      return alert(`${formValue.name} вже є в списку контактів`);
    }
    let id = nanoid();
    dispatch(add({ ...formValue, id }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ name: name, number: number });
    reset();
  };

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>Name</Label>
      <Input
        type="text"
        name="name"
        value={name}
        placeholder="Enter name"
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />

      <Label>Number</Label>
      <Input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <Button type="submit">Add contact</Button>
    </Form>
  );
}
