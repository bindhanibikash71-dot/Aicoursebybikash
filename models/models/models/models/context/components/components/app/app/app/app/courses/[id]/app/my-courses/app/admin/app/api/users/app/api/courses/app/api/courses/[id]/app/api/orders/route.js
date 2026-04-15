javascript
import connectDB from '@/lib/db'
import Order from '@/models/Order'
import Course from '@/models/Course'
import Purchase from '@/models/Purchase'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    await connectDB()
    const { courseId, userId } = await request.json()

    const course = await Course.findById(courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET
    })

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`
    })

    await Order.create({
      orderId: order.id,
      userId,
      courseId,
      amount: course.price
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await connectDB()
    const { orderId, paymentId, signature } = await request.json()

    const generated = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(orderId + '|' + paymentId)
      .digest('hex')

    if (generated !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    const order = await Order.findOneAndUpdate(
      { orderId },
      { status: 'paid', paymentId }
    )

    await Purchase.create({
      userId: order.userId,
      courseId: order.courseId,
      orderId: order._id
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---
