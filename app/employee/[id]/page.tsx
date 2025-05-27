"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Tabs } from '@/components/Tabs'
import { User } from '@/types/index'
import useEmployees from '@/hooks/useEmployees'

const TABS = ['Overview', 'Projects', 'Feedback'] as const
type Tab = (typeof TABS)[number]

const EmployeeDetailsPage: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const id = pathname.split('/').pop() || ''
  console.log('Employee ID:', id)

  const [user, setUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('Overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const { employees, fetchAllEmployees, loading: storeLoading, error: storeError } = useEmployees()

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true)
      setError('')
      setUser(null)

      if (employees.length === 0) {
        await fetchAllEmployees()
      }

      const foundUser = employees.find(
        (user) => user.id === Number(id)
      )

      if (foundUser) {
        console.log('Found User:', foundUser)
        setUser(foundUser)
      } else {
        setError('User not found')
      }

      setLoading(false)
    }

    loadUser()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 flex items-center space-x-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="text-gray-200 font-medium">Loading employee details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-400 font-semibold mb-4">Error: {error}</p>
          <button
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white">
  <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
    {/* Header Section */}
    <section className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl p-10 text-center transition-all duration-300 hover:shadow-blue-900/40">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <img 
            src={user.image} 
            alt="Profile" 
            className="w-28 h-28 rounded-3xl object-cover border-4 border-gray-600 shadow-lg transition-transform hover:scale-105"
          />
          <span className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800 animate-pulse"></span>
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide">{user.firstName} {user.lastName}</h1>
          <span className="mt-2 inline-block px-4 py-1 bg-blue-800/60 text-blue-300 rounded-full text-sm font-medium border border-blue-600 shadow-md">
            {user.role ?? 'Employee'}
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium text-gray-300 text-left w-full">
          <div>Email: {user.email}</div>
          <div>Phone: {user.phone}</div>
          <div>Username: {user.username}</div>
          <div>Birth Date: {user.birthDate}</div>
          <div>Age: {user.age}</div>
          <div>Gender: {user.gender}</div>
          <div>Blood Group: {user.bloodGroup}</div>
          <div>Height: {user.height}</div>
          <div>Weight: {user.weight}</div>
          <div>Eye Color: {user.eyeColor}</div>
          <div>Hair Color: {user.hair?.color}</div>
          <div>Hair Type: {user.hair?.type}</div>
          <div>IP Address: {user.ip}</div>
          <div>University: {user.university}</div>
          <div>
  Company Address: {
    user.company?.address
      ? `${user.company.address.address}, ${user.company.address.city}, ${user.company.address.state}, ${user.company.address.postalCode}, ${user.company.address.country}`
      : 'Not Available'
  }
</div>
          <div>Department: {user.company?.department}</div>
          <div>Title: {user.company?.title}</div>
          <div>Address: {user.address?.address}, {user.address?.city}, {user.address?.state}, {user.address?.country}, {user.address?.postalCode}</div>
          <div>Bank: {user.bank?.cardType} - {user.bank?.cardNumber} (Exp: {user.bank?.cardExpire})</div>
          {/* <div>IBAN: {user.bank?.iban}</div> */}
          <div>Currency: {user.bank?.currency}</div>
          <div>Crypto Wallet: {user.crypto?.wallet} ({user.crypto?.coin} on {user.crypto?.network})</div>
          <div>SSN: {user.ssn}</div>
          <div>EIN: {user.ein}</div>
          <div>User Agent: {user.userAgent}</div>
        </div>
      </div>
    </section>

    {/* Tabs Section */}
    <section className="bg-gray-800 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-blue-900/40">
      <Tabs
        tabs={[...TABS]}
        activeTab={activeTab}
        onTabChange={(tab: string) => setActiveTab(tab as Tab)}
      />
      <div className="p-10">
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Overview Content Here</h3>
            <p className="text-gray-400">You can put summary data, performance metrics, or personal achievements here.</p>
          </div>
        )}
        {activeTab === 'Projects' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Project Details</h3>
            <p className="text-gray-400">Highlight recent or impactful projects contributed by the user.</p>
          </div>
        )}
        {activeTab === 'Feedback' && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Feedback Information</h3>
            <p className="text-gray-400">User reviews, peer feedback, or testimonials can be shown here.</p>
          </div>
        )}
      </div>
    </section>
  </main>
</div>


  )
}

export default EmployeeDetailsPage