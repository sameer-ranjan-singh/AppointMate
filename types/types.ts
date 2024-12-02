
export type formValues = {
    username : string | null | undefined
  }

export type Username = string
export type ReturnTypeCallbackFn = {success:boolean | undefined}
export type CallbackFn = (parm1:Username) => Promise<ReturnTypeCallbackFn> 