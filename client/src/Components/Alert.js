import React from 'react';
import { Alert as RSAlert } from 'reactstrap';

const Alert = ({ color, visible, onDismiss, title, message }) => (
  <RSAlert color={color} isOpen={visible} toggle={onDismiss}>
    <h4>{title}</h4>
    {message}
  </RSAlert>
);

export default Alert;
