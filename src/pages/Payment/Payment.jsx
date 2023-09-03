import { useState, useEffect, useContext } from 'react'
import { FaCcVisa, FaCcMastercard } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  saveStorage,
  saveStorageSingle,
  fetchStorage,
  deleteStorage,
} from './../../helpers/localStorage'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import './Payment.css'
import { FormPayment } from '../../components/FormPayment/FormPayment'
const Payment = () => {
  const { dataLength, setDataLength, allPayment, setAllPayment,dataPersonal, setDataPersonal } =
    useContext(AppContext)
  const [dataCard, setDataCard] = useState(null)
  const navigate = useNavigate()

  

  const handleSubmit = (data) => {
    const newDataCard = {
      amount: data.amount,
      cardNumber: data.cardNumber,
    }
    setDataCard(newDataCard)
    saveStorage(dataPersonal,'admin-list')
   
  }
  useEffect(() => {
    if(dataCard){
    notifySuccess()
    setDataLength(0)
    setDataPersonal(null)
     setTimeout(() => { navigate('/'); deleteStorage('carts')},5000)
    }
  },[dataCard])

  const notifySuccess = () => {
    toast.success(
      `Dziękujemy za wpłatę ${dataCard.amount} PLN z karty ${dataCard.cardNumber}!`,
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      }
    )
  }

  return (
    <div className='payment'>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {allPayment > 0 ? (
        <>
          <h1>
            Opłata Kartą{' '}
            <FaCcVisa
              size={40}
              color='#1db954'
            />{' '}
            <FaCcMastercard
              size={40}
              color='#ff9f1a'
            />
          </h1>
          <FormPayment
            onSubmit={handleSubmit}
            amount={allPayment.toFixed(2)}
           
          />
        </>
      ) : (
        <>
          <h1>Koszyk nie jest zatwierdzony</h1>
          <Link
            className='payment-link'
            to={'/koszyk'}
          >
            Koszyk
          </Link>
        </>
      )}
    </div>
  )
}

export default Payment
