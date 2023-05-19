import { useMetamask } from '@thirdweb-dev/react'
import React from 'react'

function Login() {
    const connectWithMetamask = useMetamask();

  return (
    <div className='bg-[#091B18] min-h-screen flex flex-col
    items-center justify-center text-center'>
        <div className='flex flex-col items-center mb-10'>
            
            <h1 className='text-6xl text-white font-bold'>Roy Lottery</h1>
            <h2 className='text-white'>Get started by logging in with your MetaMask</h2>

            <button className='bg-white px-8 py-3 rounded-lg shadow-lg font-bold' onClick={() => connectWithMetamask()}>Connect Metamask</button>
        </div>
    </div>
  )
}

export default Login