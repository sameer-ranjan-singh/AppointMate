import { useState } from 'react'
import { Username, ReturnTypeCallbackFn, CallbackFn } from '@/types/types'

 const useFetch = (callback: CallbackFn) => {
  const [data, setData] = useState<ReturnTypeCallbackFn>({success:undefined})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fn = async (username: Username) => {
    setLoading(true)
    setError(null)

    try{
        const response = await callback(username)
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