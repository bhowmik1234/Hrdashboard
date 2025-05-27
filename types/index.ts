export interface Address {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface Bank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

export interface Crypto {
  coin: string
  wallet: string
  network: string
}

export interface Hair {
  color: string
  type: string
}

export interface User {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: Hair
  ip: string
  address: Address
  university: string
  bank: Bank
  company: Company
  ein: string
  ssn: string
  userAgent: string
  crypto: Crypto
  role: string


  rating?: number
  bio?: string
  performanceHistory?: string[]
  projects?: string[]
}









