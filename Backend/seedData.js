import mongoose from 'mongoose';
import { Category } from './DB/models/category.schema.js';
import { Level } from './DB/models/levels.schema.js';
import { Question } from './DB/models/question.schema.js';
import { dbConnection } from './DB/db.connection.js';

// Seed data
const seedData = async () => {
  try {
    console.log('Connecting to database...');
    await dbConnection;
    
    // Clear existing data
    console.log('Clearing existing data...');
    await Category.deleteMany({});
    await Level.deleteMany({});
    await Question.deleteMany({});
    
    // Create categories
    console.log('Creating categories...');
    const categories = await Category.insertMany([
      { name: 'Basic Signs' },
      { name: 'Numbers' },
      { name: 'Colors' },
      { name: 'Family' },
      { name: 'Food' }
    ]);
    
    // Create levels
    console.log('Creating levels...');
    const levels = await Level.insertMany([
      { name: 'Level 1', category: categories[0]._id },
      { name: 'Level 2', category: categories[0]._id },
      { name: 'Level 3', category: categories[1]._id },
      { name: 'Level 4', category: categories[2]._id },
      { name: 'Level 5', category: categories[3]._id }
    ]);
    
    // Create questions for Level 1
    console.log('Creating questions...');
    const questionsLevel1 = [
      {
        level: levels[0]._id,
        sign_Url: 'hello.jpg',
        sign_Text: 'Hello',
        type: 'MCQ',
        question: 'What does this sign mean?',
        options: [
          { text: 'Hello', score: 10 },
          { text: 'Goodbye', score: 0 },
          { text: 'Thank you', score: 0 },
          { text: 'Please', score: 0 }
        ]
      },
      {
        level: levels[0]._id,
        sign_Url: 'thank_you.jpg',
        sign_Text: 'Thank you',
        type: 'MCQ',
        question: 'What does this sign mean?',
        options: [
          { text: 'Hello', score: 0 },
          { text: 'Goodbye', score: 0 },
          { text: 'Thank you', score: 10 },
          { text: 'Please', score: 0 }
        ]
      },
      {
        level: levels[0]._id,
        sign_Url: 'please.jpg',
        sign_Text: 'Please',
        type: 'MCQ',
        question: 'What does this sign mean?',
        options: [
          { text: 'Hello', score: 0 },
          { text: 'Goodbye', score: 0 },
          { text: 'Thank you', score: 0 },
          { text: 'Please', score: 10 }
        ]
      }
    ];
    
    const questionsLevel2 = [
      {
        level: levels[1]._id,
        sign_Url: 'goodbye.jpg',
        sign_Text: 'Goodbye',
        type: 'MCQ',
        question: 'What does this sign mean?',
        options: [
          { text: 'Hello', score: 0 },
          { text: 'Goodbye', score: 10 },
          { text: 'Thank you', score: 0 },
          { text: 'Sorry', score: 0 }
        ]
      },
      {
        level: levels[1]._id,
        sign_Url: 'sorry.jpg',
        sign_Text: 'Sorry',
        type: 'MCQ',
        question: 'What does this sign mean?',
        options: [
          { text: 'Hello', score: 0 },
          { text: 'Goodbye', score: 0 },
          { text: 'Thank you', score: 0 },
          { text: 'Sorry', score: 10 }
        ]
      }
    ];
    
    await Question.insertMany([...questionsLevel1, ...questionsLevel2]);
    
    console.log('Seed data created successfully!');
    console.log('Categories:', categories.length);
    console.log('Levels:', levels.length);
    console.log('Questions:', questionsLevel1.length + questionsLevel2.length);
    
    // Print level IDs for reference
    console.log('\nLevel IDs for reference:');
    levels.forEach((level, index) => {
      console.log(`Level ${index + 1} (${level.name}): ${level._id}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData(); 