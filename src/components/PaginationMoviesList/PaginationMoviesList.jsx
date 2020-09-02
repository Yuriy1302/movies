import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';

import 'antd/dist/antd.css';
import './PaginationMoviesList.css';

const PaginationMoviesList = (props) => {
  const { defaultPage, page, totalResults, onPageChange } = props;

  return (
    <Pagination
      style={{ margin: '10px auto' }}
      size="small"
      showSizeChanger={false}
      defaultPageSize={20}
      defaultCurrent={defaultPage}
      current={page}
      total={totalResults}
      onChange={onPageChange}
    />
  );
};

PaginationMoviesList.propTypes = {
  defaultPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationMoviesList;
