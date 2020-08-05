import React from 'react';
import PropTypes from 'prop-types';

import { debounce } from 'lodash';

import { Input } from 'antd';
import './SearchMovie.css';

class SearchMovie extends React.Component {
  static propTypes = {
    onDebounced: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { onDebounced } = this.props;
    this.debouncedUpdate = debounce((value) => onDebounced(value), 1500);
  }

  render() {
    return (
      <Input
        placeholder="Type to search..."
        size="large"
        style={{ width: '100%', margin: '20px 0' }}
        onChange={({ target: { value } }) => this.debouncedUpdate(value)}
      />
    );
  }
}

export default SearchMovie;
