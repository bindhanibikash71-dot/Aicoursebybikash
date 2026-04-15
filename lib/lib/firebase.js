javascript
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const config = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG || '{}')
const app = getApps().length ? getApps()[0] : initializeApp(config)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
```

---

