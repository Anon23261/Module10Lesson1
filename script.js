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

// Function to update type analysis results
function updateTypeAnalysis() {
    const stringValue = document.getElementById('stringInput').value;
    const numberValue = parseFloat(document.getElementById('numberInput').value);
    const booleanValue = document.getElementById('booleanInput').value === 'true';

    const results = document.getElementById('typeResults');
    results.innerHTML = `
        <div>String Value: "${stringValue}" (${typeof stringValue})</div>
        <div>Number Value: ${numberValue} (${typeof numberValue})</div>
        <div>Boolean Value: ${booleanValue} (${typeof booleanValue})</div>
    `;
}

// Function to update calculator results
function updateCalculator() {
    const num1 = parseFloat(document.getElementById('calc1').value);
    const num2 = parseFloat(document.getElementById('calc2').value);
    const operation = document.getElementById('operation').value;

    let result;
    switch(operation) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 !== 0 ? num1 / num2 : 'Cannot divide by zero';
            break;
    }

    const calcResult = document.getElementById('calcResult');
    calcResult.innerHTML = `
        <div>Operation: ${num1} ${operation} ${num2}</div>
        <div>Result: ${result}</div>
    `;
}

// Function to update comparison results
function updateComparisons() {
    const val1 = parseFloat(document.getElementById('compare1').value);
    const val2 = parseFloat(document.getElementById('compare2').value);

    const results = document.getElementById('compareResults');
    results.innerHTML = `
        <div>Equality (===): ${val1} === ${val2} is ${val1 === val2}</div>
        <div>Greater Than (>): ${val1} > ${val2} is ${val1 > val2}</div>
        <div>Less Than (<): ${val1} < ${val2} is ${val1 < val2}</div>
        <div>Logical AND (&&): Both positive? ${val1 > 0 && val2 > 0}</div>
        <div>Logical OR (||): At least one even? ${val1 % 2 === 0 || val2 % 2 === 0}</div>
    `;
}

// Function to update all results
function updateAllResults() {
    updateTypeAnalysis();
    updateCalculator();
    updateComparisons();
}

// Function to clear all results
function clearAllResults() {
    document.getElementById('typeResults').innerHTML = '';
    document.getElementById('calcResult').innerHTML = '';
    document.getElementById('compareResults').innerHTML = '';
}

// Add event listeners for real-time updates
document.getElementById('stringInput').addEventListener('input', updateTypeAnalysis);
document.getElementById('numberInput').addEventListener('input', updateTypeAnalysis);
document.getElementById('booleanInput').addEventListener('change', updateTypeAnalysis);

document.getElementById('calc1').addEventListener('input', updateCalculator);
document.getElementById('calc2').addEventListener('input', updateCalculator);
document.getElementById('operation').addEventListener('change', updateCalculator);

document.getElementById('compare1').addEventListener('input', updateComparisons);
document.getElementById('compare2').addEventListener('input', updateComparisons);

// Run the demo when the page loads
window.addEventListener('load', runDemo);

// Initialize results when page loads
window.addEventListener('load', updateAllResults);
