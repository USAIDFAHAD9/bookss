import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useState, useEffect } from 'react'
import { useFirebase } from '../context/Firebase'
import { useNavigate } from 'react-router-dom'

const BookCard = (props) => {
  const firebase = useFirebase()
  const [url, setUrl] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setUrl(url))
  }, [])
  return (
    <Card style={{ width: '18rem'}} className="mt-3 mb-3 mx-3">
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <Card.Title> {props.name} </Card.Title>
        <Card.Text>
          This books has a title.. <b>{props.name}</b> and book is sold by{' '}
          <b>{props.userDisplayName} </b>
          and this book costs <b>Rs.{props.price}</b>
        </Card.Text>
        <Button
          variant="primary"
          onClick={(e) => navigate(props.link)}
        >
          View
        </Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard
