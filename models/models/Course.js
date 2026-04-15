javascript
import mongoose from 'mongoose'

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  previewVideo: String,
  rating: { type: Number, default: 4.5 },
  content: {
    videos: [{ title: String, url: String }],
    links: [{ title: String, url: String }],
    apps: [{ title: String, platform: String, downloadUrl: String }],
    pdfs: [{ title: String, url: String }]
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Course || mongoose.model('Course', CourseSchema)
```

---

