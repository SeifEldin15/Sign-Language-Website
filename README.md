# Sign Language Learning Website

A comprehensive sign language learning platform with interactive quizzes and progress tracking.

## 🚀 Features

- **Interactive Quizzes**: Learn sign language through engaging multiple-choice questions
- **Progress Tracking**: Monitor your learning progress with detailed statistics
- **Level-based Learning**: Structured learning path with different difficulty levels
- **Category Organization**: Signs organized by categories for systematic learning
- **Lives System**: Gamified learning experience with lives and scoring
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Architecture

### Backend (Node.js + Express + MongoDB)

#### Database Models
- **Question**: Quiz questions with sign images and multiple choice options
- **Level**: Learning levels within categories
- **Category**: Organized learning categories
- **Sign**: Sign language signs with images and text
- **User**: User profiles and progress tracking
- **Mistake**: User mistake tracking for learning analytics

#### API Endpoints
```
GET /api/question/level/:levelId  - Get questions for a specific level
GET /api/question                 - Get all questions
GET /api/question/:id             - Get specific question

GET /api/level                    - Get all levels
GET /api/level/:id                - Get specific level
GET /api/category/:id/level       - Get levels for a category

GET /api/category                 - Get all categories (requires token)
GET /api/category/:id             - Get specific category

GET /api/sign                     - Get all signs
GET /api/sign/:id                 - Get specific sign
```

### Frontend (React + React Router)

#### Components
- **QuestionPage**: Main quiz interface
- **QuestionSection**: Displays sign images and questions
- **QuestionOptions**: Multiple choice answer options
- **TotalPoints**: Quiz completion and results
- **ErrorBoundary**: Error handling and user feedback
- **ProgressHeader**: Progress tracking display

#### Custom Hooks
- **useQuizState**: Manages quiz state and logic

#### Utilities
- **api.js**: Centralized API calls and error handling

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the Backend directory:
   ```env
   BASE_URL=http://44.246.135.176:3002/
   PORT=3002
   DB_CONNECTION=mongodb://127.0.0.1:27017/gproject
   JWT_SECRET=your_jwt_secret_here
   ```

3. **Database Connection**
   - Ensure MongoDB is running
   - The application will connect to `mongodb://127.0.0.1:27017/gproject`

4. **Start the Server**
   ```bash
   npm start
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the Frontend directory:
   ```env
   REACT_APP_API_URL=http://44.246.135.176:3002/api
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

## 📊 Data Structure

### Question Schema
```javascript
{
  level: ObjectId,           // Reference to Level
  sign_Url: String,         // Sign image URL
  sign_Text: String,        // Sign meaning/translation
  type: String,             // 'MCQ' or 'True or False'
  question: String,         // Question text
  options: [{
    text: String,           // Option text
    score: Number          // Score (10 for correct, 0 for incorrect)
  }],
  correctOption: Mixed      // Correct option identifier
}
```

### Level Schema
```javascript
{
  name: String,             // Level name
  category: ObjectId        // Reference to Category
}
```

## 🎮 Usage

### For Learners

1. **Select a Level**: Choose from available learning levels
2. **Study the Sign**: Each question shows a sign image with meaning
3. **Answer Questions**: Select from multiple choice options
4. **Track Progress**: Monitor your score and accuracy
5. **Complete Levels**: Progress through increasingly difficult content

### For Administrators

1. **Add Categories**: Create new learning categories
2. **Create Levels**: Add levels within categories
3. **Upload Questions**: Add quiz questions with sign images
4. **Monitor Progress**: Track user learning analytics

## 🔧 API Integration

The frontend uses a centralized API utility for all backend communications:

```javascript
import { api } from '../utils/api';

// Get questions for a level
const questions = await api.questions.getByLevel(levelId);

// Get all levels
const levels = await api.levels.getAll();

// Get categories (requires authentication)
const categories = await api.categories.getAll(token);
```

## 🎯 Key Features Implemented

### 1. **Robust Error Handling**
- API call error handling with user-friendly messages
- ErrorBoundary component for React error recovery
- Loading states and empty state handling

### 2. **Progress Tracking**
- Local storage for offline progress tracking
- Detailed quiz statistics and analytics
- Lives system for gamified learning

### 3. **Responsive Design**
- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interface elements

### 4. **Performance Optimizations**
- Lazy loading of images
- Efficient state management
- Optimized API calls

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Graceful handling of API failures
- **Invalid Data**: Validation and fallback for malformed data
- **React Errors**: ErrorBoundary component catches and displays errors
- **Image Loading**: Fallback display for missing images

## 📱 Responsive Design

The interface adapts to different screen sizes:
- **Desktop**: Full sidebar navigation and expanded layout
- **Mobile**: Bottom navigation and optimized touch interactions
- **Tablet**: Balanced layout with accessible controls

## 🔐 Security Considerations

- JWT token authentication for admin endpoints
- Input validation on all API endpoints
- Secure file upload handling
- Environment variable protection

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Deploy to services like Heroku, AWS, or DigitalOcean

### Frontend Deployment
1. Build the React application: `npm run build`
2. Deploy to services like Netlify, Vercel, or AWS S3
3. Update API URLs for production

## 📈 Future Enhancements

- User authentication and profiles
- Advanced analytics and reporting
- Multiplayer learning modes
- Video sign demonstrations
- Speech recognition integration
- Offline learning capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review error messages in the console
- Ensure all dependencies are installed
- Verify MongoDB connection
- Check API endpoint availability

---

 