import './Registration.css'
import { useEffect, useContext } from 'react'
import { AppContext } from '../../App'
import { FormRegister } from './../../components/FormRegister/FormRegister'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
  const {
    data,
    dataPersonal,
    setDataPersonal,
  } = useContext(AppContext)
  const navigate = useNavigate()

  const handleSubmit = (personalData) => {
    const newDataPersonal = {
      name: personalData.name,
      email: personalData.email,
      adres: personalData.adres,
      phone: personalData.phone,
      data: [...data],
    }
    setDataPersonal(newDataPersonal)
  }
  useEffect(() => {
    if (dataPersonal) {
      notifySuccess()

      setTimeout(() => {
        navigate('/oplata')
      }, 2000)
    }
  }, [dataPersonal])

  const notifySuccess = () => {
    toast.success(` ${dataPersonal.name}! Dziękujemy za rejestracje!`, {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  }

  return (
    <div className='registration'>
      <ToastContainer
        position='top-center'
        autoClose={1000}
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
