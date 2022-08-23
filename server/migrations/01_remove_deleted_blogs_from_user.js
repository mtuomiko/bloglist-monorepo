// still completely manual

const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '../../.env' })

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

async function main() {
  await client.connect()

  const db = client.db()
  const usersCollection = db.collection('users')
  const blogsCollection = db.collection('blogs')

  const existingBlogIds = []
  const blogCursor = blogsCollection.find({})
  await blogCursor.forEach(blog => existingBlogIds.push(blog._id))

  await usersCollection.updateMany(
    {},
    {
      $pull: {
        blogs: {
          $nin: existingBlogIds
        }
      }
    }
  )
  await client.close()
}

void main()
