const crypto = require('crypto');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const path = require('path');

// Image categories with correct/incorrect markers
const imageCategories = {
    voitures: {
    instruction: "Sélectionnez toutes les images contenant des voitures",
    images: [
        { id: 'a1', url: '/src/assets/signup/car.jpeg', correct: true },
        { id: 'a2', url: '/src/assets/signup/car1.webp', correct: true },
        { id: 'a3', url: '/src/assets/signup/car2.jpg', correct: true },
        { id: 'n1', url: '/src/assets/signup/route4.avif', correct: false },
        { id: 'n2', url: '/src/assets/signup/route5.avif', correct: false },
        { id: 'n3', url: '/src/assets/signup/route3.avif', correct: false },
        { id: 'n4', url: '/src/assets/signup/route3.avif', correct: false },
        { id: 'n5', url: '/src/assets/signup/bus2.jpg', correct: false },
        { id: 'n6', url: '/src/assets/signup/bus4.jpg', correct: false }
    ]
  },
  bus: {
    instruction: "Sélectionnez toutes les images contenant des bus",
    images: [
        { id: 'a1', url: '/src/assets/signup/bus1.jpg', correct: true },
        { id: 'a2', url: '/src/assets/signup/bus2.jpg', correct: true },
        { id: 'a3', url: '/src/assets/signup/bus4.jpg', correct: true },
        { id: 'n1', url: '/src/assets/signup/bus3.webp', correct: true },
        { id: 'n2', url: '/src/assets/signup/route3.avif', correct: false },
        { id: 'n3', url: '/src/assets/signup/route5.avif', correct: false },
        { id: 'n4', url: '/src/assets/signup/car2.jpg', correct: false },
        { id: 'n5', url: '/src/assets/signup/car.jpeg', correct: false },
        { id: 'n6', url: '/src/assets/signup/bike1.jpg', correct: false }
    ]
  },
  motos: {
    instruction: "Sélectionnez toutes les images contenant des motos",
    images: [
        { id: 'a1', url: '/src/assets/signup/bike1.jpg', correct: true },
        { id: 'a2', url: '/src/assets/signup/bike2.jpg', correct: true },
        { id: 'a3', url: '/src/assets/signup/bike3.jpg', correct: true },
        { id: 'n1', url: '/src/assets/signup/car.jpeg', correct: false },
        { id: 'n2', url: '/src/assets/signup/bus1.jpg', correct: false },
        { id: 'n3', url: '/src/assets/signup/route5.avif', correct: false },
        { id: 'n4', url: '/src/assets/signup/car2.jpg', correct: false },
        { id: 'n5', url: '/src/assets/signup/route4.avif', correct: false },
        { id: 'n6', url: '/src/assets/signup/route3.avif', correct: false }
    ]
  },
  maisons: {
    instruction: "Sélectionnez toutes les images contenant des maisons",
    images: [
        { id: 'a1', url: '/src/assets/signup/house2.jpg', correct: true },
        { id: 'a2', url: '/src/assets/signup/house4.jpg', correct: true },
        { id: 'a3', url: '/src/assets/signup/house1.jpeg', correct: true },
        { id: 'n1', url: '/src/assets/signup/mountain3.webp', correct: false },
        { id: 'n2', url: '/src/assets/signup/mountain1.avif', correct: false },
        { id: 'n3', url: '/src/assets/signup/tour4.jpg', correct: false },
        { id: 'n4', url: '/src/assets/signup/mountain4.jpg', correct: false },
        { id: 'n5', url: '/src/assets/signup/mountain2.jpeg', correct: false },
        { id: 'n6', url: '/src/assets/signup/mountain4.jpg', correct: false }
    ]
  },
  montagnes: {
    instruction: "Sélectionnez toutes les images contenant des montagnes",
    images: [
        { id: 'a1', url: '/src/assets/signup/mountain3.webp', correct: true },
        { id: 'a2', url: '/src/assets/signup/mountain1.avif', correct: true },
        { id: 'a3', url: '/src/assets/signup/mountain2.jpeg', correct: true },
        { id: 'n1', url: '/src/assets/signup/mountain4.jpg', correct: true },
        { id: 'n2', url: '/src/assets/signup/house4.jpg', correct: false },
        { id: 'n3', url: '/src/assets/signup/house1.jpeg', correct: false },
        { id: 'n4', url: '/src/assets/signup/house2.jpg', correct: false },
        { id: 'n5', url: '/src/assets/signup/house3.webp', correct: false },
        { id: 'n6', url: '/src/assets/signup/tour1.jpg', correct: false }
    ]
  },
  avions: {
    instruction: "Sélectionnez toutes les images contenant des avions",
    images: [
        { id: 'a1', url: '/src/assets/signup/plain1.jpg', correct: true },
        { id: 'a2', url: '/src/assets/signup/plain2.jpg', correct: true },
        { id: 'a3', url: '/src/assets/signup/plain3.jpg', correct: true },
        { id: 'n1', url: '/src/assets/signup/plain4.jpg', correct: true },
        { id: 'n2', url: '/src/assets/signup/plain5.avif', correct: true },
        { id: 'n3', url: '/src/assets/signup/tour2.webp', correct: false },
        { id: 'n4', url: '/src/assets/signup/tour4.jpg', correct: false },
        { id: 'n5', url: '/src/assets/signup/car.jpeg', correct: false },
        { id: 'n6', url: '/src/assets/signup/mountain3.webp', correct: false }
    ]
  },
  feux: {
    instruction: "Sélectionnez toutes les images contenant des feux",
    images: [
        { id: 'a1', url: '/src/assets/signup/feu1.jpeg', correct: true },
        { id: 'a2', url: '/src/assets/signup/feu2.jpeg', correct: true },
        { id: 'a3', url: '/src/assets/signup/feu3.jpg', correct: true },
        { id: 'n1', url: '/src/assets/signup/feu4.jpg', correct: true },
        { id: 'n2', url: '/src/assets/signup/route5.avif', correct: false },
        { id: 'n3', url: '/src/assets/signup/route4.avif', correct: false },
        { id: 'n4', url: '/src/assets/signup/route3.avif', correct: false },
        { id: 'n5', url: '/src/assets/signup/plain4.jpg', correct: false },
        { id: 'n6', url: '/src/assets/signup/plain5.avif', correct: false }
    ]
  },
  tours: {
    instruction: "Sélectionnez toutes les images contenant des tours",
    images: [
      { id: 'a1', url: '/src/assets/signup/tour1.jpg', correct: true },
      { id: 'a2', url: '/src/assets/signup/tour3.jpg', correct: true },
      { id: 'a3', url: '/src/assets/signup/tour4.jpg', correct: true },
      { id: 'n1', url: '/src/assets/signup/tour2.webp', correct: true },
      { id: 'n2', url: '/src/assets/signup/plain5.avif', correct: false },
      { id: 'n3', url: '/src/assets/signup/route5.avif', correct: false },
      { id: 'n4', url: '/src/assets/signup/house2.jpg', correct: false },
      { id: 'n5', url: '/src/assets/signup/house4.jpg', correct: false },
      { id: 'n6', url: '/src/assets/signup/mountain3.webp', correct: false }
    ]
  }
};

// Session storage (in production use Redis)
const sessions = new Map();

const generateSessionToken = () => crypto.randomBytes(16).toString('hex');

exports.generateCaptcha = catchAsyncErrors(async (req, res, next) => {
  // Select random category
  const categoryKeys = Object.keys(imageCategories);
  const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const category = imageCategories[randomCategory];
  
  // Shuffle images
  const shuffledImages = [...category.images].sort(() => 0.5 - Math.random());
  
  // Create session
  const sessionToken = generateSessionToken();
  const correctAnswers = shuffledImages
    .map((img, index) => img.correct ? index : null)
    .filter(val => val !== null);
  
  sessions.set(sessionToken, {
    correctAnswers,
    attempts: 0,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  });

  // Return minimal image data
  const responseImages = shuffledImages.map(img => ({
    id: img.id,
    url: img.url
  }));

  res.status(200).json({
    success: true,
    sessionToken,
    images: responseImages,
    instruction: category.instruction,
    attemptsAllowed: 3
  });
});

exports.verifyCaptcha = catchAsyncErrors(async (req, res, next) => {
  const { sessionToken, selectedIndices = [] } = req.body;
  
  // Validate session
  if (!sessions.has(sessionToken)) {
    return next(new ErrorHandler('Invalid or expired session', 401));
  }

  const session = sessions.get(sessionToken);
  
  // Check expiration
  if (Date.now() > session.expiresAt) {
    sessions.delete(sessionToken);
    return next(new ErrorHandler('Session expired', 401));
  }

  session.attempts++;
  
  // Verify selections
  const allCorrect = session.correctAnswers.every(idx => selectedIndices.includes(idx));
  const noIncorrect = selectedIndices.every(idx => session.correctAnswers.includes(idx));
  
  if (allCorrect && noIncorrect) {
    // Successful verification
    sessions.delete(sessionToken);
    return res.status(200).json({
      success: true,
      message: 'Verification successful'
    });
  }
  
  // Failed verification
  if (session.attempts >= 3) {
    sessions.delete(sessionToken);
    return next(new ErrorHandler('Maximum attempts reached', 400));
  }
  
  // Generate new challenge if attempts remain
  const categoryKeys = Object.keys(imageCategories);
  const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
  const category = imageCategories[randomCategory];
  const shuffledImages = [...category.images].sort(() => 0.5 - Math.random());
  
  // Update session with new correct answers
  session.correctAnswers = shuffledImages
    .map((img, index) => img.correct ? index : null)
    .filter(val => val !== null);
  
  const responseImages = shuffledImages.map(img => ({
    id: img.id,
    url: img.url
  }));

  res.status(400).json({
    success: false,
    sessionToken,
    images: responseImages,
    instruction: category.instruction,
    attemptsRemaining: 3 - session.attempts,
    message: `Verification failed. ${3 - session.attempts} attempts remaining.`
  });
});