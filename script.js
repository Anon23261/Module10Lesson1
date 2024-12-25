// ==========================================
// Global Variables
// ==========================================
let editor;
let term;
let currentTheme = 'monokai';
let fontSize = 14;
let DEFAULT_CODE = '';

// ==========================================
// CodeMirror Configuration
// ==========================================
function initializeCodeEditor() {
    editor = CodeMirror.fromTextArea(document.getElementById('codeEditor'), {
        mode: 'javascript',
        theme: currentTheme,
        lineNumbers: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        extraKeys: {
            'Ctrl-Space': 'autocomplete',
            'Ctrl-/': 'toggleComment',
            'Ctrl-Enter': runCode,
            'Cmd-Enter': runCode
        },
        styleActiveLine: true,
        indentUnit: 4,
        tabSize: 4,
        lineWrapping: true,
        viewportMargin: Infinity
    });

    editor.setSize('100%', '100%');
    editor.on('change', updateFileSize);
    editor.on('cursorActivity', updateCursorPosition);

    DEFAULT_CODE = editor.getValue();
}

// ==========================================
// Terminal Configuration
// ==========================================
function initializeTerminal() {
    const terminalElement = document.getElementById('terminal');
    term = new Terminal({
        cursorBlink: true,
        fontSize: fontSize,
        fontFamily: 'Consolas, monospace',
        theme: {
            background: '#1e1e1e',
            foreground: '#ffffff'
        }
    });

    const fitAddon = new FitAddon.FitAddon();
    term.loadAddon(fitAddon);
    term.loadAddon(new WebLinksAddon.WebLinksAddon());
    term.loadAddon(new SearchAddon.SearchAddon());

    term.open(terminalElement);
    fitAddon.fit();

    term.writeln('JavaScript Security Lab Terminal');
    term.writeln('Type "help" for available commands');
    term.writeln('');
    
    term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey;
        if (domEvent.keyCode === 13) {
            handleTerminalCommand();
        } else if (printable) {
            term.write(key);
        }
    });

    window.addEventListener('resize', () => fitAddon.fit());
}

// ==========================================
// Event Listeners
// ==========================================
function setupEventListeners() {
    // Button Events
    document.getElementById('runButton').addEventListener('click', runCode);
    document.getElementById('clearButton').addEventListener('click', clearCode);
    document.getElementById('formatButton').addEventListener('click', formatCode);
    document.getElementById('copyCode').addEventListener('click', copyToClipboard);
    document.getElementById('downloadCode').addEventListener('click', downloadCode);

    // Theme and Font Size Events
    document.getElementById('syntaxTheme').addEventListener('change', changeTheme);
    document.getElementById('fontSize').addEventListener('change', changeFontSize);

    // Panel Navigation
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.addEventListener('click', () => switchPanel(tab.dataset.panel));
    });
}

// ==========================================
// Code Execution
// ==========================================
function runCode() {
    const code = editor.getValue();
    const startTime = performance.now();
    
    try {
        // Clear previous problems
        document.getElementById('problems').innerHTML = '';
        
        // Validate code with JSHint
        JSHINT(code);
        const errors = JSHINT.errors;
        if (errors && errors.length > 0) {
            displayProblems(errors);
        }

        // Create a secure context for evaluation
        const secureEval = new Function('console', `
            const secureConsole = {
                log: (...args) => console.log(...args),
                error: (...args) => console.error(...args),
                warn: (...args) => console.warn(...args),
                info: (...args) => console.info(...args)
            };
            with (secureConsole) {
                ${code}
            }
        `);

        // Custom console for terminal output
        const terminalConsole = {
            log: (...args) => term.writeln(args.join(' ')),
            error: (...args) => term.writeln('\x1b[31m' + args.join(' ') + '\x1b[0m'),
            warn: (...args) => term.writeln('\x1b[33m' + args.join(' ') + '\x1b[0m'),
            info: (...args) => term.writeln('\x1b[36m' + args.join(' ') + '\x1b[0m')
        };

        secureEval(terminalConsole);
    } catch (error) {
        term.writeln('\x1b[31mError: ' + error.message + '\x1b[0m');
    }

    const endTime = performance.now();
    updateExecutionTime(endTime - startTime);
}

// ==========================================
// UI Updates
// ==========================================
function updateCursorPosition() {
    const pos = editor.getCursor();
    document.getElementById('cursorPosition').textContent = 
        `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
}

function updateFileSize() {
    const size = new Blob([editor.getValue()]).size;
    document.getElementById('fileSize').textContent = `Size: ${size} bytes`;
}

function updateExecutionTime(time) {
    document.getElementById('executionTime').textContent = 
        `Execution: ${Math.round(time)}ms`;
}

function displayProblems(errors) {
    const problemsPanel = document.getElementById('problems');
    problemsPanel.innerHTML = '';

    errors.forEach(error => {
        if (!error) return;
        
        const problemDiv = document.createElement('div');
        problemDiv.className = 'problem-item';
        problemDiv.innerHTML = `
            <span class="problem-line">Line ${error.line}:</span>
            <span class="problem-message">${error.reason}</span>
        `;
        
        problemDiv.addEventListener('click', () => {
            editor.setCursor(error.line - 1, error.character - 1);
            editor.focus();
        });

        problemsPanel.appendChild(problemDiv);
    });
}

// ==========================================
// UI Actions
// ==========================================
function clearCode() {
    if (confirm('Are you sure you want to clear the editor?')) {
        editor.setValue('');
        editor.focus();
    }
}

function formatCode() {
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            semi: true,
            singleQuote: true
        });
        editor.setValue(formatted);
    } catch (error) {
        term.writeln('\x1b[31mFormat Error: ' + error.message + '\x1b[0m');
    }
}

function copyToClipboard() {
    const code = editor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        term.writeln('\x1b[32mCode copied to clipboard!\x1b[0m');
    }).catch(err => {
        term.writeln('\x1b[31mFailed to copy: ' + err.message + '\x1b[0m');
    });
}

function downloadCode() {
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
}

function changeTheme(event) {
    const theme = event.target.value;
    editor.setOption('theme', theme);
    currentTheme = theme;
}

function changeFontSize(event) {
    const size = event.target.value;
    fontSize = parseInt(size);
    editor.getWrapperElement().style.fontSize = size + 'px';
    term.setOption('fontSize', fontSize);
}

function switchPanel(panelId) {
    document.querySelectorAll('.panel-section').forEach(panel => {
        panel.classList.remove('active');
    });
    document.querySelectorAll('.panel-tab').forEach(tab => {
        tab.classList.remove('active');
        tab.setAttribute('aria-selected', 'false');
    });
    
    document.getElementById(panelId).classList.add('active');
    const activeTab = document.querySelector(`[data-panel="${panelId}"]`);
    activeTab.classList.add('active');
    activeTab.setAttribute('aria-selected', 'true');
}

// ==========================================
// Terminal Commands
// ==========================================
function handleTerminalCommand() {
    term.writeln('');
    const command = term.buffer.active.getLine(term.buffer.active.baseY + term.buffer.active.cursorY).translateToString().trim();
    
    switch (command.toLowerCase()) {
        case 'help':
            term.writeln('Available commands:');
            term.writeln('  help     - Show this help message');
            term.writeln('  clear    - Clear the terminal');
            term.writeln('  run      - Run the current code');
            term.writeln('  reset    - Reset the editor to default code');
            term.writeln('  theme    - Show current theme');
            term.writeln('  version  - Show version information');
            break;
            
        case 'clear':
            term.clear();
            break;
            
        case 'run':
            term.writeln('Running code...');
            runCode();
            break;
            
        case 'reset':
            editor.setValue(DEFAULT_CODE);
            term.writeln('Editor reset to default code');
            break;
            
        case 'theme':
            term.writeln('Current theme: ' + currentTheme);
            break;
            
        case 'version':
            term.writeln('JavaScript Security Lab v1.0.0');
            term.writeln('CodeMirror: ' + CodeMirror.version);
            term.writeln('Terminal: ' + Terminal.version);
            break;
            
        default:
            if (command) {
                term.writeln('Unknown command: ' + command);
                term.writeln('Type "help" for available commands');
            }
    }
    
    term.write('\r\n$ ');
}

// ==========================================
// Matrix Background Animation
// ==========================================
function createMatrixRain() {
    const canvas = document.getElementById('matrixBg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillStyle = '#0F0';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    
    setInterval(draw, 35);
}

// ==========================================
// Initialize Everything
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeCodeEditor();
    initializeTerminal();
    setupEventListeners();
    createMatrixRain();
});
