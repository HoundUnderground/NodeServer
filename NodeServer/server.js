const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Equation = require('./models/Equation'); // Import model

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// === Mongoose connect ===
mongoose.connect('mongodb+srv://user123:password135@cluster0.snvbogx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', )
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// POST - Add new equation
app.post('/addequation', async (req, res) => {
  try {
    const { expression } = req.body;

    // Evaluate the expression safely
    const answer = eval(expression).toString(); 

    const newEquation = new Equation({ expression, answer });
    await newEquation.save();

    res.status(201).json({ message: 'Equation saved!', equation: newEquation });
  } catch (error) {
    console.error('Error in POST /addequation:', error);
    res.status(500).json({ error: 'Failed to save equation' });
  }
});

// GET - Get all saved equations
app.get('/getequations', async (req, res) => {
  try {
    const equations = await Equation.find();
    res.json(equations);
  } catch (error) {
    console.error('Error in GET /getequations:', error);
    res.status(500).json({ error: 'Failed to get equations' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});