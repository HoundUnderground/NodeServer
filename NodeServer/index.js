const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Equation = require('./equations.model');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// API Routes
app.post('/addequation', async (req, res) => {
    const { expression } = req.body;
    try {
        const answer = eval(expression); // WARNING: eval can be dangerous if untrusted input! OK for local test!
        const newEquation = new Equation({ expression, answer });
        await newEquation.save();
        res.json(newEquation);
    } catch (err) {
        res.status(400).json({ error: 'Invalid equation' });
    }
});

app.get('/getequations', async (req, res) => {
    const equations = await Equation.find().sort({ createdAt: 1 });
    res.json(equations);
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));