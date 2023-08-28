import React from 'react'
import './Card.css'
const Card = ({handleAddToCart, image, title, price }) => {
  
  return (
    <div
      className='card'
     
    >
      
        <div className='card-img'>
          <img
            src={image}
            alt='contry'
          />      
        </div>
        <div className='title'>{title}</div>
        <div className='price' >cena: <span>{price.toFixed(2)} </span>PLN</div>
        <div className='btn'>
          <button onClick={handleAddToCart}>Dodaj do koszyka</button>
        </div>
     
    </div>
  )
}

export default Card
