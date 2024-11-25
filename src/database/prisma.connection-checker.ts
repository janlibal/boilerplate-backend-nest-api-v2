import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  errorFormat: 'minimal', // For cleaner error messages
  log: ['query', 'info', 'warn', 'error'], // Optional logging for debugging
})

export async function connectWithRetry() {
  let retries = 10 // Number of retries before failing
  let delay = 5000 // Delay between retries in milliseconds

  while (retries > 0) {
    try {
      await prisma.$connect()
      console.log('Connected to Postgres')
      return
    } catch (error) {
      console.error('Database connection failed', error.message)
      retries -= 1

      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`)
        await new Promise((resolve) => setTimeout(resolve, delay)) // Wait before retrying
      } else {
        console.error(
          'Failed to connect to the database after multiple retries. Closing down server',
        )
        process.exit(1) // Exit the application or take appropriate action
      }
    }
  }
}

export async function keepAliveCheck() {
  let interval = 60000 // 60 seconds interval (adjust as needed)

  setInterval(async () => {
    try {
      console.log('Regular db connection check:')
      await prisma.$queryRaw`SELECT 1` // Simple query to check if the connection is alive
      console.log('Connection is alive!')
    } catch (error) {
      console.error(
        'Connection lost, attempting to reconnect...',
        error.message,
      )
      try {
        await prisma.$disconnect() // Disconnect if the connection is broken
        await connectWithRetry() // Attempt to reconnect
      } catch (reconnectError) {
        console.error('Reconnect failed', reconnectError.message)
      }
    }
  }, interval)
}
