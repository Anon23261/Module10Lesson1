// Utility function for better console output
function printSection(title) {
    console.log('\n%c' + title, 'color: #007acc; font-size: 14px; font-weight: bold; padding: 5px 0;');
    console.log('='.repeat(50));
}

function printSubSection(title) {
    console.log('\n%c' + title, 'color: #4CAF50; font-size: 12px; font-weight: bold;');
}

// Part 1: Understanding Data Types
printSection('Part 1: Understanding Data Types in JavaScript');

// Task 1: Declare variables to represent student information
let studentName;    // String type
let studentAge;     // Number type
let studentGrade;   // Number type
let isPresent;      // Boolean type

// Task 2: Assign sample values
studentName = "Alice Johnson";
studentAge = 15;
studentGrade = 10;
isPresent = true;

// Task 3: Display student information
printSubSection('Student Information');
console.log({
    Name: studentName,
    Age: studentAge,
    Grade: studentGrade,
    'Attendance Status': isPresent
});

// Part 2: Exploring JavaScript Operators
printSection('Part 2: Exploring JavaScript Operators');

// Task 1 & 2: Declare and assign values
let num1 = 20;
let num2 = 5;

printSubSection('Initial Values');
console.log({
    'Number 1': num1,
    'Number 2': num2
});

// Task 3: Arithmetic Operations
printSubSection('Arithmetic Operations');
console.log({
    'Addition (num1 + num2)': num1 + num2,
    'Subtraction (num1 - num2)': num1 - num2,
    'Multiplication (num1 * num2)': num1 * num2,
    'Division (num1 / num2)': num1 / num2,
    'Modulus (num1 % num2)': num1 % num2
});

// Task 4: Assignment Operators
printSubSection('Assignment Operators');
num1 += 5;  // Add 5 to num1
num2 *= 2;  // Multiply num2 by 2
console.log({
    'num1 after adding 5': num1,
    'num2 after multiplying by 2': num2
});

// Task 5: Comparison Operators
printSubSection('Comparison Operators');
console.log({
    'Equal to (num1 === num2)': num1 === num2,
    'Greater than (num1 > num2)': num1 > num2,
    'Less than (num1 < num2)': num1 < num2,
    'Not equal to (num1 !== num2)': num1 !== num2,
    'Greater than or equal to (num1 >= num2)': num1 >= num2,
    'Less than or equal to (num1 <= num2)': num1 <= num2
});

// Task 6: Logical Operators
printSubSection('Logical Operators');
let isPositive = num1 > 0 && num2 > 0;
let isEven = num1 % 2 === 0 || num2 % 2 === 0;
console.log({
    'Both numbers are positive (AND)': isPositive,
    'At least one number is even (OR)': isEven,
    'num1 is NOT zero': !num1
});
