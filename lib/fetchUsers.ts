import { User } from '@/types'
export const mockUserDetails: Record<string | number, User> = {}

export async function fetchUserById(id: string): Promise<User[]> {
  try {
    const res = await fetch('https://dummyjson.com/users?limit=40')
    if (!res.ok) throw new Error('Network response not ok')

    const data = await res.json()

    const users: User[] = data.users.map((user: any) => ({
      id: user.id,
      firstName: user.firstName,
      username: user.username || user.firstName.toLowerCase() + user.lastName.toLowerCase(),
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      age: user.age,
      address: {
        address: user.address?.address || '',
        city: user.address?.city || '',
        state: user.address?.state || '',
        postalCode: user.address?.postalCode || '',
        country: user.address?.country || '',
      },
      company: {
        department: user.company?.department || 'General',
        title: user.company?.title || '',
        country: user.company?.country || 'Unknown',
        address: {
          address: user.company?.address?.address || '',  
          city: user.company?.address?.city || '',
          state: user.company?.address?.state || '',
          postalCode: user.company?.address?.postalCode || '',
          country: user.company?.address?.country || '',
          coordinates: {
            lat: user.company?.address?.coordinates?.lat || 0,
            lng: user.company?.address?.coordinates?.lng || 0,  
          },
        },
      },
      bio: 'Mock bio for user', 
      performanceHistory: [],
      projects: [], 
      role: user.company?.title || 'Employee',
      image: user.image || '', 
      university: user.university || '',
      bloodGroup: user.bloodGroup || '',
      birthDate: user.birthDate || '',
      height: user.height || 0,
      weight: user.weight || 0,
      eyeColor: user.eyeColor || '',
      hair: {
        color: user.hair?.color || '',
        type: user.hair?.type || '',
      },
      bank: {
        cardType: user.bank?.cardType || '',
        cardNumber: user.bank?.cardNumber || '',
        cardExpire: user.bank?.cardExpire || '',
        iban: user.bank?.iban || '',
        currency: user.bank?.currency || 'USD',
      },
      crypto: {
        wallet: user.crypto?.wallet || '',
        network: user.crypto?.network || '',
      },
      ssn: user.ssn || '',
      ein: user.ein || '',
      userAgent: user.userAgent || '',
      currency: {
        name: user.bank?.currency || 'USD',
        symbol: user.bank?.currency || '$',
      },
      gender: user.gender || 'Not specified',
      ip: user.ip || '',
      rating: Math.floor(Math.random() * 5) + 1,

  
    }))

    return id === 'all' ? users : users.filter((user) => user.id.toString() === id)
  } catch (error) {
    console.error('fetchUserById error:', error)
    return []
  }
}
