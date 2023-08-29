import './Home.css'
import { useFetch } from './../../helper/useFetch'
import Card from '../../components/Card/Card'
import { ErrorMessage } from './../../components/ErrorMessage/ErrorMessage';
import { FullPageLayout } from './../../components/FullPageLayout/FullPageLayout';
import { Loading } from './../../components/Loading/Loading';

const Home = () => {
  const { data, pending, error } = useFetch('https://fakestoreapi.com/products')
  console.log(data)
  return (
    <div className='home'>
      {pending && <FullPageLayout>
        <Loading/>
        </FullPageLayout>}
      {error && <FullPageLayout>
        <ErrorMessage error={error} />
        </FullPageLayout> }
       
      <h1>Zestaw Produktów</h1>
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
