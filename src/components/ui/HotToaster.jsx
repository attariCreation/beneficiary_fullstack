import React from 'react'
import { Toaster } from 'react-hot-toast';
const HotToaster = () => {
  return (
    <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={8}
    containerClassName=""
    containerStyle={{}}
    toastOptions={{
      // Define default options
      className: '',
      duration: 5000,
      removeDelay: 1000,
      style: {
        background: '#363636',
        color: '#fff',
      },
  
      // Default options for specific types
      success: {
        duration: 3000,
        iconTheme: {
          primary: 'green',
          secondary: 'black',
        },
      },
    }}
  />
  )
}

export default HotToaster