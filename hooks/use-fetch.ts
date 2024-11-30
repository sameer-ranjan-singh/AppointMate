import React, { useState } from 'react'

 type CallbackFn = {
    cb :(arg1:any) => {arg2:boolean}  
 }
 
const useFetch = (callback) => {
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fn = async (...args) => {
    setLoading(true)
    setError(null)

    try{
        const response = await callback(...args)
        setData(response)
        setError(null)
    }catch(error){
        setError(error)
    }finally{
        setLoading(false)
    }
  }
  return {data, loading, error , fn}
}

export default useFetch