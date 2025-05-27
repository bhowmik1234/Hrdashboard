'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useEmployees } from '@/store/useEmployees'
import { User } from '@/types'

const defaultUser: User = {
  id: Date.now(),
  firstName: '',
  lastName: '',
  maidenName: '',
  age: 0,
  gender: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  birthDate: '',
  image: '',
  bloodGroup: '',
  height: 0,
  weight: 0,
  eyeColor: '',
  hair: { color: '', type: '' },
  ip: '',
  address: {
    address: '',
    city: '',
    state: '',
    stateCode: '',
    postalCode: '',
    country: '',
    coordinates: { lat: 0, lng: 0 },
  },
  university: '',
  bank: {
    cardExpire: '',
    cardNumber: '',
    cardType: '',
    currency: '',
    iban: '',
  },
  company: {
    department: '',
    name: '',
    title: '',
    address: {
      address: '',
      city: '',
      state: '',
      stateCode: '',
      postalCode: '',
      country: '',
      coordinates: { lat: 0, lng: 0 },
    },
  },
  ein: '',
  ssn: '',
  userAgent: '',
  crypto: {
    coin: '',
    wallet: '',
    network: '',
  },
  role: '',
}

export default function AddEmployeePage() {
  const [user, setUser] = useState<User>({ ...defaultUser })
  const [step, setStep] = useState<number>(1)
  const { addEmployee } = useEmployees()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  type NestedKeys = 'address' | 'company' | 'bank' | 'hair' | 'crypto';

  const handleNestedChange = (
    section: NestedKeys,
    field: string,
    value: string | number
  ) => {
    setUser((prev) => {
      const sectionObj = prev[section];
      if (typeof sectionObj === 'object' && sectionObj !== null) {
        return {
          ...prev,
          [section]: {
            ...sectionObj,
            [field]: value,
          },
        }
      }
      return prev; // fallback if not object (shouldn't happen)
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    user.id = Date.now()
    addEmployee(user)
    router.push('/')
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Add New Employee - Step {step}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              className="border p-2 rounded"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className="border p-2 rounded"
              value={user.lastName}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              className="border p-2 rounded"
              value={user.email}
              onChange={handleChange}
            />
            <input
              name="age"
              placeholder="Age"
              type="number"
              className="border p-2 rounded"
              value={user.age}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, age: Number(e.target.value) }))
              }
            />
            <input
              name="gender"
              placeholder="Gender"
              className="border p-2 rounded"
              value={user.gender}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              className="border p-2 rounded"
              value={user.phone}
              onChange={handleChange}
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <input
              placeholder="Address"
              className="border p-2 rounded"
              value={user.address.address}
              onChange={(e) =>
                handleNestedChange('address', 'address', e.target.value)
              }
            />
            <input
              placeholder="City"
              className="border p-2 rounded"
              value={user.address.city}
              onChange={(e) =>
                handleNestedChange('address', 'city', e.target.value)
              }
            />
            <input
              placeholder="Company Name"
              className="border p-2 rounded"
              value={user.company.name}
              onChange={(e) =>
                handleNestedChange('company', 'name', e.target.value)
              }
            />
            <input
              placeholder="Bank IBAN"
              className="border p-2 rounded"
              value={user.bank.iban}
              onChange={(e) =>
                handleNestedChange('bank', 'iban', e.target.value)
              }
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Hair Color"
              className="border p-2 rounded"
              value={user.hair.color}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  hair: { ...prev.hair, color: e.target.value },
                }))
              }
            />
            <input
              placeholder="Crypto Wallet"
              className="border p-2 rounded"
              value={user.crypto.wallet}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  crypto: { ...prev.crypto, wallet: e.target.value },
                }))
              }
            />
            <input
              placeholder="Role"
              className="border p-2 rounded"
              value={user.role}
              onChange={(e) =>
                setUser((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
            />
          </div>


            <button
              type="submit"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>


      </form>
    </main>
  )
}
