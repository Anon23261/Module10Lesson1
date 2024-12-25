// Helper function to write to our output areas
function writeOutput(elementId, text) {
    const element = document.getElementById(elementId);
    element.textContent += text + '\n';
}

// Clear all outputs
function clearOutputs() {
    document.getElementById('dataTypes').textContent = '';
    document.getElementById('calculator').textContent = '';
    document.getElementById('operators').textContent = '';
}

// Main demo function
function runDemo() {
    // Clear previous outputs
    clearOutputs();

    // Part 1: Understanding Data Types
    writeOutput('dataTypes', '=== Student Information ===');
    
    // Task 1 & 2: Declare and assign student information
    let studentName = "Alice";    // String type
    let studentAge = 15;          // Number type
    let studentGrade = 10;        // Number type
    let isPresent = true;         // Boolean type

    // Task 3: Display student information with explanations
    writeOutput('dataTypes', `Name: ${studentName} (This is a string - text data)`);
    writeOutput('dataTypes', `Age: ${studentAge} (This is a number)`);
    writeOutput('dataTypes', `Grade: ${studentGrade} (This is also a number)`);
    writeOutput('dataTypes', `Is Present: ${isPresent} (This is a boolean - true/false)`);

    // Part 2: Calculator Program
    writeOutput('calculator', '=== Calculator Operations ===');
    
    // Task 1 & 2: Declare and assign numbers
    let num1 = 10;
    let num2 = 5;
    writeOutput('calculator', `Working with numbers: ${num1} and ${num2}`);

    // Task 3: Perform arithmetic operations
    writeOutput('calculator', '\nBasic Math Operations:');
    writeOutput('calculator', `Addition: ${num1} + ${num2} = ${num1 + num2}`);
    writeOutput('calculator', `Subtraction: ${num1} - ${num2} = ${num1 - num2}`);
    writeOutput('calculator', `Multiplication: ${num1} × ${num2} = ${num1 * num2}`);
    writeOutput('calculator', `Division: ${num1} ÷ ${num2} = ${num1 / num2}`);

    // Part 3: Exploring Different Operators
    writeOutput('operators', '=== Exploring Operators ===');

    // Task 4: Assignment operators
    writeOutput('operators', '\nAssignment Operators:');
    num1 += 5;  // Same as: num1 = num1 + 5
    writeOutput('operators', `After num1 += 5: ${num1} (We added 5 to num1)`);
    
    num2 *= 2;  // Same as: num2 = num2 * 2
    writeOutput('operators', `After num2 *= 2: ${num2} (We multiplied num2 by 2)`);

    // Task 5: Comparison operators
    writeOutput('operators', '\nComparison Operators:');
    writeOutput('operators', `Is ${num1} equal to ${num2}? ${num1 === num2}`);
    writeOutput('operators', `Is ${num1} greater than ${num2}? ${num1 > num2}`);
    writeOutput('operators', `Is ${num1} not equal to ${num2}? ${num1 !== num2}`);

    // Task 6: Logical operators
    writeOutput('operators', '\nLogical Operators:');
    let isPositive = num1 > 0 && num2 > 0;
    writeOutput('operators', `Are both numbers positive? ${isPositive}`);
    writeOutput('operators', `(This used && which means "and")`);
    
    let isEven = num1 % 2 === 0 || num2 % 2 === 0;
    writeOutput('operators', `Is at least one number even? ${isEven}`);
    writeOutput('operators', `(This used || which means "or")`);
}

// Run the demo when the page loads
window.addEventListener('load', runDemo);
