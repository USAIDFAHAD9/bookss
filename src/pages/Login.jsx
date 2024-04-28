import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useFirebase } from '../context/Firebase'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const firebase = useFirebase()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  console.log(firebase)
  useEffect(() => {
    if (firebase.isLoggedIn) 
      navigate('/')
  }, [firebase, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('loging in a user')
    const result = await firebase.signinUserWithEmailAndPassword(
      email,
      password
    )

    console.log('login successful', result)
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
          Login
        </Button>
        <h2 className="mt-5  mb-5">OR</h2>
      </Form>
      <Button onClick={firebase.signinWithGoogle} variant="danger">
        SignIn with Google
      </Button>
    </div>
  )
}

export default LoginPage
