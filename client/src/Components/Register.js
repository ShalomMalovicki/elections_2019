import React from 'react';
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

const register = {
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
      name: 'password1',
      icon: 'check',
      required: true
    }
  ]
};

const Register = props => {
  return (
    <form>
      <RSModal
        isOpen={props.isOpen}
        toggle={props.closeModal}
        className={props.className}
        dir="rtl"
      >
        <ModalHeader toggle={props.closeModal}>{register.title}</ModalHeader>
        <ModalBody>
          {register.form.map((f, i) => (
            <FormGroup key={i}>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <span className="input-group-text" style={{ background: 'white' }}>
                    <FontAwesomeIcon icon={f.icon} />
                  </span>
                </InputGroupAddon>
                <Input type={f.type} name={f.name} placeholder={f.label} required={f.required} />
              </InputGroup>
            </FormGroup>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button color="primary">
            שלח <FontAwesomeIcon icon="share-square" />
          </Button>
        </ModalFooter>
      </RSModal>
    </form>
  );
};

export default Register;
