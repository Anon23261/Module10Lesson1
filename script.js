// Global variables
let editor;
let term;

// Initialize CodeMirror and setup IDE
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror
    const codeEditor = document.getElementById('codeEditor');
    if (!codeEditor) return;

    editor = CodeMirror.fromTextArea(codeEditor, {
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
    const terminalContainer = document.getElementById('terminal');
    if (terminalContainer) {
        term = new Terminal({
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
        });

        try {
            term.open(terminalContainer);
            const fitAddon = new FitAddon.FitAddon();
            term.loadAddon(fitAddon);
            fitAddon.fit();
            term.write('JavaScript Security Lab Terminal\r\n$ ');
        } catch (error) {
            console.error('Terminal initialization error:', error);
        }
    }

    // Button Event Listeners
    setupEventListeners();

    // Initialize Matrix Background Effect
    createMatrixRain();

    // Initial setup
    editor.refresh();
    editor.focus();
});

// Setup Event Listeners
function setupEventListeners() {
    const runButton = document.getElementById('runButton');
    if (runButton) {
        runButton.addEventListener('click', runCode);
    }

    const clearButton = document.getElementById('clearButton');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (editor) {
                editor.setValue('');
                clearOutput();
            }
        });
    }

    const formatButton = document.getElementById('formatButton');
    if (formatButton) {
        formatButton.addEventListener('click', formatCode);
    }

    const copyButton = document.getElementById('copyCode');
    if (copyButton) {
        copyButton.addEventListener('click', copyToClipboard);
    }

    // Tab Management
    const tabs = document.querySelectorAll('.panel-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.panel-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
            
            tab.classList.add('active');
            const panel = tab.getAttribute('data-panel');
            const panelElement = document.getElementById(panel);
            if (panelElement) {
                panelElement.classList.add('active');
            }
        });
    });

    // Status Bar Updates
    if (editor) {
        editor.on('cursorActivity', updateCursorPosition);
        editor.on('change', updateFileSize);
    }

    // Theme Selector
    const themeSelect = document.getElementById('syntaxTheme');
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            if (editor) {
                editor.setOption('theme', e.target.value);
            }
        });
    }
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

// IDE Functions
function runCode() {
    if (!editor) return;
    const code = editor.getValue();
    const startTime = performance.now();
    
    try {
        // Create a secure context for code execution
        const secureEval = new Function('console', `
            with (Object.create(null)) {
                try {
                    ${code}
                } catch (error) {
                    console.error(error.message);
                    throw error;
                }
            }
        `);
        
        const output = document.getElementById('output');
        if (output) {
            output.innerHTML = '';
        }
        
        secureEval(console);
        const endTime = performance.now();
        updateExecutionTime(endTime - startTime);
        
    } catch (error) {
        console.error(error.message);
        updateProblems(error);
    }
}

function formatCode() {
    if (!editor) return;
    try {
        const code = editor.getValue();
        const formatted = prettier.format(code, {
            parser: 'babel',
            plugins: prettierPlugins,
            singleQuote: true,
            semi: true,
            tabWidth: 4
        });
        editor.setValue(formatted);
        console.info('Code formatted successfully');
    } catch (err) {
        console.error('Format error: ' + err.message);
    }
}

function copyToClipboard() {
    if (!editor) return;
    const code = editor.getValue();
    navigator.clipboard.writeText(code)
        .then(() => console.info('Code copied to clipboard!'))
        .catch(err => console.error('Failed to copy: ' + err.message));
}

function clearOutput() {
    const output = document.getElementById('output');
    if (output) {
        output.innerHTML = '';
    }
    const problems = document.getElementById('problems');
    if (problems) {
        problems.innerHTML = '';
    }
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
    if (timeElement) {
        timeElement.textContent = `Execution: ${time.toFixed(2)}ms`;
    }
}

function updateCursorPosition() {
    if (!editor) return;
    const pos = editor.getCursor();
    const cursorPosition = document.getElementById('cursorPosition');
    if (cursorPosition) {
        cursorPosition.textContent = `Line: ${pos.line + 1}, Col: ${pos.ch + 1}`;
    }
}

function updateFileSize() {
    if (!editor) return;
    const size = new Blob([editor.getValue()]).size;
    const fileSize = document.getElementById('fileSize');
    if (fileSize) {
        fileSize.textContent = `Size: ${size} bytes`;
    }
}
