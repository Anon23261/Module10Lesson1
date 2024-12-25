// Utility function for better console output
function printSection(title) {
    console.log('\n%c' + title, 'color: #007acc; font-size: 14px; font-weight: bold; padding: 5px 0;');
    console.log('='.repeat(50));
}

function printSubSection(title) {
    console.log('\n%c' + title, 'color: #4CAF50; font-size: 12px; font-weight: bold;');
}

// Part 1: Understanding Data Types
function updateStudentInfo() {
    // Get input values
    const studentName = document.getElementById('studentName').value;
    const studentAge = parseInt(document.getElementById('studentAge').value);
    const studentGrade = parseInt(document.getElementById('studentGrade').value);
    const isPresent = document.getElementById('isPresent').value === 'true';

    // Update output elements
    document.getElementById('nameOutput').textContent = studentName;
    document.getElementById('ageOutput').textContent = studentAge;
    document.getElementById('gradeOutput').textContent = studentGrade;
    document.getElementById('presentOutput').textContent = isPresent ? 'Yes' : 'No';

    // Also log to console for learning purposes
    console.log('Student Information:', {
        Name: studentName,
        Age: studentAge,
        Grade: studentGrade,
        'Attendance Status': isPresent
    });
}

// Part 2: Exploring JavaScript Operators
function calculateArithmetic() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const results = {
        'Addition (+)': num1 + num2,
        'Subtraction (-)': num1 - num2,
        'Multiplication (*)': num1 * num2,
        'Division (/)': num1 / num2,
        'Modulus (%)': num1 % num2
    };

    // Create HTML output
    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('arithmeticOutput').innerHTML = output;
    console.log('Arithmetic Operations:', results);
}

function compareNumbers() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const results = {
        'Equal to (===)': num1 === num2,
        'Not equal to (!==)': num1 !== num2,
        'Greater than (>)': num1 > num2,
        'Less than (<)': num1 < num2,
        'Greater than or equal to (>=)': num1 >= num2,
        'Less than or equal to (<=)': num1 <= num2
    };

    // Create HTML output
    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('comparisonOutput').innerHTML = output;
    console.log('Comparison Operations:', results);
}

function checkLogical() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);

    const results = {
        'Both numbers are positive (AND)': num1 > 0 && num2 > 0,
        'At least one number is positive (OR)': num1 > 0 || num2 > 0,
        'First number is NOT zero': num1 !== 0,
        'Both numbers are even': num1 % 2 === 0 && num2 % 2 === 0,
        'At least one number is even': num1 % 2 === 0 || num2 % 2 === 0
    };

    // Create HTML output
    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('logicalOutput').innerHTML = output;
    console.log('Logical Operations:', results);
}

// Initialize the displays when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateStudentInfo();
    calculateArithmetic();
    compareNumbers();
    checkLogical();
});
