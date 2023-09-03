import './Registration.css'
import { useEffect,useState } from 'react';
import { FormRegister } from './../../components/FormRegister/FormRegister';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'
const Registration = () => {
  const [dataCard, setDataCard] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = (data) => {
    const newDataCard = {
      name: data.name,
      email: data.email,
      adres: data.adres,
      phone: data.phone,
    }
    setDataCard(newDataCard)
    
   
  }
  useEffect(() => {
    if(dataCard){
    notifySuccess()
    
    
     setTimeout(() => { navigate('/oplata')},5000)
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
    <div className='registration'>
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
      <h1>Rejestracja</h1>
      <FormRegister onSubmit={handleSubmit} />
    
    </div>
  )
}

export default Registration