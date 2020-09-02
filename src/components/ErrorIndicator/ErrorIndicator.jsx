import React from 'react';
import { Alert } from 'antd';

import './ErrorIndicator.css';

const ErrorIndicator = () => {
  return <Alert type="error" message="Oops!" description="Something went wrong!" style={{ width: 300 }} showIcon />;
};

export default ErrorIndicator;
