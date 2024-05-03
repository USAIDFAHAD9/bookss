import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { Button, Form } from 'react-bootstrap'

const BookDetailsPage = () => {
  const params = useParams() //this will give us the book id that is also present in the url
  // console.log(params)

  const firebase = useFirebase()

  const [data, setData] = useState(null)
  const [URL , setURL] = useState(null)
  // const [userPhotoURL , setUserPhotoURL] = useState(null)
const [quantity , setQuantity] = useState(0)
  // console.log(data)
  
  useEffect(() => {
    firebase.getBookById(params.bookId).then((value) => setData(value.data()))
  }, [firebase , params.bookId])

  useEffect(() => {
    if(data) {
      const imageURL = data.imageURL
      firebase.getImageURL(imageURL).then((url)=> setURL(url))
      // const userURL = data.
    }
  } , [firebase , data])

  if (data == null) return <h1>..Loading..</h1>


  const placeOrder = async() => {
    const result = await firebase.placeOrder(params.bookId , quantity)
    console.log(result);
  }
  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img
        src={URL}
        width="46%"
        className="mt-4 mb-5"
        style={{ borderRadius: '10px' }}
      />
      <h2>Book Details </h2>
      <h6>Price : {data.price}/-</h6>
      <h6>ISBN Number : {data.isbnNumber}</h6>
      <h2>Owner Details </h2>
      {/* <img src={data.photoURL} /> */}
      <h6>Name : {data.displayName}</h6>
      <h6>email : {data.userEmail}</h6>
      <br />
      <br />
      <br />
      <Form.Group className="mb-3" controlId="quantity">
        <Form.Label>Select Quantity</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          value={quantity}
        />
      </Form.Group>
      <Button variant="success" onClick={placeOrder} >Buy Now</Button>
    </div>
  )
}

export default BookDetailsPage
