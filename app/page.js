'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import CourseCard from '@/components/CourseCard'
import axios from 'axios'

export default function HomePage() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('/api/courses').then(res => setCourses(res.data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Master the Art of Cooking</h1>
          <p className="text-xl mb-8">Learn from professional chefs with our premium courses</p>
          <a href="#courses" className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-red-50">Explore Courses</a>
        </div>
      </div>
    </div>
  )
}
