import { Container, Row, Col } from 'react-bootstrap'
import Form from './components/form'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Container>
        <Row>
          <Col />
          <Form />
          <Col />
        </Row>
      </Container>
    </div>
  )
}

export default App
