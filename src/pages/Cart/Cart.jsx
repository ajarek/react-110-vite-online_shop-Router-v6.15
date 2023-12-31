import { useEffect, useContext } from 'react'
import { AppContext } from '../../App'
import { MdDeleteForever } from 'react-icons/md'
import {
  saveStorageSingle,
  fetchStorage,
  deleteStorage,
} from './../../helpers/localStorage'
import { Link, useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const { dataLength, setDataLength, setAllPayment, data, setData, setDataPersonal } =
    useContext(AppContext)
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
          <h1 className='cart-your'>Twój Koszyk</h1>
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
                      src={el.images[0]}
                      alt='image'
                      height={'40px'}
                    />
                  </td>
                  <td>{el.title.slice(0, 10)}</td>
                  <td>{el.count}</td>
                  <td>{el.price.toFixed(2)}</td>
                  <td>{(el.price * el.count).toFixed(2)}</td>
                  <td>
                    <button onClick={() => deleteCartItem(el.id)}>
                      <MdDeleteForever
                        size={30}
                        color='red'
                      />
                    </button>
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
                  deleteStorage('admin-list')
                  setDataPersonal(null)
                  setDataLength(0)
                }}
              >
                Usuń Koszyk
              </button>
            </div>
            <div className='btn-payment'>
              <Link
                className='btn-payment-link'
                to={'/rejestracja'}
                onClick={() =>
                  setAllPayment(
                    Object.values(data).reduce(
                      (acc, el) => acc + el.price * el.count,
                      0
                    )
                  )
                }
              >
                Płacę:
                <span>
                  {Object.values(data)
                    .reduce((acc, el) => acc + el.price * el.count, 0)
                    .toFixed(2)}{' '}
                  PLN
                </span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
