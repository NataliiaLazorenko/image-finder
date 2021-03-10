import React, { Component } from 'react';
import './Searchbar.css';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    const { value } = event.currentTarget;

    this.setState({ query: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit(this.state.query);
    this.reset();
  };

  reset = () => {
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.query}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
