import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import './FormPayment.css'
import { useEffect } from 'react'
export const FormPayment = ({ onSubmit, amount }) => {
  const schema = yup.object().shape({
    amount: yup.string(),
    cardNumber: yup
      .string()
      .matches(
        /^(?:\d{4} ){3}\d{4}$/,
        'Invalid credit card number format (e.g., 1234 5678 9012 3456)'
      )
      .required('Credit card number is required'),
    expiryDate: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/20[2-9][0-9]$/,
        'Invalid date format (e.g., 12/2023)'
      )
      .test(
        'expirationDate',
        'Year must not be less than the current year',
        function (value) {
          if (!value) return true // Skip validation if the field is empty
          const currentYear = new Date().getFullYear()
          const selectedYear = parseInt(value.split('/')[1])
          return selectedYear >= currentYear
        }
      )
      .required('Expiration date is required'),
    cvv: yup
      .string()
      .matches(/^\d{3}$/, 'Invalid CVV format (must be 3 digits)')
      .required('CVV is required'),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        amount: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      })
    }
  }, [formState, reset])

  return (
    <form
      className='form-payment'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='wrapper-input'>
        <label htmlFor='cardNumber'>Do zapłaty</label>
        <input
          type='text'
          value={amount}
          {...register('amount')}
        />
        <p>{errors.amount?.message}</p>
      </div>

      <div className='wrapper-input'>
        <label htmlFor='cardNumber'>Numer Karty</label>
        <input
          type='text'
          placeholder='1234 5678 9012 3456'
          {...register('cardNumber')}
        />
        <p>{errors.cardNumber?.message}</p>
      </div>
      <div className='wrapper-input'>
        <label htmlFor='expiryDate'>Data Ważności</label>
        <input
          type='text'
          placeholder='MM/YYYY'
          {...register('expiryDate')}
        />
        <p>{errors.expiryDate?.message}</p>
      </div>

      <div className='wrapper-input'>
        <label htmlFor='cvv'>CVV</label>
        <input
          type='text'
          placeholder='123'
          {...register('cvv')}
        />
        <p>{errors.cvv?.message}</p>
      </div>

      <div className='wrapper-input'>
        <input
          type='submit'
          value='Płacę'
          
        />
      </div>
    </form>
  )
}
