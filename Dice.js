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
    
