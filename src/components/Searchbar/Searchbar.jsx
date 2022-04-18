import { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as SearchIcon } from '../../svg/search.svg';
import { Conatiner, Form, Input, Button, TextBtn } from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    search: '',
  };

  onChangeInput = e => {
    this.setState({ search: e.currentTarget.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;
    const { search } = this.state;

    if (search.trim() === '') {
      alert('Enter a search term.');
      return;
    }

    onSubmit(search);
  };

  render() {
    const { search } = this.state;
    return (
      <Conatiner>
        <Form onSubmit={this.onSubmitForm}>
          <Button type="submit">
            <TextBtn>
              <SearchIcon width="20px" height="20px" />
            </TextBtn>
          </Button>

          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onChangeInput}
            value={search}
          />
        </Form>
      </Conatiner>
    );
  }
}
