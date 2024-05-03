import { useParams } from "react-router-dom"
import { useFirebase } from "../context/Firebase"
import { useEffect, useState } from "react"

const ViewOrderDetails = () => {

    const params = useParams()
    // console.log(params)
    const firebase = useFirebase()
    const [orders , setOrders] = useState([])
    useEffect(( ) => {
      firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs))
    } , [firebase,params.bookId])
      
  return (
    <div className="container"> 
      <h1 className="mt-5">Orders </h1>
      {
      orders.map((order) => { 
        const data = order.data()
         return (
           <div key={order.id} className=" mt-5" style={{ border: '1px solid', padding: '8px' }}>
             <h5>Ordered Details :</h5>
             <h6>
               {' '}
               <b>Name :</b> {data.displayName}{' '}
             </h6>
             <h6>
               {' '}
               <b>Email :</b> {data.userEmail}{' '}
             </h6>
             <h6>
               <b> Quantity :</b> {data.quantity}
             </h6>
           </div>
         )  
       }
      )
      }
    </div>
  )
}

export default ViewOrderDetails
 