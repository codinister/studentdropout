// Logistic Regression Dropout Risk Calculator

const riskCalculator = ({ ...options }) => {
  const { gpa, attendance, score } = options;

  // Example coefficients (from a trained model)
  const b0 = -8; // intercept
  const b1 = -0.05; // GPA coefficient
  const b2 = -0.04; // Attendance coefficient
  const b3 = -0.03; // Score coefficient

  // Logistic (sigmoid) function
  function sigmoid(z: number) {
    return 1 / (1 + Math.exp(-z));
  }

  // Calculate linear combination
  const z = b0 + b1 * gpa + b2 * attendance + b3 * score;

  // Calculate probability
  const probability = sigmoid(z);

  // Classify risk level
  let riskLevel = '';
  if (probability > 0.7) {
    riskLevel = 'High Risk';
  } else if (probability >= 0.4) {
    riskLevel = 'Medium Risk';
  } else {
    riskLevel = 'Low Risk';
  }

  // Output
  //console.log(`Dropout Probability: ${(probability * 100).toFixed(2)}%`);

  return riskLevel;
};

export default riskCalculator;
