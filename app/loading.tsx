import React from 'react'
import Image from 'next/image'

const LoadingPage = () => {
  return (
    <div className='h-[100vh] w-[100vw] grid place-items-center bg'>
      <Image
      src={'/loading.gif'}
      width={200}
      height={200}
      alt='loading'
      />
    </div>
  )
}

export default LoadingPage
