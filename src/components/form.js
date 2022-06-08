import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'

import { decimalToRoman, romanToDecimal } from '../features/convertSlice'

import styles from './form.module.css'

function FormConverter() {
  const { value: result, error } = useSelector((state) => state.convert)

  const [optionB, setOptionB] = useState('decimal')
  const [payload, setPayload] = useState('')
  const [statusInput, setStatusInput] = useState(false)
  const dispatch = useDispatch()

  const [optionA, setOptionA] = useState('romanos')

  const changeOption = (e) => {
    const option = e.target.value
    const targetId = e.target.id
    if (targetId === 'a' && option === 'decimal' && optionB === 'decimal') {
      setOptionA('decimal')
      setOptionB('romanos')
    } else if (
      targetId === 'a' &&
      option === 'romanos' &&
      optionB === 'romanos'
    ) {
      setOptionA('romanos')
      setOptionB('decimal')
    } else if (
      targetId === 'b' &&
      option === 'decimal' &&
      optionA === 'decimal'
    ) {
      setOptionA('romanos')
      setOptionB('decimal')
    } else {
      setOptionA('decimal')
      setOptionB('romanos')
    }
  }

  const convert = (e) => {
    e.preventDefault()

    if (optionB === 'romanos') {
      dispatch(decimalToRoman(payload))
    } else {
      dispatch(romanToDecimal(payload))
    }

    setStatusInput(error)
  }

  const handleChange = (e) => {
    setPayload(e.target.value)
    setStatusInput(false)
  }

  useEffect(() => {
    setStatusInput(error)
  }, [error])

  return (
    <div>
      <Col className={styles.col}>
        <Form onSubmit={(e) => convert(e)}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>De</Form.Label>
                <Form.Select value={optionA} onChange={changeOption} id="a">
                  <option value="romanos">Romanos</option>
                  <option value="decimal">Decimal</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>A</Form.Label>
                <Form.Select id="b" value={optionB} onChange={changeOption}>
                  <option value="romanos">Romanos</option>
                  <option value="decimal">Decimal</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{optionA.toUpperCase()}</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => handleChange(e)}
              className={statusInput && 'text-danger border-danger'}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{optionB.toUpperCase()}</Form.Label>
            <Form.Control type="text" value={result} disabled />
          </Form.Group>

          <Button variant="primary" type="submit">
            Convertir
          </Button>
        </Form>
      </Col>
    </div>
  )
}

export default FormConverter
