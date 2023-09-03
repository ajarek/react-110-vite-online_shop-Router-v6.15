import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useState } from 'react'
export const AppContext = createContext()

import Main from './layouts/Main/Main'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart';
import Payment from './pages/Payment/Payment'
import Registration from './pages/Registration/Registration'
import Error from './pages/Error/Error'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path:'/koszyk',
        element: <Cart />,
        errorElement: <Error />,
      },
      {
        path:'/oplata',
        element: <Payment />,
        errorElement: <Error />,
      },
      {
        path:'/rejestracja',
        element: <Registration />,
        errorElement: <Error />,
      },

      
    ],
  },
])
function App() {
  const [dataLength, setDataLength] = useState(0) 
  const [allPayment, setAllPayment] = useState(0) 
  return (
    <div className='App'>
      <AppContext.Provider value={{dataLength, setDataLength,allPayment, setAllPayment}}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  )
}

export default App
