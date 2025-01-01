import { useState } from 'react'
/*
interface fetchCallback {
  callbackFn : (par : callbackParams) => callbackReturnValue
}
type callbackParams = String | null 

interface fnInterface {
  fn: (fnParams : callbackParams) => null
}

interface callbackReturnValue {
  data?: String,
  loading: boolean
  error: String
  fn: (fnParams : callbackParams) => null
}
*/

interface CallbackFn<T> {
  (params: string | null): Promise<T>;
}

interface UseFetchResult<T> {
  data?: T | undefined;
  loading: boolean;
  error: string | null;
  fn: (params: string | null) => void;
}

  const useFetch = <T>(callback: CallbackFn<T>): UseFetchResult<T> => {
  // const [data, setData] = useState(undefined)
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fn = async (params: string | null) => {
    setLoading(true)
    setError(null)

    try{
        const response = await callback(params)
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