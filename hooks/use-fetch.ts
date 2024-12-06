import { useState } from 'react'
import { Username, ReturnTypeCallbackFn, CallbackFn } from '@/types/types'

//Todo : Generics for useFetch params
//  const useFetch = (callback: CallbackFn) => {
 const useFetch = (callback: any) => {
  // const [data, setData] = useState<ReturnTypeCallbackFn>({success:undefined})
  const [data, setData] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // const fn = async (username: Username) => {
  const fn = async (...args:any[]) => {
    setLoading(true)
    setError(null)

    try{
        // const response = await callback(username)
        const response = await callback(...args)
        setData(response)
        setError(null)
    }catch(error:any){
      console.log("error :", error)
        setError(error)
    }finally{
        setLoading(false)
    }
  }
  return {data, loading, error , fn}
}

export default useFetch