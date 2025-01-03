
export type formValues = {
    username : string | null | undefined
  }

// export type Username = string | null | undefined
export type Username = string | undefined

export type ReturnTypeCallbackFn = {success:boolean | undefined}
export type CallbackFn = (parm1:Username) => Promise<ReturnTypeCallbackFn> 

export interface availabilityDataInterface {
  timeGap? : number
  day?: dayInterface
}
export interface dayInterface {
  isAvailable: boolean
  startTime: string
  endTime: string
}
type DAYS = "MONDAY" | 'TUESDAY' | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" 