import { Outlet } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
import './Main.css'

const Main = () => {
  return (
    <div className='main-layout'>
      <Nav />

      <Outlet />
    </div>
  )
}

export default Main
