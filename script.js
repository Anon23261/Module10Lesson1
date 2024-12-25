// Utility function for hacker-style console output
function hackLog(message, type = 'info') {
    const output = document.getElementById('hackingOutput');
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '> ERROR:' : '>';
    const color = type === 'error' ? 'red' : '#00ff00';
    
    output.innerHTML += `<div style="color: ${color}">${prefix} [${timestamp}] ${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

// Part 1: Understanding Data Types
function updateStudentInfo() {
    const studentName = document.getElementById('studentName').value;
    const studentAge = parseInt(document.getElementById('studentAge').value);
    const studentGrade = parseInt(document.getElementById('studentGrade').value);
    const isPresent = document.getElementById('isPresent').value === 'true';

    document.getElementById('nameOutput').textContent = studentName;
    document.getElementById('ageOutput').textContent = studentAge;
    document.getElementById('gradeOutput').textContent = studentGrade;
    document.getElementById('presentOutput').textContent = isPresent ? 'ACTIVE' : 'INACTIVE';

    console.log('Agent Profile Updated:', {
        Name: studentName,
        Age: studentAge,
        'Clearance Level': studentGrade,
        'Active Status': isPresent
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

    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">> ${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('arithmeticOutput').innerHTML = output;
    console.log('Arithmetic Protocols Executed:', results);
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

    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">> ${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('comparisonOutput').innerHTML = output;
    console.log('Comparison Protocols Executed:', results);
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

    const output = Object.entries(results)
        .map(([operation, result]) => 
            `<div><span class="result-label">> ${operation}:</span> ${result}</div>`)
        .join('');

    document.getElementById('logicalOutput').innerHTML = output;
    console.log('Logical Protocols Executed:', results);
}

// Part 3: Advanced Hacking Protocols
function executeCode() {
    const code = document.getElementById('hackingCode').value;
    hackLog('Initializing code execution...');
    
    try {
        const result = eval(code); // Note: eval is used for demonstration purposes
        hackLog('Code executed successfully');
        if (result !== undefined) {
            hackLog(`Output: ${result}`);
        }
    } catch (error) {
        hackLog(error.message, 'error');
    }
}

function encryptMessage() {
    const key = document.getElementById('encryptionKey').value;
    if (!key) {
        hackLog('Encryption key required', 'error');
        return;
    }

    const message = document.getElementById('hackingCode').value;
    hackLog('Initiating encryption protocol...');

    // Simple XOR encryption for demonstration
    const encrypted = Array.from(message)
        .map(char => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(0)))
        .join('');

    hackLog('Encryption complete');
    document.getElementById('hackingCode').value = encrypted;
}

function generateMatrix() {
    hackLog('Generating matrix sequence...');
    
    const characters = '01';
    const lines = [];
    
    for (let i = 0; i < 5; i++) {
        let line = '';
        for (let j = 0; j < 20; j++) {
            line += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        lines.push(line);
        hackLog(line);
    }
}

// Initialize all displays when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateStudentInfo();
    calculateArithmetic();
    compareNumbers();
    checkLogical();
    hackLog('System initialization complete');
});
