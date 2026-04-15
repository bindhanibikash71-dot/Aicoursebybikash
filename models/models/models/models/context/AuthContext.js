javascript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '@/lib/firebase'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        try {
          const res = await axios.post('/api/users', {
            uid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName,
            photoURL: fbUser.photoURL
          })
          setUser(res.data)
        } catch (err) {
          console.error(err)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })
  }, [])

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success('Logged in!')
    } catch (err) {
      toast.error('Login failed')
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      toast.success('Logged out!')
    } catch (err) {
      toast.error('Logout failed')
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAdmin: user?.isAdmin || false
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---
