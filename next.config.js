javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'img.youtube.com']
  },
  experimental: {
    serverComponentsExternalPackages: ['mongoose']
  }
}
module.exports = nextConfig
```

---
