import { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../App'
import {
  saveStorage,
  saveStorageSingle,
  fetchStorage,
  deleteStorage,
} from './../../helpers/localStorage'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const [data, setData] = useState({})
  const { dataLength, setDataLength } = useContext(AppContext)
  const navigate = useNavigate()
  useEffect(() => {
    const storedData = fetchStorage('carts')
    if (storedData) {
      setData(storedData)
    }
  }, [])

  const deleteCartItem = (id) => {
    const filteredData = Object.values(data).filter((el) => el.id !== id)
    setData(filteredData)
    saveStorageSingle(filteredData, 'carts')
    setDataLength(filteredData.length)
  }

  return (
    <div className='cart'>
      {dataLength === 0 ? (
        <div className='empty-cart'>
          <h1>Twój Koszyk jest pusty</h1>
          <button
            onClick={() => {
              navigate('/')
            }}
          >
            Powrót do sklepu
          </button>
        </div>
      ) : (
        <>
          <h1>Twój Koszyk</h1>
          <table>
            <thead>
              <tr>
                <th>Miniatura</th>
                <th>Nazwa</th>
                <th>Ilość</th>
                <th>Cena PLN</th>
                <th>Wartość PLN</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(data).map((el) => (
                <tr key={el.id}>
                  <td>
                    <img
                      src={el.image}
                      alt='image'
                      height={'40px'}
                    />
                  </td>
                  <td>{el.title.slice(0, 10)}</td>
                  <td>{el.count}</td>
                  <td>{el.price.toFixed(2)}</td>
                  <td>{(el.price * el.count).toFixed(2)}</td>
                  <td>
                    <button onClick={() => deleteCartItem(el.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='cart-wrapper'>
            <div className='btn-delete'>
              <button
                onClick={() => {
                  deleteStorage('carts')
                  setDataLength(0)
                 
                }}
              >
                Usuń Koszyk
              </button>
            </div>
            <div className='btn-payment'>
              <button
               
              >
               Płacę <span>
              {Object.values(data)
                .reduce((acc, el) => acc + el.price * el.count, 0)
                .toFixed(2)}{' '}PLN
                </span>
              </button>
            </div>
            
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
