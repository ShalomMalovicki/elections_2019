import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import {
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Modal as RSModal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LOGIN } from '../queries';
import Alert from './Alert';

const loginConfig = {
  title: 'כניסה',
  form: [
    {
      label: 'שם משתמש',
      type: 'text',
      name: 'username',
      icon: 'user',
      required: true
    },
    {
      label: 'סיסמה',
      type: 'password',
      name: 'password',
      icon: 'key',
      required: true
    }
  ]
};

const Login = props => {
  const [form, setValues] = useState({
    username: '',
    password: ''
  });

  const [warning, setWarning] = useState({
    isOpen: false,
    message: ''
  });

  const showAlert = (isOpen, message) => {
    setWarning({
      isOpen,
      message
    });
  };

  const updateField = e => {
    const { name, value } = e.target;
    setValues({
      ...form,
      [name]: value
    });
  };

  return (
    <Mutation mutation={LOGIN}>
      {doLogin => (
        <RSModal
          isOpen={props.isOpen}
          toggle={props.closeModal}
          className={props.className}
          dir="rtl"
        >
          <ModalHeader toggle={props.closeModal}>{loginConfig.title}</ModalHeader>
          <ModalBody>
            {warning.isOpen && (
              <Alert
                color="warning"
                visible={true}
                onDismiss={() => showAlert(false, '')}
                message={warning.message}
              />
            )}

            {loginConfig.form.map((f, i) => (
              <FormGroup key={i}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text" style={{ background: 'white' }}>
                      <FontAwesomeIcon icon={f.icon} />
                    </span>
                  </InputGroupAddon>
                  <Input
                    type={f.type}
                    name={f.name}
                    placeholder={f.label}
                    required={f.required}
                    onChange={updateField}
                  />
                </InputGroup>
              </FormGroup>
            ))}
          </ModalBody>
          <ModalFooter>
            <p className="mr-auto">
              אין לך חשבון עדין?
              <Button color="link" onClick={() => props.openForm('register')}>
                הרשם כאן
              </Button>
            </p>
            <Button
              color="primary"
              onClick={async e => {
                e.preventDefault();
                const { username, password } = form;
                if (username === '' || password === '') {
                  showAlert(true, 'נא להזין שם משתמש וסיסמה');
                }
                try {
                  const {
                    data: {
                      login: { token }
                    }
                  } = await doLogin({ variables: form });
                  if (token) {
                    await localStorage.setItem('token', token);
                    props.refetch();
                    props.closeModal();
                  }
                } catch (err) {
                  showAlert(true, 'הפרטים שהוזנו שגויים');
                }
              }}
            >
              שלח &nbsp;
              <FontAwesomeIcon icon="share-square" />
            </Button>
          </ModalFooter>
        </RSModal>
      )}
    </Mutation>
  );
};

export default Login;
