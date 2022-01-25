import mongoose from 'mongoose';

async function databaseSetUp() {
  const connected: boolean = await connectToDatabase();
  if (!connected) {
    process.exit(1);
  }
}

async function connectToDatabase(): Promise<boolean> {
  try {
    await mongoose.connect('mongodb://localhost/ticketApp');
    console.log('Connected to the database');
    return true;
  } catch (error) {
    console.log('Error occurred while connecting to the database', error);
    return false;
  }
}

export { databaseSetUp };
