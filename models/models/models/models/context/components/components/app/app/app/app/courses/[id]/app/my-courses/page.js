javascript
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import CourseCard from '@/components/CourseCard'
import axios from 'axios'
import Link from 'next/link'

export default function MyCoursesPage() {
  const { user } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      axios.get('/api/courses').then(async (res) => {
        const purchased = []
        for (const course of res.data) {
          const detail = await axios.get(`/api/courses/${course._id}?userId=${user._id}`)
          if (detail.data.hasAccess) purchased.push(course)
        }
        setCourses(purchased)
        setLoading(false)
      })
    }
  }, [user])

  if (!user) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20">
          Please login to view your courses
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">My Courses</h1>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No courses purchased yet.</p>
            <Link href="/" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

---
