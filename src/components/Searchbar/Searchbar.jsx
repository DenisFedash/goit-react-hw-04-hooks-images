import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearchAlt } from 'react-icons/bi';
import { Conatiner, Form, Input, Button, TextBtn } from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const onChangeInput = e => {
    setSearch(e.currentTarget.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();

    if (search.trim() === '') {
      alert('Enter a search term.');
      return;
    }

    onSubmit(search);
  };

  return (
    <Conatiner>
      <Form onSubmit={onSubmitForm}>
        <Button type="submit">
          <TextBtn>
            <BiSearchAlt size={20} />
          </TextBtn>
        </Button>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
          value={search}
        />
      </Form>
    </Conatiner>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
