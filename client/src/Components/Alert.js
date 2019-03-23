import React from 'react';
import { Alert as RSAlert } from 'reactstrap';

const Alert = ({ color, visible, onDismiss, message }) => (
  <RSAlert color={color} isOpen={visible} toggle={onDismiss}>
    {message}
  </RSAlert>
);

export default Alert;
