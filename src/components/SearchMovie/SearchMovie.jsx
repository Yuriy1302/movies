import React from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import ErrorIndicator from '../ErrorIndicator';

import './SearchMovie.css';

class SearchMovie extends React.Component {
  static propTypes = {
    onDebounced: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { onDebounced } = this.props;
    this.debouncedUpdate = debounce((value) => onDebounced(value), 700);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className="alert_example">
          <ErrorIndicator />
        </div>
      );
    }

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
