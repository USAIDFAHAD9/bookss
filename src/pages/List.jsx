import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import {useFirebase} from '../context/Firebase'
import { useNavigate } from 'react-router-dom'

const ListPage = () => {

  const firebase = useFirebase() // instance of firebase

  const [name, setName] = useState('')
  const [isbnNumber, setIsbnNumber] = useState('')
  const [price, setPrice] = useState('')
  const [coverPic, setCoverPic] = useState(null)
  const navigate = useNavigate()
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    await firebase.handleCreateNewListing(name , isbnNumber, price, coverPic)
    navigate('/')
  }
  return (
    <div className="container mt-5 ">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicBookName">
          <Form.Label>Enter Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicISBN">
          <Form.Label>Enter ISBN number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter isbn number"
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Enter Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCoverPic">
          <Form.Label>Add Book Cover photo</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setCoverPic(e.target.files[0])}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </div>
  )
}

export default ListPage
