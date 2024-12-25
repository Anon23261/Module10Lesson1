// ==========================================
// Global Configuration - DO NOT MODIFY
// ==========================================
const PERMANENT_COMMENTS = true; // Makes example comments non-deletable
const DEFAULT_CODE = editor?.getValue() || ''; // Stores initial example code

// Global variables
let editor;
let term;
let currentTheme = 'monokai';
let fontSize = 14;

// ==========================================
// Terminal Configuration
// ==========================================
const terminalConfig = {
    cursorBlink: true,
    cursorStyle: 'block',
    fontSize: 14,
    fontFamily: 'monospace',
    theme: {
        background: '#1a1a1a',
        foreground: '#00ff00',
        cursor: '#00ff00',
        selection: 'rgba(0, 255, 0, 0.3)',
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
};

// ==========================================
// Initialize CodeMirror and setup IDE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeCodeEditor();
    initializeTerminal();
    setupEventListeners();
    createMatrixRain();
});

// Initialize CodeMirror with advanced features
function initializeCodeEditor() {
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;

    editor = CodeMirror.fromTextArea(codeEditor, {
        mode: 'javascript',
        theme: currentTheme,
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        styleActiveLine: true,
        extraKeys: {
            'Ctrl-Space': 'autocomplete',
            'Ctrl-Q': cm => cm.foldCode(cm.getCursor()),
            'Ctrl-Enter': runCode,
            'Ctrl-S': saveCode,
            'Ctrl-F': 'findPersistent',
            'Alt-F': 'replace',
            'Ctrl-/': 'toggleComment'
        }
    });

    // Preserve example code
    if (PERMANENT_COMMENTS) {
        editor.on('beforeChange', (cm, change) => {
            const text = cm.getValue();
            const commentLines = text.split('\n')
                .map((line, i) => line.trim().startsWith('//') ? i : -1)
                .filter(i => i !== -1);

            if (change.from.line <= Math.max(...commentLines)) {
                change.cancel();
            }
        });
    }
}

// Initialize Terminal with full functionality
function initializeTerminal() {
    const terminalContainer = document.getElementById('terminal');
    if (!terminalContainer) return;

    try {
        // Create terminal instance
        term = new Terminal(terminalConfig);
        
        // Add terminal addons
        const fitAddon = new FitAddon.FitAddon();
        const webLinksAddon = new WebLinksAddon.WebLinksAddon();
        const searchAddon = new SearchAddon.SearchAddon();
        
        // Load addons
        term.loadAddon(fitAddon);
        term.loadAddon(webLinksAddon);
        term.loadAddon(searchAddon);

        // Open terminal
        term.open(terminalContainer);
        fitAddon.fit();

        // Welcome message
        term.writeln('\x1b[1;32m=== JavaScript Security Lab Terminal ===\x1b[0m');
        term.writeln('\x1b[90mType "help" for available commands\x1b[0m');
        term.write('\x1b[32m$ \x1b[0m');

        // Terminal input handling
        let currentLine = '';
        term.onKey(({ key, domEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;

            if (domEvent.keyCode === 13) { // Enter
                term.write('\r\n');
                handleTerminalCommand(currentLine);
                currentLine = '';
                term.write('\x1b[32m$ \x1b[0m');
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

        // Handle terminal resize
        window.addEventListener('resize', () => fitAddon.fit());
    } catch (error) {
        console.error('Terminal initialization error:', error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'terminal-error';
        errorMsg.textContent = 'Terminal initialization failed. Please refresh the page.';
        terminalContainer.appendChild(errorMsg);
    }
}

// Handle terminal commands
function handleTerminalCommand(command) {
    const cmd = command.trim().toLowerCase();
    
    switch (cmd) {
        case 'help':
            term.writeln('\r\n\x1b[1;36mAvailable Commands:\x1b[0m');
            term.writeln('  help     - Show this help message');
            term.writeln('  clear    - Clear terminal');
            term.writeln('  run      - Run current code');
            term.writeln('  reset    - Reset editor to default code');
            term.writeln('  theme    - Show current theme');
            term.writeln('  version  - Show IDE version');
            break;
            
        case 'clear':
            term.clear();
            break;
            
        case 'run':
            term.writeln('\r\n\x1b[33mExecuting code...\x1b[0m');
            runCode();
            break;
            
        case 'reset':
            editor.setValue(DEFAULT_CODE);
            term.writeln('\r\n\x1b[32mEditor reset to default code\x1b[0m');
            break;
            
        case 'theme':
            term.writeln(`\r\n\x1b[32mCurrent theme: ${currentTheme}\x1b[0m`);
            break;
            
        case 'version':
            term.writeln('\r\n\x1b[32mJavaScript Security Lab v1.0.0\x1b[0m');
            break;
            
        case '':
            break;
            
        default:
            term.writeln(`\r\n\x1b[31mCommand not found: ${command}\x1b[0m`);
            term.writeln('\x1b[90mType "help" for available commands\x1b[0m');
    }
}

// Run code with proper error handling and output
function runCode() {
    if (!editor || !term) return;
    
    const code = editor.getValue();
    const startTime = performance.now();
    
    // Clear previous output
    clearOutput();
    
    try {
        // Create a safe evaluation context
        const consoleOutput = [];
        const safeConsole = {
            log: (...args) => {
                const output = args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ');
                consoleOutput.push(['log', output]);
                term.writeln(`\r\n\x1b[37m${output}\x1b[0m`);
            },
            error: (...args) => {
                const output = args.map(arg => String(arg)).join(' ');
                consoleOutput.push(['error', output]);
                term.writeln(`\r\n\x1b[31m${output}\x1b[0m`);
            },
            warn: (...args) => {
                const output = args.map(arg => String(arg)).join(' ');
                consoleOutput.push(['warn', output]);
                term.writeln(`\r\n\x1b[33m${output}\x1b[0m`);
            }
        };

        // Create evaluation context
        const context = {
            console: safeConsole,
            setTimeout, 
            clearTimeout,
            setInterval,
            clearInterval,
            Date,
            Math,
            JSON,
            String,
            Number,
            Boolean,
            Array,
            Object,
            Error
        };

        // Run code in safe context
        const result = new Function('context', `
            with (context) {
                ${code}
            }
        `)(context);

        // Show execution time
        const endTime = performance.now();
        const executionTime = (endTime - startTime).toFixed(2);
        term.writeln(`\r\n\x1b[32mCode executed successfully in ${executionTime}ms\x1b[0m`);
        updateExecutionTime(executionTime);

        // Update problems panel
        document.getElementById('problems').innerHTML = '<div class="success">No errors found</div>';
        
        // Run JSHint validation
        if (window.JSHINT) {
            JSHINT(code);
            if (JSHINT.errors.length) {
                const warnings = JSHINT.errors.map(err => 
                    `<div class="warning">Line ${err.line}: ${err.reason}</div>`
                ).join('');
                document.getElementById('problems').innerHTML = warnings;
            }
        }

    } catch (error) {
        term.writeln(`\r\n\x1b[31mError: ${error.message}\x1b[0m`);
        updateProblems(error);
        console.error('Execution error:', error);
    }
}

// Save code to localStorage
function saveCode() {
    if (!editor) return;
    const code = editor.getValue();
    localStorage.setItem('savedCode', code);
    term.writeln('\r\n\x1b[32mCode saved successfully\x1b[0m');
}

// Clear terminal output
function clearOutput() {
    if (term) {
        term.clear();
        term.write('\x1b[32m$ \x1b[0m');
    }
}

// Update the problems panel with error information
function updateProblems(error) {
    const problemsPanel = document.getElementById('problems');
    if (!problemsPanel) return;

    const errorHtml = `
        <div class="error">
            <div class="error-title">${error.name}</div>
            <div class="error-message">${error.message}</div>
            ${error.stack ? `<div class="error-stack">${error.stack}</div>` : ''}
        </div>
    `;
    problemsPanel.innerHTML = errorHtml;
}

// Update execution time in status bar
function updateExecutionTime(time) {
    const executionTime = document.getElementById('executionTime');
    if (executionTime) {
        executionTime.textContent = `Execution: ${time}ms`;
    }
}

// Update cursor position in status bar
function updateCursorPosition() {
    if (!editor) return;
    const pos = editor.getCursor();
    const cursorPosition = document.getElementById('cursorPosition');
    if (cursorPosition) {
        cursorPosition.textContent = `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
    }
}

// Update file size in status bar
function updateFileSize() {
    if (!editor) return;
    const size = new Blob([editor.getValue()]).size;
    const fileSize = document.getElementById('fileSize');
    if (fileSize) {
        fileSize.textContent = `Size: ${size} bytes`;
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Button Event Listeners
    const buttons = {
        runButton: runCode,
        clearButton: () => editor?.setValue(''),
        formatButton: formatCode,
        copyCode: copyToClipboard,
        downloadCode: downloadCode
    };

    Object.entries(buttons).forEach(([id, handler]) => {
        const button = document.getElementById(id);
        if (button) button.addEventListener('click', handler);
    });

    // Tab Management
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.panel-tab').forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            const panel = tab.getAttribute('data-panel');
            const panelElement = document.getElementById(panel);
            if (panelElement) {
                panelElement.classList.add('active');
            }
        });
    });

    // Theme Selector
    const themeSelect = document.getElementById('syntaxTheme');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            currentTheme = e.target.value;
            if (editor) {
                editor.setOption('theme', currentTheme);
            }
        });
    }

    // Font Size Selector
    const fontSizeSelect = document.getElementById('fontSize');
    if (fontSizeSelect) {
        fontSizeSelect.addEventListener('change', (e) => {
            fontSize = parseInt(e.target.value);
            if (editor) {
                editor.getWrapperElement().style.fontSize = `${fontSize}px`;
            }
            if (term) {
                term.setOption('fontSize', fontSize);
            }
        });
    }

    // Editor Event Listeners
    if (editor) {
        editor.on('cursorActivity', updateCursorPosition);
        editor.on('change', () => {
            updateFileSize();
            // Auto-save code
            localStorage.setItem('savedCode', editor.getValue());
        });
    }
}

// Format code using Prettier
function formatCode() {
    if (!editor) return;
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            singleQuote: true,
            trailingComma: 'es5',
            bracketSpacing: true,
            semi: true,
            tabWidth: 4
        });
        editor.setValue(formatted);
        term.writeln('\r\n\x1b[32mCode formatted successfully\x1b[0m');
    } catch (error) {
        term.writeln(`\r\n\x1b[31mFormatting error: ${error.message}\x1b[0m`);
        updateProblems(error);
    }
}

// Copy code to clipboard
function copyToClipboard() {
    if (!editor) return;
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        term.writeln('\r\n\x1b[32mCode copied to clipboard\x1b[0m');
    }).catch(error => {
        term.writeln('\r\n\x1b[31mFailed to copy code\x1b[0m');
        console.error('Copy error:', error);
    });
}

// Download code as file
function downloadCode() {
    if (!editor) return;
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    term.writeln('\r\n\x1b[32mCode downloaded successfully\x1b[0m');
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.getElementById('matrixBg');
    if (!canvas) return;

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';

    const ctx = canvas.getContext('2d', { 
        willReadFrequently: true,
        alpha: false,
        desynchronized: true
    });
    if (!ctx) return;

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
        if (!ctx) return;
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

    setupMatrix();
    window.addEventListener('resize', setupMatrix);
    setInterval(drawMatrix, 50);
}
