import React from 'react';
import { Row, Col, InputGroup, InputGroupAddon, Button, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Main = ({ parties, increasePartyValue, decreasePartyValue }) => (
  <>
    {parties.map((party, i) => (
      <Row key={i} className="mb-3">
        <Col>
          <Label style={{ fontSize: '1rem', fontWeight: '400' }} for={`party-${i}`}>
            {party.name}
          </Label>
        </Col>
        <Col>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Button outline color="primary" onClick={() => increasePartyValue(i)}>
                <FontAwesomeIcon icon="plus" />
              </Button>
            </InputGroupAddon>
            <Input
              type="number"
              min={0}
              bsSize="lg"
              id={`party-${i}`}
              value={party.value}
              style={{ textAlign: 'center', color: '#666', border: '0' }}
              disabled
            />
            <InputGroupAddon addonType="append">
              <Button outline color="primary" onClick={() => decreasePartyValue(i)}>
                <FontAwesomeIcon icon="minus" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
    ))}
    <Button color="primary" size="lg" block className="mt-5 mb-5">
      <FontAwesomeIcon icon="vote-yea" size="2x" />
    </Button>
  </>
);

export default Main;
