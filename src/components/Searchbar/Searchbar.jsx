import { Component } from 'react';
import PropTypes from 'prop-types';

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
      <header>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleSearchInput}
            value={this.state.search}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
