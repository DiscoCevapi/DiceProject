function rollDice(diceElement, faces) {
  // Add rolling + falling animation
  document.getElementById(diceElement).classList.add("falling");

  setTimeout(() => {
    document.getElementById(diceElement).classList.remove("falling");

    // Show random number
    const randomNumber = Math.floor(Math.random() * faces) + 1;
    document.getElementById(diceElement).textContent = randomNumber;
  }, 1000);
}

// Simple test function
function testRollDice() {
  console.log("Testing rollDice function...");
  
  // Test if the function exists
  if (typeof rollDice === "function") {
    console.log("✅ rollDice function exists");
  } else {
    console.log("❌ rollDice function does not exist");
  }
  
  // Test the random number logic separately
  console.log("Testing random number generation...");
  for (let i = 0; i < 5; i++) {
    let faces = 6;
    let testRandom = Math.floor(Math.random() * faces) + 1;
    if (testRandom >= 1 && testRandom <= faces) {
      console.log("✅ Random number " + testRandom + " is between 1 and " + faces);
    } else {
      console.log("❌ Random number " + testRandom + " is not between 1 and " + faces);
    }
  }
}

// Run the test
testRollDice();