// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add typing animation to explanations
    document.querySelectorAll('.explanation').forEach(exp => {
        exp.style.whiteSpace = 'nowrap';
        exp.style.overflow = 'hidden';
        exp.style.animation = 'typing 3s steps(40, end)';
    });

    // Function to update type analysis results with animation
    function updateTypeAnalysis() {
        const stringValue = document.getElementById('stringInput').value;
        const numberValue = document.getElementById('numberInput').value;
        const booleanValue = document.getElementById('booleanInput').value === 'true';

        // Validate number input
        const isValidNumber = !isNaN(numberValue) && numberValue !== '';
        const numberInput = document.getElementById('numberInput');
        numberInput.classList.toggle('success', isValidNumber);
        numberInput.classList.toggle('warning', !isValidNumber);

        const results = document.getElementById('typeResults');
        results.innerHTML = '';

        // Add results with staggered animation
        const items = [
            `<div>String Value: "${stringValue}" <span class="type-badge">${typeof stringValue}</span></div>`,
            `<div>Number Value: ${isValidNumber ? numberValue : 'Invalid'} <span class="type-badge">${typeof (isValidNumber ? Number(numberValue) : numberValue)}</span></div>`,
            `<div>Boolean Value: ${booleanValue} <span class="type-badge">${typeof booleanValue}</span></div>`
        ];

        items.forEach((item, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.innerHTML = item;
                div.style.animation = 'fadeIn 0.5s forwards';
                results.appendChild(div);
            }, index * 200);
        });
    }

    // Function to update calculator results with visual feedback
    function updateCalculator() {
        const num1 = parseFloat(document.getElementById('calc1').value);
        const num2 = parseFloat(document.getElementById('calc2').value);
        const operation = document.getElementById('operation').value;

        // Validate inputs
        const calc1Input = document.getElementById('calc1');
        const calc2Input = document.getElementById('calc2');
        calc1Input.classList.toggle('success', !isNaN(num1));
        calc2Input.classList.toggle('success', !isNaN(num2));

        let result;
        let error = false;
        
        try {
            switch(operation) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/':
                    if (num2 === 0) throw new Error('Division by zero');
                    result = num1 / num2;
                    break;
            }
        } catch (e) {
            error = true;
            result = e.message;
        }

        const calcResult = document.getElementById('calcResult');
        calcResult.innerHTML = `
            <div class="${error ? 'warning' : 'success'}">
                <div>Operation: ${num1} ${operation} ${num2}</div>
                <div>Result: ${error ? '❌ ' + result : '✅ ' + result}</div>
            </div>
        `;

        // Add pulse animation on result change
        calcResult.style.animation = 'pulse 0.5s';
        setTimeout(() => calcResult.style.animation = '', 500);
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
                symbol: val1 === val2 ? '✅' : '❌'
            },
            {
                test: val1 > val2,
                text: `Greater Than (>): ${val1} > ${val2}`,
                symbol: val1 > val2 ? '✅' : '❌'
            },
            {
                test: val1 < val2,
                text: `Less Than (<): ${val1} < ${val2}`,
                symbol: val1 < val2 ? '✅' : '❌'
            },
            {
                test: val1 > 0 && val2 > 0,
                text: `Logical AND (&&): Both positive?`,
                symbol: val1 > 0 && val2 > 0 ? '✅' : '❌'
            },
            {
                test: val1 % 2 === 0 || val2 % 2 === 0,
                text: `Logical OR (||): At least one even?`,
                symbol: val1 % 2 === 0 || val2 % 2 === 0 ? '✅' : '❌'
            }
        ];

        comparisons.forEach((comp, index) => {
            setTimeout(() => {
                const div = document.createElement('div');
                div.className = comp.test ? 'success' : 'warning';
                div.style.animation = 'fadeIn 0.5s forwards';
                div.innerHTML = `${comp.symbol} ${comp.text}`;
                results.appendChild(div);
            }, index * 100);
        });
    }

    // Function to update all results with loading animation
    function updateAllResults() {
        const results = [
            document.getElementById('typeResults'),
            document.getElementById('calcResult'),
            document.getElementById('compareResults')
        ];

        // Show loading state
        results.forEach(result => {
            result.innerHTML = '<div class="loading">Computing</div>';
        });

        // Update after brief delay for effect
        setTimeout(() => {
            updateTypeAnalysis();
            updateCalculator();
            updateComparisons();
        }, 500);
    }

    // Function to clear all results with fade effect
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
    }

    // Add tooltips to inputs
    document.querySelectorAll('.interactive-input').forEach(input => {
        input.setAttribute('data-tooltip', 'Type to see instant updates');
    });

    // Add event listeners for real-time updates
    document.getElementById('stringInput').addEventListener('input', updateTypeAnalysis);
    document.getElementById('numberInput').addEventListener('input', updateTypeAnalysis);
    document.getElementById('booleanInput').addEventListener('change', updateTypeAnalysis);

    document.getElementById('calc1').addEventListener('input', updateCalculator);
    document.getElementById('calc2').addEventListener('input', updateCalculator);
    document.getElementById('operation').addEventListener('change', updateCalculator);

    document.getElementById('compare1').addEventListener('input', updateComparisons);
    document.getElementById('compare2').addEventListener('input', updateComparisons);

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            updateAllResults();
        } else if (e.ctrlKey && e.key === 'Delete') {
            clearAllResults();
        }
    });

    // Initialize results
    updateAllResults();
});
