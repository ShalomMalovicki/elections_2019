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
import { REGISTER } from '../queries';
import Alert from './Alert';

const registerConfig = {
  title: 'הרשמה',
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
    },
    {
      label: 'אימות סיסמה',
      type: 'password',
      name: 'confirmPassword',
      icon: 'check',
      required: true
    }
  ]
};

const Register = props => {
  const [form, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const updateField = e => {
    const { name, value } = e.target;
    setValues({
      ...form,
      [name]: value
    });
  };
  const [warning, setWarning] = useState({
    isOpen: false,
    color: '',
    message: ''
  });

  const showAlert = (isOpen, color, message) => {
    setWarning({
      isOpen,
      color,
      message
    });
  };
  return (
    <Mutation mutation={REGISTER}>
      {doRegistration => (
        <RSModal
          isOpen={props.isOpen}
          toggle={props.closeModal}
          className={props.className}
          dir="rtl"
        >
          <ModalHeader toggle={props.closeModal}>{registerConfig.title}</ModalHeader>
          <ModalBody>
            {warning.isOpen && (
              <Alert
                color={warning.color}
                visible={true}
                onDismiss={() => showAlert(false, '', '')}
                message={warning.message}
              />
            )}
            {registerConfig.form.map((f, i) => (
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
            <Button
              color="primary"
              onClick={async e => {
                e.preventDefault();
                const { username, password, confirmPassword } = form;
                if (password !== confirmPassword) {
                  showAlert(true, 'warning', 'הסיסמות אינן תואמות');
                  return;
                }
                try {
                  const { data } = await doRegistration({ variables: form });
                  if (data.register) {
                    showAlert(true, 'success', `נרשמת בהצלחה`);
                    await new Promise(resolve =>
                      setTimeout(() => resolve(props.closeModal()), 3000)
                    );
                  }
                } catch (err) {
                  showAlert(true, 'warning', `המשתמש ${username} כבר קיים במערכת`);
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

export default Register;
