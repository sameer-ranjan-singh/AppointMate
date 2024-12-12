import React, { Suspense } from 'react'

const layoutAvailability = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='mx-auto'>
      <Suspense fallback={<div>Lookingf for Availability...</div>}>
        {children}
      </Suspense>
    </div>
  )
}

export default layoutAvailability