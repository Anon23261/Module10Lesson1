// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add matrix rain effect
    createMatrixRain();

    // Add typing animation to explanations with glitch effect
    document.querySelectorAll('.explanation').forEach(exp => {
        exp.style.whiteSpace = 'nowrap';
        exp.style.overflow = 'hidden';
        exp.style.animation = 'typing 3s steps(40, end)';
        
        // Add glitch effect randomly
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance of glitch
                exp.style.animation = 'glitch 0.3s ease';
                setTimeout(() => {
                    exp.style.animation = 'typing 3s steps(40, end)';
                }, 300);
            }
        }, 2000);
    });

    // Add data-text attribute to h1 for glitch effect
    const h1 = document.querySelector('h1');
    h1.setAttribute('data-text', h1.textContent);

    // Function to create matrix rain effect
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.classList.add('matrix-rain');
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
        const drops = [];
        const fontSize = 10;
        const columns = canvas.width / fontSize;

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 35);

        // Resize canvas when window is resized
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Function to update type analysis results with enhanced animations
    function updateTypeAnalysis() {
        const stringValue = document.getElementById('stringInput').value;
        const numberValue = document.getElementById('numberInput').value;
        const booleanValue = document.getElementById('booleanInput').value === 'true';

        // Validate number input with enhanced feedback
        const isValidNumber = !isNaN(numberValue) && numberValue !== '';
        const numberInput = document.getElementById('numberInput');
        numberInput.classList.toggle('success', isValidNumber);
        numberInput.classList.toggle('warning', !isValidNumber);

        if (!isValidNumber) {
            numberInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => numberInput.style.animation = '', 500);
        }

        const results = document.getElementById('typeResults');
        results.innerHTML = '';

        // Add results with enhanced staggered animation
        const items = [
            {
                content: `String Value: "${stringValue}"`,
                type: typeof stringValue,
                icon: '📝'
            },
            {
                content: `Number Value: ${isValidNumber ? numberValue : 'Invalid'}`,
                type: typeof (isValidNumber ? Number(numberValue) : numberValue),
                icon: '🔢'
            },
            {
                content: `Boolean Value: ${booleanValue}`,
                type: typeof booleanValue,
                icon: '⚡'
            }
        ];

        items.forEach((item, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <span class="result-icon">${item.icon}</span>
                    <span class="result-content">${item.content}</span>
                    <span class="type-badge" data-type="${item.type}">${item.type}</span>
                `;
                div.style.animation = 'fadeIn 0.5s forwards, float 3s ease-in-out infinite';
                div.style.animationDelay = `${index * 0.2}s, ${index * 0.1}s`;
                results.appendChild(div);
            }, index * 200);
        });
    }

    // Function to update calculator results with enhanced visual feedback
    function updateCalculator() {
        const num1 = parseFloat(document.getElementById('calc1').value);
        const num2 = parseFloat(document.getElementById('calc2').value);
        const operation = document.getElementById('operation').value;

        // Validate inputs with enhanced feedback
        const calc1Input = document.getElementById('calc1');
        const calc2Input = document.getElementById('calc2');
        const inputs = [calc1Input, calc2Input];

        inputs.forEach(input => {
            const value = parseFloat(input.value);
            const isValid = !isNaN(value);
            input.classList.toggle('success', isValid);
            input.classList.toggle('warning', !isValid);

            if (!isValid) {
                input.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => input.style.animation = '', 500);
            }
        });

        let result;
        let error = false;
        let icon = '✨';
        
        try {
            switch(operation) {
                case '+': 
                    result = num1 + num2;
                    icon = '➕';
                    break;
                case '-': 
                    result = num1 - num2;
                    icon = '➖';
                    break;
                case '*': 
                    result = num1 * num2;
                    icon = '✖️';
                    break;
                case '/':
                    if (num2 === 0) throw new Error('Division by zero');
                    result = num1 / num2;
                    icon = '➗';
                    break;
            }
        } catch (e) {
            error = true;
            result = e.message;
            icon = '⚠️';
        }

        const calcResult = document.getElementById('calcResult');
        calcResult.innerHTML = `
            <div class="${error ? 'warning' : 'success'} result-item">
                <span class="result-icon">${icon}</span>
                <div class="result-content">
                    <div>Operation: ${num1} ${operation} ${num2}</div>
                    <div>Result: ${error ? '❌ ' + result : '✅ ' + result}</div>
                </div>
            </div>
        `;

        // Add enhanced animations
        calcResult.style.animation = 'pulse 0.5s, glow 2s infinite';
        setTimeout(() => calcResult.style.animation = 'glow 2s infinite', 500);
    }

    // Function to update comparison results with enhanced visualization
    function updateComparisons() {
        const val1 = parseFloat(document.getElementById('compare1').value);
        const val2 = parseFloat(document.getElementById('compare2').value);

        const results = document.getElementById('compareResults');
        results.innerHTML = '';

        const comparisons = [
            {
                test: val1 === val2,
                text: `Equality (===): ${val1} === ${val2}`,
                symbol: val1 === val2 ? '✅' : '❌',
                icon: '🎯'
            },
            {
                test: val1 > val2,
                text: `Greater Than (>): ${val1} > ${val2}`,
                symbol: val1 > val2 ? '✅' : '❌',
                icon: '📈'
            },
            {
                test: val1 < val2,
                text: `Less Than (<): ${val1} < ${val2}`,
                symbol: val1 < val2 ? '✅' : '❌',
                icon: '📉'
            },
            {
                test: val1 > 0 && val2 > 0,
                text: `Logical AND (&&): Both positive?`,
                symbol: val1 > 0 && val2 > 0 ? '✅' : '❌',
                icon: '🔗'
            },
            {
                test: val1 % 2 === 0 || val2 % 2 === 0,
                text: `Logical OR (||): At least one even?`,
                symbol: val1 % 2 === 0 || val2 % 2 === 0 ? '✅' : '❌',
                icon: '🔀'
            }
        ];

        comparisons.forEach((comp, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = `result-item ${comp.test ? 'success' : 'warning'}`;
                div.style.animation = 'fadeIn 0.5s forwards, float 3s ease-in-out infinite';
                div.style.animationDelay = `${index * 0.1}s, ${index * 0.1}s`;
                div.innerHTML = `
                    <span class="result-icon">${comp.icon}</span>
                    <span class="result-content">${comp.text}</span>
                    <span class="result-symbol">${comp.symbol}</span>
                `;
                results.appendChild(div);
            }, index * 100);
        });
    }

    // Function to update all results with enhanced loading animation
    function updateAllResults() {
        const results = [
            document.getElementById('typeResults'),
            document.getElementById('calcResult'),
            document.getElementById('compareResults')
        ];

        // Show enhanced loading state
        results.forEach(result => {
            result.innerHTML = `
                <div class="loading">
                    <span class="loading-text">Computing</span>
                    <div class="loading-dots"></div>
                </div>
            `;
        });

        // Add matrix effect during loading
        const matrix = document.createElement('div');
        matrix.className = 'matrix-effect';
        document.body.appendChild(matrix);

        // Update after brief delay for effect
        setTimeout(() => {
            updateTypeAnalysis();
            updateCalculator();
            updateComparisons();
            document.body.removeChild(matrix);
        }, 800);
    }

    // Function to clear all results with enhanced fade effect
    function clearAllResults() {
        const results = [
            document.getElementById('typeResults'),
            document.getElementById('calcResult'),
            document.getElementById('compareResults')
        ];

        results.forEach(result => {
            result.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                result.innerHTML = '';
                result.style.animation = '';
            }, 500);
        });

        // Reset all inputs with animation
        document.querySelectorAll('.interactive-input').forEach(input => {
            input.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                input.style.animation = '';
                if (input.type === 'number') input.value = '0';
                else if (input.type === 'text') input.value = '';
            }, 500);
        });
    }

    // Add enhanced tooltips to inputs
    document.querySelectorAll('.interactive-input').forEach(input => {
        input.setAttribute('data-tooltip', 'Type to see instant updates');
        
        // Add focus and blur effects
        input.addEventListener('focus', () => {
            input.style.animation = 'glow 2s infinite';
        });
        
        input.addEventListener('blur', () => {
            input.style.animation = '';
        });
    });

    // Add event listeners for real-time updates with debounce
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

    const debouncedTypeAnalysis = debounce(updateTypeAnalysis, 300);
    const debouncedCalculator = debounce(updateCalculator, 300);
    const debouncedComparisons = debounce(updateComparisons, 300);

    document.getElementById('stringInput').addEventListener('input', debouncedTypeAnalysis);
    document.getElementById('numberInput').addEventListener('input', debouncedTypeAnalysis);
    document.getElementById('booleanInput').addEventListener('change', updateTypeAnalysis);

    document.getElementById('calc1').addEventListener('input', debouncedCalculator);
    document.getElementById('calc2').addEventListener('input', debouncedCalculator);
    document.getElementById('operation').addEventListener('change', updateCalculator);

    document.getElementById('compare1').addEventListener('input', debouncedComparisons);
    document.getElementById('compare2').addEventListener('input', debouncedComparisons);

    // Add keyboard shortcuts with visual feedback
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            const runButton = document.querySelector('button');
            runButton.style.animation = 'pulse 0.3s';
            setTimeout(() => runButton.style.animation = '', 300);
            updateAllResults();
        } else if (e.ctrlKey && e.key === 'Delete') {
            const clearButton = document.querySelectorAll('button')[1];
            clearButton.style.animation = 'pulse 0.3s';
            setTimeout(() => clearButton.style.animation = '', 300);
            clearAllResults();
        }
    });

    // Initialize results with animation
    setTimeout(updateAllResults, 500);
});
