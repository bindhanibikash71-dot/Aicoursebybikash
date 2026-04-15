javascript
import connectDB from '@/lib/db'
import Course from '@/models/Course'
import Purchase from '@/models/Purchase'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  try {
    await connectDB()
    const { id } = params
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    const course = await Course.findById(id)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    let hasAccess = false
    if (userId) {
      const purchase = await Purchase.findOne({ courseId: id, userId })
      hasAccess = !!purchase
    }

    const courseData = course.toObject()
    if (!hasAccess) courseData.content = null

    return NextResponse.json({ ...courseData, hasAccess })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB()
    await Course.findByIdAndDelete(params.id)
    return NextResponse.json({ message: 'Course deleted' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---
