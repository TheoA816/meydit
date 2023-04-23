interface job {
  clothing: string,
  material: string,
  budget?: number,
  count: number,
  desc: string,
  contact: Contact
}

interface Contact {
  email: string,
  phone: string,
  city: string,
  country: string,
  zip: number
}