import { useEffect, useState } from 'react'
import Card from '../../components/Card/Card'
import { ErrorMessage } from './../../components/ErrorMessage/ErrorMessage'
import { FullPageLayout } from './../../components/FullPageLayout/FullPageLayout'
import { Loading } from './../../components/Loading/Loading'
import { saveStorage, saveStorageSingle, fetchStorage, deleteStorage } from './../../helpers/localStorage'
import './Home.css'

const Home = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => setItems(data.map((item) => ({ ...item, count: 1 }))))
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
    const itemCart = items.find((item) => item.id === Id)
    saveStorage(itemCart, 'carts')
    alert('Produkt został dodany do koszyka')
  }

  return (
    <div className='home'>
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
              image={item.image}
              title={item.title}
              price={item.price}
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
