import React from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import './Card.css'

const Card = ({
  handleAddToCart,
  image,
  title,
  price,
  quantity,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className='card'>
      <div className='card-img'>
        <img
          src={image}
          alt='contry'
        />
      </div>
      <div className='title'>{title.slice(0, 20)}</div>
      <div className='price'>
        cena: <span>{price.toFixed(2)} </span>PLN
      </div>
      <div className='counter'>
        <button onClick={handleDecrement}>
          {' '}
          <FaMinus />
        </button>
        <div className='count'>{quantity}</div>
        <button onClick={handleIncrement}>
          {' '}
          <FaPlus />
        </button>
      </div>
      <div className='btn'>
        <button onClick={handleAddToCart}>Dodaj do koszyka</button>
      </div>
    </div>
  )
}

export default Card
