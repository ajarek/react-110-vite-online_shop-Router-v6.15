import { useState, useEffect,useContext } from 'react'
import { AppContext } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../components/Card/Card'
import { ErrorMessage } from './../../components/ErrorMessage/ErrorMessage'
import { FullPageLayout } from './../../components/FullPageLayout/FullPageLayout'
import { Loading } from './../../components/Loading/Loading'
import { saveStorage, saveStorageSingle, fetchStorage, deleteStorage } from './../../helpers/localStorage'
import './Home.css'
const URL1='https://fakestoreapi.com/products'
const URL2='https://dummyjson.com/products/'
const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { dataLength, setDataLength } = useContext(AppContext)
  
  useEffect(() => {
    fetch(URL2)
      .then((response) => response.json())
      .then((data) => setItems(data.products.map((item) => ({ ...item, count: 1 }))))
      .catch((error) => setError(error))
      .finally(setLoading(false))
  }, [])

  const handleIncrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, count: item.count + 1 }
        }
        return item
      })
    )
  }
  const handleDecrement = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, count: item.count <= 1 ? 1 : item.count - 1 }
        }
        return item
      })
    )
  }
  const handleAddToCart = (Id) => {
    const storeData=fetchStorage('carts')
    const duble=storeData?.find(el=>el.id===Id)
    if(duble){
      notifyWarning()
        return
      } 
    const itemCart = items.find((item) => item.id === Id)
    saveStorage(itemCart, 'carts')
    notifySuccess()
    setDataLength(dataLength + 1)
   
  
  }
  const notifySuccess = () => {
  toast.success('dodano do koszyka!', {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    });
  }
  const notifyWarning = () => {
    toast.warn('Produkt był już dodany do koszyka!', {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
  return (
    <div className='home'>
     <ToastContainer
position="top-center"
autoClose={1000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>

      {loading && (
        <FullPageLayout>
          <Loading />
        </FullPageLayout>
      )}
      {error && (
        <FullPageLayout>
          <ErrorMessage error={error} />
        </FullPageLayout>
      )}

      <h1>Zestaw Produktów</h1>
      <div className='home-wrapper'>
        {items &&
          items.map((item) => (
            <Card
              key={item.id}
              image={item.images[0]}
              title={item.title}
              price={item.price*4}
              quantity={item.count}
              handleIncrement={() => handleIncrement(item.id)}
              handleDecrement={() => handleDecrement(item.id)}
              handleAddToCart={()=> handleAddToCart(item.id)}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
