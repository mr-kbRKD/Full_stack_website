const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user');
const Contact = require('./models/contact');


const app = express();

dotenv.config();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL, {   
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.post('/auth/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username }).exec();

    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    console.log('User saved successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/auth/checkUser', async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(200).json({ exists: true });
    } else {
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username, password }).exec();
  
      if (!user) {
        const isUserRegistered = await User.findOne({ username });
  
        if (!isUserRegistered) {
          // User is not registered, show a SweetAlert warning notification
          return res.status(401).json({ success: false, error: 'User not registered. Please sign up.' });
        }
  
        // User is registered but credentials are invalid, show a different message
        return res.status(401).json({ success: false, error: 'Invalid credentials. Please try again.' });
      }
  
      console.log('User logged in successfully');
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
  
    // Simple validation, you can enhance it based on your requirements
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }
  
    try {
      // Save contact data to MongoDB
      const newContact = new Contact({ name, email, message });
      await newContact.save();
  
      console.log('Contact details saved successfully');
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving contact details:', error);
      return res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  });
  
  
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/auth', authRoutes);
app.use('/contact', contactRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
