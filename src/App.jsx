import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { createContext, useState } from 'react'
export const AppContext = createContext()

import Main from './layouts/Main/Main'
import Home from './pages/Home/Home'
import Error from './pages/Error/Error'
import Cart from './pages/Cart/Cart';

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

      
    ],
  },
])
function App() {
  const [dataLength, setDataLength] = useState(0) 
  return (
    <div className='App'>
      <AppContext.Provider value={{dataLength, setDataLength}}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </div>
  )
}

export default App
