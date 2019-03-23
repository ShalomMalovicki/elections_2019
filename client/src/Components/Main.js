import React, { useState, Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { GET_USER_GUESS, VOTE } from '../queries';
import { Jumbotron, Row, Col, InputGroup, InputGroupAddon, Button, Label, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../logos.css';
import Alert from './Alert';
import likud_logo from '../images/likud_logo.jpg';
import haavoda from '../images/haavoda.jpg';
import gantzLapid from '../images/gantz-lapid.png';
import kulanu from '../images/kulanu-kahlonim.jpg';
import baladRaam from '../images/balad-raam.jpg';
import ss from '../images/ss.jpg';
import unitedTorahJudaism from '../images/united-torah-judaism.jpg';
import meretz from '../images/meretz2019.jpg';
import beytenu from '../images/beytenu.jpg';
import yamin from '../images/yamin.png';
import chadashTaal from '../images/chadash-taal.jpg';
import newyaminparty from '../images/newyaminparty.jpg';
import gesherparty from '../images/gesherparty.jpg';
import zehut from '../images/zehut.jpg';
import magenparty from '../images/magenparty.jpg';
// import LongPressButton from './LongPressButton';

// TODO: fix increase and decrease buttons
//https://stackoverflow.com/questions/48048957/react-long-press-event

const greeting = () => {
  const date = new Date();
  let hours = date.getHours();
  if (hours < 12) return 'בוקר טוב';
  if (hours < 17) return 'צהרים טובים';
  if (hours < 21) return 'ערב טוב';
  return 'לילה טוב';
};

const Main = ({ me, openForm }) => {
  const [guesses, setGuesses] = useState([]);

  const [warning, setWarning] = useState({
    isOpen: false,
    message: ''
  });

  const [success, setSuccess] = useState({
    isOpen: false,
    message: ''
  });

  const showAlert = (isOpen, message) => {
    setWarning({
      isOpen,
      message
    });
  };

  const showSuccess = (isOpen, message) => {
    setSuccess({
      isOpen,
      message
    });
  };

  const increasePartyValue = i => {
    const sum = guesses.reduce((sum, { value }) => sum + value, 0);
    if (sum === 120) {
      showAlert(true, 'הגעת למקסימום מנדטים שניתן לבחור');
    } else {
      const temp = guesses;
      temp[i].value++;
      setGuesses([...temp]);
    }
  };

  const decreasePartyValue = i => {
    const temp = guesses;
    if (temp[i].value > 0) {
      temp[i].value--;
      setGuesses([...temp]);
    }
  };

  const partiesImages = [
    likud_logo,
    haavoda,
    gantzLapid,
    kulanu,
    baladRaam,
    ss,
    unitedTorahJudaism,
    meretz,
    beytenu,
    yamin,
    chadashTaal,
    newyaminparty,
    gesherparty,
    zehut,
    magenparty
  ];

  return (
    <>
      {me ? (
        <Query query={GET_USER_GUESS} variables={{ id: me.id }}>
          {({ loading, error, data }) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;
            if (guesses.length === 0) {
              setGuesses(data.getUserGuess);
            }
            return (
              <>
                <h4 className="mb-4">{`${greeting()} ${me.username}, הזנ/י את בחירתך`}</h4>
                {warning.isOpen && (
                  <Alert
                    color="warning"
                    visible={true}
                    onDismiss={() => showAlert(false, '')}
                    message={warning.message}
                  />
                )}
                {guesses.map((party, i) => (
                  <Fragment key={i}>
                    <Row className="mb-3">
                      <Col>
                        <Label className="logo-box" for={`party-${i}`}>
                          <img src={partiesImages[i]} alt={party.name} />
                          <p className="logo-text">{party.name}</p>
                        </Label>
                      </Col>
                      <Col className="party-value-selection">
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            {/* <LongPressButton clickHandler={() => increasePartyValue(i)}> */}
                            <Button outline color="primary" onClick={() => increasePartyValue(i)}>
                              <FontAwesomeIcon icon="plus" />
                            </Button>
                            {/* </LongPressButton> */}
                          </InputGroupAddon>
                          <Input
                            type="number"
                            bsSize="lg"
                            value={party.value}
                            style={{ textAlign: 'center', color: '#444', border: '0' }}
                            disabled
                          />
                          <InputGroupAddon addonType="append">
                            {/* <LongPressButton clickHandler={() => decreasePartyValue(i)}> */}
                            <Button outline color="primary" onClick={() => decreasePartyValue(i)}>
                              <FontAwesomeIcon icon="minus" />
                            </Button>
                            {/* </LongPressButton> */}
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                    </Row>
                    {i !== guesses.length - 1 && <hr />}
                  </Fragment>
                ))}
                {success.isOpen && (
                  <Alert
                    color="success"
                    visible={true}
                    onDismiss={() => showSuccess(false, '')}
                    message={success.message}
                  />
                )}
                <Mutation mutation={VOTE}>
                  {vote => (
                    <Button
                      color="primary"
                      size="lg"
                      block
                      className="mt-5 mb-5"
                      onClick={async () => {
                        try {
                          // filter out GraphQL __typename
                          const temp = guesses.map(({ name, value }) => {
                            return {
                              name,
                              value
                            };
                          });
                          await vote({ variables: { userGuesses: temp } });
                          showSuccess(true, 'הצבעתך נקלטה במערכת');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <FontAwesomeIcon icon="vote-yea" size="2x" />
                    </Button>
                  )}
                </Mutation>
              </>
            );
          }}
        </Query>
      ) : (
        <Jumbotron>
          <h4>כדי להשתתף, עליך לבצע כניסה למערכת</h4>
          <div className="text-center">
            <Button color="primary" onClick={() => openForm('login')}>
              כניסה &nbsp;
              <FontAwesomeIcon icon="sign-in-alt" />
            </Button>
          </div>
        </Jumbotron>
      )}
    </>
  );
};

export default Main;
