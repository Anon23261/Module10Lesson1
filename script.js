// Global variables
let currentArray = [];
let testObject = {};

// Matrix rain effect
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.opacity = '0.1';

// Matrix rain setup
let matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';
let drops = [];
let fontSize = 10;

function setupMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops = [];
    const columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Initialize matrix effect
setupMatrix();
window.addEventListener('resize', setupMatrix);
setInterval(drawMatrix, 50);

// Type Analysis Functions
function updateStringResults() {
    const basicString = document.getElementById('stringInput').value;
    const concatString = document.getElementById('stringConcatInput').value;
    const templateString = document.getElementById('templateInput').value;

    const results = [
        `Basic String: "${basicString}" (length: ${basicString.length})`,
        `Concatenation: "${basicString + ' ' + concatString}"`,
        `Template Literal: \`Hello, ${templateString}!\``,
        `Upper Case: "${basicString.toUpperCase()}"`,
        `Lower Case: "${basicString.toLowerCase()}"`,
        `Character at 0: "${basicString.charAt(0)}"`,
        `Type: ${typeof basicString}`
    ];

    document.getElementById('stringResults').innerHTML = `
        <h4>String Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function updateNumberResults() {
    const integer = parseInt(document.getElementById('integerInput').value);
    const float = parseFloat(document.getElementById('floatInput').value);
    const exponential = parseFloat(document.getElementById('exponentialInput').value);
    const special = document.getElementById('specialNumberInput').value;

    const results = [
        `Integer: ${integer} (type: ${typeof integer})`,
        `Float: ${float} (fixed: ${float.toFixed(2)})`,
        `Exponential: ${exponential} (scientific: ${exponential.toExponential()})`,
        `Special Number: ${special}`,
        `Math Operations:`,
        `- Square Root: √${integer} = ${Math.sqrt(integer)}`,
        `- Power: ${integer}² = ${Math.pow(integer, 2)}`,
        `- Absolute: |${-float}| = ${Math.abs(-float)}`
    ];

    document.getElementById('numberResults').innerHTML = `
        <h4>Number Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function updateBooleanResults() {
    const directBoolean = document.getElementById('booleanInput').value === 'true';
    const booleanExpression = parseFloat(document.getElementById('booleanExpressionInput').value);

    const results = [
        `Direct Boolean: ${directBoolean} (type: ${typeof directBoolean})`,
        `Boolean Expression: ${booleanExpression} evaluates to ${Boolean(booleanExpression)}`,
        `Logical Operations:`,
        `- AND: ${directBoolean} && true = ${directBoolean && true}`,
        `- OR: ${directBoolean} || false = ${directBoolean || false}`,
        `- NOT: !${directBoolean} = ${!directBoolean}`
    ];

    document.getElementById('booleanResults').innerHTML = `
        <h4>Boolean Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function updateUndefinedNullResults() {
    const undefinedTest = document.getElementById('undefinedTest').value;
    const nullTest = document.getElementById('nullTest').value;

    let testVar;
    if (undefinedTest === 'declared') {
        testVar = '';
    }

    const results = [
        `Undefined Test: ${undefinedTest === 'undefined' ? testVar : 'declared variable'}`,
        `Type of undefined: ${typeof undefined}`,
        `Null Test: ${nullTest === 'null' ? null : {}}`,
        `Type of null: ${typeof null}`,
        `null == undefined: ${null == undefined}`,
        `null === undefined: ${null === undefined}`
    ];

    document.getElementById('undefinedNullResults').innerHTML = `
        <h4>Undefined & Null Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function updateObjectResults() {
    const property = document.getElementById('objectPropertyInput').value;
    const value = document.getElementById('objectValueInput').value;
    
    testObject[property] = value;

    const results = [
        `Object: ${JSON.stringify(testObject)}`,
        `Type: ${typeof testObject}`,
        `Keys: ${Object.keys(testObject).join(', ')}`,
        `Values: ${Object.values(testObject).join(', ')}`,
        `Has Property '${property}': ${testObject.hasOwnProperty(property)}`,
        `Property Value: ${testObject[property]}`
    ];

    document.getElementById('objectResults').innerHTML = `
        <h4>Object Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function addToArray() {
    const newElement = document.getElementById('arrayInput').value;
    currentArray.push(newElement);
    updateArrayResults();
}

function updateArrayResults() {
    const results = [
        `Array: [${currentArray.join(', ')}]`,
        `Length: ${currentArray.length}`,
        `Type: ${typeof currentArray}`,
        `Is Array: ${Array.isArray(currentArray)}`,
        `First Element: ${currentArray[0] || 'none'}`,
        `Last Element: ${currentArray[currentArray.length - 1] || 'none'}`
    ];

    document.getElementById('arrayResults').innerHTML = `
        <h4>Array Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

function updateConversionResults() {
    const value = document.getElementById('conversionInput').value;
    const targetType = document.getElementById('conversionType').value;

    let converted;
    switch (targetType) {
        case 'string':
            converted = String(value);
            break;
        case 'number':
            converted = Number(value);
            break;
        case 'boolean':
            converted = Boolean(value);
            break;
    }

    const results = [
        `Original Value: ${value} (${typeof value})`,
        `Converted to ${targetType}: ${converted} (${typeof converted})`,
        `Using Constructor: ${targetType}(${value}) = ${converted}`,
        `Implicit Conversion: ${value} ${targetType === 'number' ? '* 1' : targetType === 'string' ? '+ ""' : '!!value'} = ${converted}`
    ];

    document.getElementById('conversionResults').innerHTML = `
        <h4>Type Conversion Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

// Update all results
function updateAllResults() {
    updateStringResults();
    updateNumberResults();
    updateBooleanResults();
    updateUndefinedNullResults();
    updateObjectResults();
    updateArrayResults();
    updateConversionResults();
    updateCalculatorResults();
    updateComparisonResults();
}

// Calculator Operations
function updateCalculatorResults() {
    const num1 = parseFloat(document.getElementById('calc1').value);
    const num2 = parseFloat(document.getElementById('calc2').value);
    const operation = document.getElementById('operation').value;

    let result;
    switch (operation) {
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

    document.getElementById('calcResult').innerHTML = `
        <h4>Calculator Results:</h4>
        <p>${num1} ${operation} ${num2} = ${result}</p>
        <p>Result type: ${typeof result}</p>
    `;
}

// Comparison Operations
function updateComparisonResults() {
    const val1 = parseFloat(document.getElementById('compare1').value);
    const val2 = parseFloat(document.getElementById('compare2').value);

    const results = [
        `Equal (==): ${val1} == ${val2} = ${val1 == val2}`,
        `Strictly Equal (===): ${val1} === ${val2} = ${val1 === val2}`,
        `Not Equal (!=): ${val1} != ${val2} = ${val1 != val2}`,
        `Strictly Not Equal (!==): ${val1} !== ${val2} = ${val1 !== val2}`,
        `Greater Than (>): ${val1} > ${val2} = ${val1 > val2}`,
        `Less Than (<): ${val1} < ${val2} = ${val1 < val2}`,
        `Greater Than or Equal (>=): ${val1} >= ${val2} = ${val1 >= val2}`,
        `Less Than or Equal (<=): ${val1} <= ${val2} = ${val1 <= val2}`
    ];

    document.getElementById('compareResults').innerHTML = `
        <h4>Comparison Results:</h4>
        <ul>${results.map(r => `<li>${r}</li>`).join('')}</ul>
    `;
}

// Clear results
function clearAllResults() {
    document.getElementById('typeResults').innerHTML = '';
    document.getElementById('calcResult').innerHTML = '';
    document.getElementById('compareResults').innerHTML = '';
    currentArray = [];
    testObject = {};
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add input event listeners
    const inputs = document.querySelectorAll('.interactive-input');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(updateAllResults, 500));
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            updateAllResults();
        } else if (e.ctrlKey && e.key === 'Delete') {
            clearAllResults();
        }
    });

    // Initial update
    updateAllResults();
});

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
