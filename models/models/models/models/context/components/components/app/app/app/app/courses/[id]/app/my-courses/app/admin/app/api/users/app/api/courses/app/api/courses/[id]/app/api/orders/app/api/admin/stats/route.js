javascript
import connectDB from '@/lib/db'
import User from '@/models/User'
import Order from '@/models/Order'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()
    
    const totalUsers = await User.countDocuments()
    const totalSales = await Order.countDocuments({ status: 'paid' })
    const revenue = await Order.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])

    return NextResponse.json({
      totalUsers,
      totalSales,
      totalRevenue: revenue[0]?.total || 0
    })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

---
