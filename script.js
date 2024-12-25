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
    const stringInput = document.getElementById('stringInput');
    const stringConcatInput = document.getElementById('stringConcatInput');
    const templateInput = document.getElementById('templateInput');
    const stringResults = document.getElementById('stringResults');

    // Only proceed if all elements exist
    if (!stringInput || !stringConcatInput || !templateInput || !stringResults) {
        return;
    }

    const basicString = stringInput.value;
    const concatString = stringConcatInput.value;
    const templateString = templateInput.value;

    const results = [
        `Basic String: "${basicString}" (length: ${basicString.length})`,
        `Concatenation: "${basicString + ' ' + concatString}"`,
        `Template Literal: \`Hello, ${templateString}!\``,
        `Upper Case: "${basicString.toUpperCase()}"`,
        `Lower Case: "${basicString.toLowerCase()}"`,
        `Character at 0: "${basicString.charAt(0)}"`,
        `Type: ${typeof basicString}`
    ];

    stringResults.innerHTML = `
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
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror
    const editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        extraKeys: {
            'Ctrl-Space': 'autocomplete',
            'Ctrl-Q': function(cm) {
                cm.foldCode(cm.getCursor());
            },
            'Ctrl-Enter': function() {
                runCode();
            }
        }
    });

    // Initialize Terminal
    const term = new Terminal({
        cursorBlink: true,
        cursorStyle: 'block',
        fontSize: 14,
        fontFamily: 'monospace',
        theme: {
            background: '#1a1a1a',
            foreground: '#00ff00'
        }
    });
    
    const terminalContainer = document.getElementById('terminal');
    if (terminalContainer) {
        term.open(terminalContainer);
        const fitAddon = new FitAddon.FitAddon();
        term.loadAddon(fitAddon);
        fitAddon.fit();
        term.write('JavaScript Security Lab Terminal\r\n$ ');
    }

    // Initialize event listeners only if elements exist
    const runButton = document.getElementById('runButton');
    if (runButton) {
        runButton.addEventListener('click', runCode);
    }

    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            editor.setValue('');
            clear();
        });
    }

    const formatButton = document.getElementById('formatButton');
    if (formatButton) {
        formatButton.addEventListener('click', () => {
            const code = editor.getValue();
            try {
                const formatted = prettier.format(code, {
                    parser: 'babel',
                    plugins: prettierPlugins,
                    singleQuote: true,
                    semi: true,
                    tabWidth: 4
                });
                editor.setValue(formatted);
            } catch (err) {
                error('Failed to format code: ' + err.message);
            }
        });
    }

    const copyButton = document.getElementById('copyCode');
    if (copyButton) {
        copyButton.addEventListener('click', () => {
            const code = editor.getValue();
            navigator.clipboard.writeText(code).then(() => {
                success('Code copied to clipboard!');
            }).catch(err => {
                error('Failed to copy code: ' + err.message);
            });
        });
    }

    // Only call updateAllResults if the necessary elements exist
    const requiredElements = [
        'stringInput', 'stringConcatInput', 'templateInput',
        'stringResults', 'numberResults', 'booleanResults'
    ];
    
    const allElementsExist = requiredElements.every(id => document.getElementById(id));
    if (allElementsExist) {
        updateAllResults();
    }
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

// Code Execution
function runCode() {
    const code = editor.getValue();
    const startTime = performance.now();
    
    try {
        // Create a secure context for code execution
        const secureEval = new Function('output', `
            with (Object.create(null)) {
                try {
                    ${code}
                } catch (error) {
                    output.error(error.message);
                    throw error;
                }
            }
        `);
        
        secureEval(output);
        const endTime = performance.now();
        output.success(`Code executed successfully in ${(endTime - startTime).toFixed(2)}ms`);
        updateExecutionTime(endTime - startTime);
        analyzeCode(code);
    } catch (error) {
        output.error(error.message);
        updateProblems(error);
    }
}

// Code Analysis
function analyzeCode(code) {
    try {
        const ast = acorn.parse(code, { ecmaVersion: 2020 });
        const variables = new Set();
        const functions = new Set();
        
        acorn.walk.simple(ast, {
            VariableDeclarator(node) {
                if (node.id && node.id.name) {
                    variables.add(node.id.name);
                }
            },
            FunctionDeclaration(node) {
                if (node.id && node.id.name) {
                    functions.add(node.id.name);
                }
            }
        });
        
        updateTypeInspector(Array.from(variables), Array.from(functions));
    } catch (error) {
        console.error('Analysis error:', error);
    }
}

// UI Updates
function updateTypeInspector(variables, functions) {
    const inspector = document.getElementById('typeInspector');
    if (!inspector) return;
    
    inspector.innerHTML = `
        <div class="inspector-section">
            <h4>Variables (${variables.length})</h4>
            ${variables.map(v => `<div class="inspector-item">${v}</div>`).join('')}
        </div>
        <div class="inspector-section">
            <h4>Functions (${functions.length})</h4>
            ${functions.map(f => `<div class="inspector-item">${f}</div>`).join('')}
        </div>
    `;
}

function updateProblems(error) {
    const problems = document.getElementById('problems');
    if (!problems) return;
    
    problems.innerHTML += `
        <div class="problem-item error">
            <i class="fas fa-exclamation-circle"></i>
            ${error.message}
            <div class="problem-location">at line ${error.lineNumber || 'unknown'}</div>
        </div>
    `;
}

function updateExecutionTime(time) {
    const timeElement = document.getElementById('executionTime');
    if (!timeElement) return;
    timeElement.textContent = `Execution: ${time.toFixed(2)}ms`;
}

// Event Listeners
document.getElementById('runButton').addEventListener('click', runCode);

document.getElementById('clearButton').addEventListener('click', () => {
    editor.setValue('');
    output.clear();
});

document.getElementById('formatButton').addEventListener('click', () => {
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            singleQuote: true,
            tabWidth: 4
        });
        editor.setValue(formatted);
        output.info('Code formatted successfully');
    } catch (error) {
        output.error('Format error: ' + error.message);
    }
});

// Copy button handler
document.getElementById('copyCode').addEventListener('click', () => {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        output.info('Code copied to clipboard!');
    }).catch(err => {
        output.error('Failed to copy code: ' + err.message);
    });
});

// Status bar updates
editor.on('cursorActivity', () => {
    const pos = editor.getCursor();
    document.getElementById('cursorPosition').textContent = 
        `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
});

editor.on('change', () => {
    const size = new Blob([editor.getValue()]).size;
    document.getElementById('fileSize').textContent = 
        `Size: ${size} bytes`;
});

// Theme Selector
document.getElementById('syntaxTheme').addEventListener('change', (e) => {
    editor.setOption('theme', e.target.value);
});

// Tab Management
document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        const panel = tab.getAttribute('data-panel');
        document.getElementById(panel).classList.add('active');
    });
});

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01'.split('');
    const drops = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Initialize Matrix Rain
createMatrixRain();

// Initial setup
editor.refresh();
editor.focus();

// Output Console
const output = {
    log: function(message) {
        const outputDiv = document.getElementById('output');
        if (!outputDiv) return;
        const logEntry = document.createElement('div');
        logEntry.className = 'console-log';
        logEntry.textContent = message;
        outputDiv.appendChild(logEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    },
    error: function(message) {
        const outputDiv = document.getElementById('output');
        if (!outputDiv) return;
        const errorEntry = document.createElement('div');
        errorEntry.className = 'console-error';
        errorEntry.textContent = '❌ ' + message;
        outputDiv.appendChild(errorEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    },
    info: function(message) {
        const outputDiv = document.getElementById('output');
        if (!outputDiv) return;
        const infoEntry = document.createElement('div');
        infoEntry.className = 'console-info';
        infoEntry.textContent = 'ℹ️ ' + message;
        outputDiv.appendChild(infoEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    },
    success: function(message) {
        const outputDiv = document.getElementById('output');
        if (!outputDiv) return;
        const successEntry = document.createElement('div');
        successEntry.className = 'console-success';
        successEntry.textContent = '✅ ' + message;
        outputDiv.appendChild(successEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
    },
    clear: function() {
        const outputDiv = document.getElementById('output');
        if (!outputDiv) return;
        outputDiv.innerHTML = '';
        const problemsDiv = document.getElementById('problems');
        if (problemsDiv) {
            problemsDiv.innerHTML = '';
        }
    }
};

// Code Execution
function runCode() {
    const code = editor.getValue();
    const startTime = performance.now();
    
    try {
        // Create a secure context for code execution
        const secureEval = new Function('output', `
            with (Object.create(null)) {
                try {
                    ${code}
                } catch (error) {
                    output.error(error.message);
                    throw error;
                }
            }
        `);
        
        secureEval(output);
        const endTime = performance.now();
        output.success(`Code executed successfully in ${(endTime - startTime).toFixed(2)}ms`);
        updateExecutionTime(endTime - startTime);
        analyzeCode(code);
    } catch (error) {
        output.error(error.message);
        updateProblems(error);
    }
}

// Code Analysis
function analyzeCode(code) {
    try {
        const ast = acorn.parse(code, { ecmaVersion: 2020 });
        const variables = new Set();
        const functions = new Set();
        
        acorn.walk.simple(ast, {
            VariableDeclarator(node) {
                if (node.id && node.id.name) {
                    variables.add(node.id.name);
                }
            },
            FunctionDeclaration(node) {
                if (node.id && node.id.name) {
                    functions.add(node.id.name);
                }
            }
        });
        
        updateTypeInspector(Array.from(variables), Array.from(functions));
    } catch (error) {
        console.error('Analysis error:', error);
    }
}

// UI Updates
function updateTypeInspector(variables, functions) {
    const inspector = document.getElementById('typeInspector');
    if (!inspector) return;
    
    inspector.innerHTML = `
        <div class="inspector-section">
            <h4>Variables (${variables.length})</h4>
            ${variables.map(v => `<div class="inspector-item">${v}</div>`).join('')}
        </div>
        <div class="inspector-section">
            <h4>Functions (${functions.length})</h4>
            ${functions.map(f => `<div class="inspector-item">${f}</div>`).join('')}
        </div>
    `;
}

function updateProblems(error) {
    const problems = document.getElementById('problems');
    if (!problems) return;
    
    problems.innerHTML += `
        <div class="problem-item error">
            <i class="fas fa-exclamation-circle"></i>
            ${error.message}
            <div class="problem-location">at line ${error.lineNumber || 'unknown'}</div>
        </div>
    `;
}

function updateExecutionTime(time) {
    const timeElement = document.getElementById('executionTime');
    if (!timeElement) return;
    timeElement.textContent = `Execution: ${time.toFixed(2)}ms`;
}

// Event Listeners
document.getElementById('runButton').addEventListener('click', runCode);

document.getElementById('clearButton').addEventListener('click', () => {
    editor.setValue('');
    output.clear();
});

document.getElementById('formatButton').addEventListener('click', () => {
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            singleQuote: true,
            tabWidth: 4
        });
        editor.setValue(formatted);
        output.info('Code formatted successfully');
    } catch (error) {
        output.error('Format error: ' + error.message);
    }
});

// Copy button handler
document.getElementById('copyCode').addEventListener('click', () => {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        output.info('Code copied to clipboard!');
    }).catch(err => {
        output.error('Failed to copy code: ' + err.message);
    });
});

// Status bar updates
editor.on('cursorActivity', () => {
    const pos = editor.getCursor();
    document.getElementById('cursorPosition').textContent = 
        `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
});

editor.on('change', () => {
    const size = new Blob([editor.getValue()]).size;
    document.getElementById('fileSize').textContent = 
        `Size: ${size} bytes`;
});

// Theme Selector
document.getElementById('syntaxTheme').addEventListener('change', (e) => {
    editor.setOption('theme', e.target.value);
});

// Tab Management
document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        const panel = tab.getAttribute('data-panel');
        document.getElementById(panel).classList.add('active');
    });
});

// Initialize Terminal
const term = new Terminal({
    cursorBlink: true,
    cursorStyle: 'block',
    fontSize: 14,
    fontFamily: 'Courier New',
    theme: {
        background: '#000000',
        foreground: '#ffffff',
        cursor: '#ff0000',
        selection: 'rgba(255, 0, 0, 0.3)',
        black: '#000000',
        red: '#ff0000',
        green: '#33ff00',
        yellow: '#ffff00',
        blue: '#0066ff',
        magenta: '#cc00ff',
        cyan: '#00ffff',
        white: '#d0d0d0',
        brightBlack: '#808080',
        brightRed: '#ff0000',
        brightGreen: '#33ff00',
        brightYellow: '#ffff00',
        brightBlue: '#0066ff',
        brightMagenta: '#cc00ff',
        brightCyan: '#00ffff',
        brightWhite: '#ffffff'
    }
});

term.open(document.getElementById('terminal'));
term.write('JavaScript Security Lab Terminal\r\n$ ');

// Terminal Input Handler
let currentLine = '';
term.onKey(({ key, domEvent }) => {
    const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

    if (domEvent.keyCode === 13) { // Enter
        term.write('\r\n');
        executeCommand(currentLine);
        currentLine = '';
        term.write('$ ');
    } else if (domEvent.keyCode === 8) { // Backspace
        if (currentLine.length > 0) {
            currentLine = currentLine.slice(0, -1);
            term.write('\b \b');
        }
    } else if (printable) {
        currentLine += key;
        term.write(key);
    }
});

// Command Execution
function executeCommand(command) {
    if (!command) return;

    switch (command.trim().toLowerCase()) {
        case 'clear':
            term.clear();
            term.write('JavaScript Security Lab Terminal\r\n$ ');
            break;
        case 'help':
            term.write(
                'Available commands:\r\n' +
                '  clear     Clear the terminal\r\n' +
                '  help      Show this help message\r\n' +
                '  run       Run the current code\r\n' +
                '  theme     Show available themes\r\n' +
                '  version   Show environment version\r\n'
            );
            break;
        case 'run':
            term.write('Executing code...\r\n');
            runCode();
            break;
        case 'theme':
            term.write(
                'Available themes:\r\n' +
                '  monokai\r\n' +
                '  dracula\r\n' +
                '  material\r\n'
            );
            break;
        case 'version':
            term.write('JavaScript Security Lab v1.0.0\r\n');
            break;
        default:
            try {
                const result = eval(command);
                term.write(String(result) + '\r\n');
            } catch (error) {
                term.write('Error: ' + error.message + '\r\n');
            }
    }
}

// Output Console
const outputConsole = {
    log: function(message) {
        const outputDiv = document.getElementById('output');
        const logEntry = document.createElement('div');
        logEntry.className = 'console-log';
        logEntry.textContent = message;
        outputDiv.appendChild(logEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        term.write('[LOG] ' + message + '\r\n');
    },
    error: function(message) {
        const outputDiv = document.getElementById('output');
        const errorEntry = document.createElement('div');
        errorEntry.className = 'console-error';
        errorEntry.textContent = '❌ ' + message;
        outputDiv.appendChild(errorEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        term.write('[ERROR] ' + message + '\r\n');
    },
    info: function(message) {
        const outputDiv = document.getElementById('output');
        const infoEntry = document.createElement('div');
        infoEntry.className = 'console-info';
        infoEntry.textContent = 'ℹ️ ' + message;
        outputDiv.appendChild(infoEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        term.write('[INFO] ' + message + '\r\n');
    },
    success: function(message) {
        const outputDiv = document.getElementById('output');
        const successEntry = document.createElement('div');
        successEntry.className = 'console-success';
        successEntry.textContent = '✅ ' + message;
        outputDiv.appendChild(successEntry);
        outputDiv.scrollTop = outputDiv.scrollHeight;
        term.write('[SUCCESS] ' + message + '\r\n');
    },
    clear: function() {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = '';
        document.getElementById('problems').innerHTML = '';
    }
};

// Code Execution
function runCode() {
    const code = editor.getValue();
    const startTime = performance.now();
    
    try {
        // Create a secure context for code execution
        const secureEval = new Function('output', `
            with (Object.create(null)) {
                try {
                    ${code}
                } catch (error) {
                    output.error(error.message);
                    throw error;
                }
            }
        `);
        
        secureEval(outputConsole);
        const endTime = performance.now();
        outputConsole.success(`Code executed successfully in ${(endTime - startTime).toFixed(2)}ms`);
        updateExecutionTime(endTime - startTime);
        analyzeCode(code);
    } catch (error) {
        outputConsole.error(error.message);
        updateProblems(error);
    }
}

// Code Analysis
function analyzeCode(code) {
    try {
        const ast = acorn.parse(code, { ecmaVersion: 2020 });
        const variables = new Set();
        const functions = new Set();
        
        acorn.walk.simple(ast, {
            VariableDeclarator(node) {
                variables.add(node.id.name);
            },
            FunctionDeclaration(node) {
                functions.add(node.id.name);
            }
        });
        
        updateTypeInspector(Array.from(variables), Array.from(functions));
    } catch (error) {
        console.error('Analysis error:', error);
    }
}

// UI Updates
function updateTypeInspector(variables, functions) {
    const inspector = document.getElementById('typeInspector');
    inspector.innerHTML = `
        <div class="inspector-section">
            <h4>Variables (${variables.length})</h4>
            ${variables.map(v => `<div class="inspector-item">${v}</div>`).join('')}
        </div>
        <div class="inspector-section">
            <h4>Functions (${functions.length})</h4>
            ${functions.map(f => `<div class="inspector-item">${f}</div>`).join('')}
        </div>
    `;
}

function updateProblems(error) {
    const problems = document.getElementById('problems');
    problems.innerHTML += `
        <div class="problem-item error">
            <i class="fas fa-exclamation-circle"></i>
            ${error.message}
            <div class="problem-location">at line ${error.lineNumber || 'unknown'}</div>
        </div>
    `;
}

function updateExecutionTime(time) {
    document.getElementById('executionTime').textContent = `Execution: ${time.toFixed(2)}ms`;
}

// Event Listeners
document.getElementById('runButton').addEventListener('click', runCode);

document.getElementById('clearButton').addEventListener('click', () => {
    editor.setValue('');
    outputConsole.clear();
    term.clear();
    term.write('JavaScript Security Lab Terminal\r\n$ ');
});

document.getElementById('formatButton').addEventListener('click', () => {
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            singleQuote: true,
            tabWidth: 4
        });
        editor.setValue(formatted);
        outputConsole.info('Code formatted successfully');
    } catch (error) {
        outputConsole.error('Format error: ' + error.message);
    }
});

// Copy button handler
document.getElementById('copyCode').addEventListener('click', () => {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        outputConsole.info('Code copied to clipboard!');
    }).catch(err => {
        outputConsole.error('Failed to copy code: ' + err.message);
    });
});

// Status bar updates
editor.on('cursorActivity', () => {
    const pos = editor.getCursor();
    document.getElementById('cursorPosition').textContent = 
        `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
});

editor.on('change', () => {
    const size = new Blob([editor.getValue()]).size;
    document.getElementById('fileSize').textContent = 
        `Size: ${size} bytes`;
});

// Theme Selector
document.getElementById('syntaxTheme').addEventListener('change', (e) => {
    editor.setOption('theme', e.target.value);
});

// Tab Management
document.querySelectorAll('.panel-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
        
        tab.classList.add('active');
        const panel = tab.getAttribute('data-panel');
        document.getElementById(panel).classList.add('active');
    });
});

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01'.split('');
    const drops = [];
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Initialize Matrix Rain
createMatrixRain();

// Initial setup
editor.refresh();
editor.focus();
