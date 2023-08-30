import { useState, useEffect } from 'react';
import { saveStorage, saveStorageSingle, fetchStorage, deleteStorage } from './../../helpers/localStorage'
import { useNavigate } from 'react-router-dom'
import './Cart.css'

const Cart = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = fetchStorage('carts');
    if (storedData) {
      setData(storedData)
    }
  }, []);
  return (
    <div className='cart'>
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
           <td><img src={el.image} alt="image" height={'40px'}/></td>
           <td>{el.title.slice(0,10)}</td>
           <td>{el.count}</td>
           <td>{el.price.toFixed(2)}</td>
           <td>{(el.price*el.count).toFixed(2)}</td>
           <td><button onClick={() => deleteCartItem(el.id)}>🗑️</button></td>
         </tr>
         
        ))}
  </tbody>
      </table>
      <button onClick={() => {deleteStorage('carts');navigate('/')}}>Usuń Koszyk</button>
    </div>
  )
}

export default Cart