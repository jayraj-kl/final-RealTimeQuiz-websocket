import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

export const adminRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
      }
}>();

adminRouter.post('/createQuiz', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate()) 
    try {
        const { roomId } = await c.req.json()
        
        const newQuiz = await prisma.quiz.create({
            data: {
                roomId,
            },
        })
    
        return c.json(newQuiz.id, 201)

    } catch (error) {
      console.error('Error adding user:', error)
      return c.json({ error: 'Error adding user' }, 500)
    }
  })

  adminRouter.post('/createProblem', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    try {
        const { roomId, title, description, answer, options } = await c.req.json();

        // Find the quiz by roomId
        const quiz = await prisma.quiz.findFirst({
            where: { roomId },
        });

        if (!quiz) {
            return c.json({ error: 'Quiz not found' }, 404);
        }
        const quizId = quiz.id;

        // Create the problem and link it to the quiz
        const newProblem = await prisma.problem.create({
            data: {
                title,
                description,
                answer,
                quizId: quizId,
                options: {
                    create: options.map((option: { optionId: string, title: string }) => ({
                        optionId: option.optionId,
                        title: option.title,
                    })),
                },
            },
        });

        return c.json({ problemId: newProblem.id }, 201);
    } catch (error) {
        console.error('Error adding problem:', error);
        return c.json({ error: 'Error adding problem' }, 500);
    }
});
