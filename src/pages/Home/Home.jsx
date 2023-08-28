import './Home.css'
import { useFetch } from './../../helper/useFetch'
import Card from '../../components/Card/Card'

const Home = () => {
  const { data, pending, error } = useFetch('https://fakestoreapi.com/products')
  console.log(data)
  return (
    <div className='home'>
      <h1>Zestaw Produktów</h1>
      {pending && <div>Ładowanie... </div>}
      {error && <div>Błąd: {error}</div>}
      <div className='home-wrapper'>
        {data &&
          data.map((product) => (
            <Card
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
      </div>
    </div>
  )
}

export default Home
