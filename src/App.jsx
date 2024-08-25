import React, { useState } from 'react';
import ConnectWallet from './ConnectWallet';
import LendingPool from './LendingPool';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [provider, setProvider] = useState(null);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <ConnectWallet setProvider={setProvider} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {provider && <LendingPool provider={provider} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
