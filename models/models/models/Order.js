javascript
import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
```

---
