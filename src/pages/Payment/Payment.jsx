import { useState, useEffect, useContext } from 'react'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AppContext } from '../../App'
import './Payment.css'
import { FormPayment } from '../../components/FormPayment/FormPayment'
const Payment = () => {
  const { dataLength, setDataLength, allPayment, setAllPayment } = useContext(AppContext)
  return (
    <div className='payment'>
      {allPayment>0?
      <>
      <h1>Opłata Kartą <FaCcVisa size={40} color='#1db954'/>{' '}<FaCcMastercard size={40} color='#ff9f1a'/></h1>
      <FormPayment amount={allPayment.toFixed(2)}/>
      </>:
      <>
      <h1>Koszyk nie jest zatwierdzony</h1>
           <Link className='payment-link' to={'/koszyk'}>Koszyk</Link>
           </>
        }
 </div>
  )
}

export default Payment