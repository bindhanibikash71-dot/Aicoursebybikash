javascript
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AdminPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const [courses, setCourses] = useState([])
  const [stats, setStats] = useState({ totalUsers: 0, totalSales: 0, totalRevenue: 0 })
  const [form, setForm] = useState({
    title: '', description: '', price: '', category: '', thumbnail: '', previewVideo: ''
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push('/')
      return
    }
    fetchData()
  }, [isAdmin])

  const fetchData = async () => {
    const [coursesRes, statsRes] = await Promise.all([
      axios.get('/api/courses'),
      axios.get('/api/admin/stats')
    ])
    setCourses(coursesRes.data)
    setStats(statsRes.data)
  }

  const addCourse = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/courses', { ...form, price: parseFloat(form.price) })
      toast.success('Course added!')
      setForm({ title: '', description: '', price: '', category: '', thumbnail: '', previewVideo: '' })
      fetchData()
    } catch (error) {
      toast.error('Failed to add course')
    }
  }

  const deleteCourse = async (id) => {
    if (!confirm('Delete this course?')) return
    try {
      await axios.delete(`/api/courses/${id}`)
      toast.success('Course deleted!')
      fetchData()
    } catch (error) {
      toast.error('Failed to delete course')
    }
  }

  if (!isAdmin) return null

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-red-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span className="text-2xl font-bold">Admin Panel</span>
          <button onClick={() => router.push('/')} className="bg-red-700 px-4 py-2 rounded">
            View Site
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600">Total Users</h3>
            <p className="text-3xl font-bold">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600">Total Sales</h3>
            <p className="text-3xl font-bold">{stats.totalSales}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600">Revenue</h3>
            <p className="text-3xl font-bold">₹{stats.totalRevenue}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Add New Course</h2>
          <form onSubmit={addCourse} className="grid md:grid-cols-2 gap-4">
            <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="border p-2 rounded" required />
            <input placeholder="Price" type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="border p-2 rounded" required />
            <input placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="border p-2 rounded" required />
            <input placeholder="Thumbnail URL" value={form.thumbnail} onChange={e => setForm({...form, thumbnail: e.target.value})} className="border p-2 rounded" required />
            <input placeholder="Preview Video URL (optional)" value={form.previewVideo} onChange={e => setForm({...form, previewVideo: e.target.value})} className="border p-2 rounded" />
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="border p-2 rounded md:col-span-2" rows="3" required />
            <button type="submit" className="bg-red-600 text-white p-2 rounded md:col-span-2 hover:bg-red-700">Add Course</button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow">
          <h2 className="text-xl font-bold p-6 border-b">All Courses</h2>
          <div className="divide-y">
            {courses.map(course => (
              <div key={course._id} className="p-6 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={course.thumbnail} alt={course.title} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{course.title}</h3>
                    <p className="text-gray-600">₹{course.price} • {course.category}</p>
                  </div>
                </div>
                <button onClick={() => deleteCourse(course._id)} className="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
```

---
