import { Component } from 'react';
import PropTypes from 'prop-types';
import { Conatiner, Form, Input, Button, TextBtn } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSearchInput = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.search) return;

    this.props.onSubmit(this.state.search);

    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      search: '',
    });
  };
  render() {
    return (
      <Conatiner>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <TextBtn>Search</TextBtn>
          </Button>

          <Input
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchInput}
            value={this.state.search}
          />
        </Form>
      </Conatiner>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
