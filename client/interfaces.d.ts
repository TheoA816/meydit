export interface Job {
  id?: number,
  clothing: string,
  material: string,
  budget?: number,
  images: string[],
  descr?: string,
  contact: number,
  // while addr is stored as a fk in db, we convert it in be to this format for existing addresses
  // for inserting new jobs, we just fill in addr from user input
  addr: {
    id?: number,
    city: string,
    country: string,
    state: string,
    zipcode: number
  }
}

export interface User {
  id: number,
  email: string,
  profpic: string,
  name: string
};

export interface myFile {
  file: File
  url: string
}