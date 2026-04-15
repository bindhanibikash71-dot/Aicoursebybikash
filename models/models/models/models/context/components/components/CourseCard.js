javascript
'use client'

import Link from 'next/link'

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
            {course.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{course.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{course.rating || 4.5}</span>
            </div>
            <span className="text-2xl font-bold text-red-600">₹{course.price}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---
