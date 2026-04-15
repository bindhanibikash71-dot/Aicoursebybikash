javascript
'use client'

import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, login, logout, isAdmin } = useAuth()

  return (
    <nav className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold">
            🍳 MYFOOD <span className="font-light">ACADEMY</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/my-courses" className="hover:text-red-200">
                  My Courses
                </Link>
                {isAdmin && (
                  <Link href="/admin" className="hover:text-red-200">
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  {user.photoURL && (
                    <img src={user.photoURL} alt={user.name} className="w-8 h-8 rounded-full" />
                  )}
                  <span className="hidden sm:inline">{user.name}</span>
                  <button onClick={logout} className="bg-red-800 px-3 py-1 rounded hover:bg-red-900">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <button 
                onClick={login}
                className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-red-50"
              >
                Login with Google
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
```

---
