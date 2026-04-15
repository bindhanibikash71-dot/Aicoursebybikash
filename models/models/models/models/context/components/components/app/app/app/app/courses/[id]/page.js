javascript
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Navbar from '@/components/Navbar'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function CourseDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = user ? `/api/courses/${id}?userId=${user._id}` : `/api/courses/${id}`
    axios.get(url).then(res => setCourse(res.data)).finally(() => setLoading(false))
  }, [id, user])

  const handleBuy = async () => {
    if (!user) {
      toast.error('Please login first')
      return
    }

    try {
      const { data } = await axios.post('/api/orders', {
        courseId: id,
        userId: user._id
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: 'INR',
        name: 'MYFOOD ACADEMY',
        description: course.title,
        order_id: data.id,
        handler: async (response) => {
          try {
            await axios.put('/api/orders', {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature
            })
            toast.success('Payment successful!')
            window.location.href = '/my-courses'
          } catch (error) {
            toast.error('Payment verification failed')
          }
        },
        prefill: {
          name: user.name,
          email: user.email
        },
        theme: { color: '#DC2626' }
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      toast.error('Failed to initiate payment')
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div>
        <Navbar />
        <div className="text-center py-20">Course not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-6">{course.description}</p>
            
            {course.previewVideo && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Preview Video</h2>
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
                  <iframe
                    src={course.previewVideo}
                    className="absolute top-0 left-0 w-full h-full"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {course.hasAccess && course.content && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Course Content</h2>
                {course.content.videos?.map((video, i) => (
                  <div key={i} className="bg-white p-4 rounded-lg mb-2">
                    <a href={video.url} target="_blank" className="text-blue-600 hover:underline">
                      ▶ {video.title}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
              <img src={course.thumbnail} alt={course.title} className="w-full rounded-lg mb-4" />
              <div className="text-3xl font-bold text-red-600 mb-4">₹{course.price}</div>
              
              {course.hasAccess ? (
                <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-center font-semibold">
                  ✓ You own this course
                </div>
              ) : (
                <button
                  onClick={handleBuy}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                >
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

