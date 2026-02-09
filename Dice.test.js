/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

// Load the Dice.js functions by reading and evaluating the file
const diceJsCode = fs.readFileSync(path.join(__dirname, 'Dice.js'), 'utf8');
eval(diceJsCode);

describe('Dice.js functionality', () => {
  // Mock setTimeout to control timing in tests
  jest.useFakeTimers();

  beforeEach(() => {
    // Create a mock dice element for testing
    document.body.innerHTML = '<div id="dice">0</div>';
  });

  afterEach(() => {
    // Clean up after each test
    jest.clearAllTimers();
  });

  test('rollDice adds falling class immediately', () => {
    const diceElement = 'dice';
    const faces = 6;
    
    // Initially, the element should not have the falling class
    expect(document.getElementById(diceElement).classList.contains('falling')).toBe(false);
    
    // Call rollDice
    rollDice(diceElement, faces);
    
    // Immediately after calling rollDice, the falling class should be added
    expect(document.getElementById(diceElement).classList.contains('falling')).toBe(true);
  });

  test('rollDice removes falling class after timeout', () => {
    const diceElement = 'dice';
    const faces = 6;
    
    rollDice(diceElement, faces);
    
    // Advance timers by 1000ms to trigger the timeout callback
    jest.advanceTimersByTime(1000);
    
    // After the timeout, the falling class should be removed
    expect(document.getElementById(diceElement).classList.contains('falling')).toBe(false);
  });

  test('rollDice sets a random number between 1 and faces', () => {
    const diceElement = 'dice';
    const faces = 6;
    
    // Mock Math.random to return a predictable value for testing
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
    
    rollDice(diceElement, faces);
    
    // Advance timers to trigger the timeout callback
    jest.advanceTimersByTime(1000);
    
    // With Math.random returning 0.5 and faces = 6,
    // Math.floor(0.5 * 6) + 1 = Math.floor(3) + 1 = 4
    expect(parseInt(document.getElementById(diceElement).textContent)).toBe(4);
    
    // Restore Math.random
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('rollDice generates numbers in correct range', () => {
    const diceElement = 'dice';
    const faces = 6;
    
    // Test multiple rolls with different random values
    const testCases = [
      { randomValue: 0.0, expected: 1 },  // Math.floor(0 * 6) + 1 = 1
      { randomValue: 0.1, expected: 1 },  // Math.floor(0.6) + 1 = 1
      { randomValue: 0.99, expected: 6 }, // Math.floor(5.94) + 1 = 6
    ];
    
    for (const testCase of testCases) {
      // Reset the element content
      document.getElementById(diceElement).textContent = '0';
      
      // Mock Math.random
      jest.spyOn(global.Math, 'random').mockReturnValue(testCase.randomValue);
      
      rollDice(diceElement, faces);
      jest.advanceTimersByTime(1000);
      
      expect(parseInt(document.getElementById(diceElement).textContent)).toBe(testCase.expected);
    }
    
    // Restore Math.random
    jest.spyOn(global.Math, 'random').mockRestore();
  });
});