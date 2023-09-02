import { useState, useEffect, useContext } from 'react'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { AppContext } from '../../App'
import './Payment.css'
import { FormPayment } from '../../components/FormPayment/FormPayment'
const Payment = () => {
  const { dataLength, setDataLength, allPayment, setAllPayment } = useContext(AppContext)
  return (
    <div className='payment'>
      <h1>Opłata Kartą <FaCcVisa size={40} color='#1db954'/>{' '}<FaCcMastercard size={40} color='#ff9f1a'/></h1>
      <FormPayment amount={allPayment.toFixed(2)}/>
 </div>
  )
}

export default Payment