javascript
import connectDB from '@/lib/db'
import Course from '@/models/Course'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    const courses = await Course.find().sort({ createdAt: -1 })
    return NextResponse.json(courses)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await connectDB()
    const data = await request.json()
    const course = await Course.create(data)
    return NextResponse.json(course)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---
