import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../context/Firebase'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const firebase = useFirebase()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  useEffect(() => {
    if (firebase.isLoggedIn) navigate('/')
  }, [firebase, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('signing Up a user')
    const result = await firebase.signupUserWithEmailAndPassword(
      email,
      password
    )
    console.log('signup successful', result)
  }

  return (
    <div className="container mt-5 ">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Form.Text className="text-muted">
            We will never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>
      </Form>
    </div>
  )
}

export default RegisterPage
