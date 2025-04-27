const mongoose = require('mongoose');

const EquationSchema = new mongoose.Schema({
  expression: { type: String, required: true },
  answer: { type: String, required: true }
});

module.exports = mongoose.model('Equation', EquationSchema);
