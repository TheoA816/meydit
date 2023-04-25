export interface Job {
  id?: number,
  clothing: string,
  material: string,
  budget?: number,
  descr?: string,
  contact: number,
  addr: {
    id?: number,
    city: string,
    country: string,
    state: string,
    zipcode: number
  }
}