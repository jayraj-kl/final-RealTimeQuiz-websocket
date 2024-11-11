import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
      }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate()) 
  try {
    const { email, phoneNumber, password } = await c.req.json()

    // needs to be done in zod
    // if (!email || !password || phoneNumber.length !== 10) {
    //   return c.json({ error: 'Invalid input data' }, 400)
    // }
    // also need bycrypt for password hashing
    
    const existingUser = await prisma.user.findUnique({
        where: { email },
      })
      if (existingUser) {
        return c.json({ error: 'Email linked to another account' }, 400)
      }
    const newUser = await prisma.user.create({
      data: {
        email,
        phoneNumber,
        password,
      },
    })

    return c.json(newUser.id, 201)
  } catch (error) {
    console.error('Error adding user:', error)
    return c.json({ error: 'Error adding user' }, 500)
  }
})

userRouter.post('/google-signup', async (c) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
  try {
    const { email } = await c.req.json()

    // needs to be done in zod
    // if (!email) {
    //   return c.json({ error: 'Invalid input data' }, 400)
    // }

    const existingUser = await prisma.googleUser.findUnique({
      where: { email },
    })
    if (existingUser) {
      return c.json({ error: 'Email linked to another account' }, 400)
    }
    const user = await prisma.googleUser.create({
      data: {
        email,
      },
    })

    return c.json(user.id, 201)
  } catch (error) {
    console.error('Error signing up with Google:', error)
    return c.json({ error: 'Error signing up with Google' }, 500)
  }
});

userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
    try {
      const { email, password } = await c.req.json()

      // needs to be done in zod
    //   if (!email || !password) {
    //     return c.json({ error: 'Invalid input data' }, 400)
    //   }

      const user = await prisma.user.findUnique({
        where: {
          email,
          password,
        },
      })
      if (!user) {
        c.status(403)
        return c.json({
          message: 'unauthorized access',
        })
      }

      return c.json({
        id: user.id,
      }, 200)
    } catch (error) {
      console.error('Error adding user:', error)
      return c.json({ error: 'Error adding user' }, 500)
    }
  })

  userRouter.put('/update', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
    try {
      const { email, name } = await c.req.json()

      // needs to be done in zod
      // if (!email || !name || !phoneNumber || !password) {
      //   return c.json({ error: 'Invalid input data' }, 400)
      // }

      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          name
        },
      })

      return c.json(updatedUser.id, 200)
    } catch (error) {
      console.error('Error updating user:', error)
      return c.json({ error: 'Error updating user' }, 500)
    }
  });

  userRouter.put('/update-points', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate())
    try {
      const { id, points } = await c.req.json()

      // needs to be done in zod
      // if (!email || !points) {
      //   return c.json({ error: 'Invalid input data' }, 400)
      // }

      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
          points
        },
      })

      return c.json(updatedUser.id, 200)
    } catch (error) {
      console.error('Error updating user:', error)
      return c.json({ error: 'Error updating user' }, 500)
    }
  });