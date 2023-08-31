import { useState, useEffect,useContext } from 'react'
import { AppContext } from '../../App'

import { Link } from 'react-router-dom'
import Hamburger from 'hamburger-react'

import './Nav.css'

const Nav = () => {
  const [isOpen, setOpen] = useState(false)
 
  const { dataLength, setDataLength } = useContext(AppContext)
  useEffect(() => {
    const storedData = localStorage.getItem('carts');
    if (storedData) {
      setDataLength(JSON.parse(storedData).length);
    }
  }, []);
  
  return (
    <nav className='nav'>
      <Link
        className='link link-logo'
        to={'/'}
      >
        <div className='img'>
         <img src="/favicon.png"  alt="logo" />
        </div>
        <h1> Sklep Online</h1>
      </Link>

      <ul className={!isOpen ? 'wrapper' : 'wrapper navbar-none'}>
        <Link
          className='link link-text'
          to={'/koszyk'}
        >
          🛒<sup>{dataLength}</sup>
        </Link>
        
      </ul>
     
    </nav>
  )
}

export default Nav
