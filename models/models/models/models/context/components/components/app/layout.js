javascript
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MYFOOD ACADEMY',
  description: 'Learn cooking from professionals',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  )
}
```

---
