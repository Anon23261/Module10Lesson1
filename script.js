// Part 1: Understanding Data Types
console.log("Part 1: Understanding Data Types in JavaScript");
console.log("-----------------------------------------");

// Task 1: Declare variables to represent student information
let studentName;    // String type for storing name
let studentAge;     // Number type for storing age
let studentGrade;   // Number type for storing grade
let isPresent;      // Boolean type for storing attendance status

// Task 2: Assign sample values to the student information variables
studentName = "Alice";
studentAge = 15;
studentGrade = 10;
isPresent = true;

// Task 3: Display the student information
console.log("Student Information:");
console.log("Name:", studentName);
console.log("Age:", studentAge);
console.log("Grade:", studentGrade);
console.log("Is Present:", isPresent);
console.log("\n"); // Add a blank line for readability

// Part 2: Exploring JavaScript Operators
console.log("Part 2: Exploring JavaScript Operators");
console.log("-----------------------------------------");

// Task 1 & 2: Declare and assign values to numeric variables
let num1 = 20;
let num2 = 5;
console.log("Initial Values:");
console.log("num1 =", num1);
console.log("num2 =", num2);
console.log("\n");

// Task 3: Perform arithmetic operations
console.log("Arithmetic Operations:");
console.log("Sum:", num1 + num2);
console.log("Difference:", num1 - num2);
console.log("Product:", num1 * num2);
console.log("Quotient:", num1 / num2);
console.log("\n");

// Task 4: Explore assignment operators
console.log("Assignment Operators:");
num1 += 5;  // Add 5 to num1
num2 *= 2;  // Multiply num2 by 2
console.log("Updated num1:", num1);
console.log("Updated num2:", num2);
console.log("\n");

// Task 5: Use comparison operators
console.log("Comparison Operators:");
console.log("Is num1 equal to num2?", num1 === num2);
console.log("Is num1 greater than num2?", num1 > num2);
console.log("Is num1 not equal to num2?", num1 !== num2);
console.log("\n");

// Task 6: Apply logical operators
console.log("Logical Operators:");
let isPositive = num1 > 0 && num2 > 0;
let isEven = num1 % 2 === 0 || num2 % 2 === 0;
console.log("Are both numbers positive?", isPositive);
console.log("Is at least one number even?", isEven);
