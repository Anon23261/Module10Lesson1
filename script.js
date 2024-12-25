// Wait for the DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Function to update type analysis results
    function updateTypeAnalysis() {
        const stringValue = document.getElementById('stringInput').value;
        const numberValue = parseFloat(document.getElementById('numberInput').value);
        const booleanValue = document.getElementById('booleanInput').value === 'true';

        const results = document.getElementById('typeResults');
        results.innerHTML = `
            <div>String Value: "${stringValue}" (${typeof stringValue})</div>
            <div>Number Value: ${numberValue} (${typeof numberValue})</div>
            <div>Boolean Value: ${booleanValue} (${typeof booleanValue})</div>
        `;
    }

    // Function to update calculator results
    function updateCalculator() {
        const num1 = parseFloat(document.getElementById('calc1').value);
        const num2 = parseFloat(document.getElementById('calc2').value);
        const operation = document.getElementById('operation').value;

        let result;
        switch(operation) {
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

        const calcResult = document.getElementById('calcResult');
        calcResult.innerHTML = `
            <div>Operation: ${num1} ${operation} ${num2}</div>
            <div>Result: ${result}</div>
        `;
    }

    // Function to update comparison results
    function updateComparisons() {
        const val1 = parseFloat(document.getElementById('compare1').value);
        const val2 = parseFloat(document.getElementById('compare2').value);

        const results = document.getElementById('compareResults');
        results.innerHTML = `
            <div>Equality (===): ${val1} === ${val2} is ${val1 === val2}</div>
            <div>Greater Than (>): ${val1} > ${val2} is ${val1 > val2}</div>
            <div>Less Than (<): ${val1} < ${val2} is ${val1 < val2}</div>
            <div>Logical AND (&&): Both positive? ${val1 > 0 && val2 > 0}</div>
            <div>Logical OR (||): At least one even? ${val1 % 2 === 0 || val2 % 2 === 0}</div>
        `;
    }

    // Function to update all results
    function updateAllResults() {
        updateTypeAnalysis();
        updateCalculator();
        updateComparisons();
    }

    // Function to clear all results
    function clearAllResults() {
        document.getElementById('typeResults').innerHTML = '';
        document.getElementById('calcResult').innerHTML = '';
        document.getElementById('compareResults').innerHTML = '';
    }

    // Add event listeners for real-time updates
    document.getElementById('stringInput').addEventListener('input', updateTypeAnalysis);
    document.getElementById('numberInput').addEventListener('input', updateTypeAnalysis);
    document.getElementById('booleanInput').addEventListener('change', updateTypeAnalysis);

    document.getElementById('calc1').addEventListener('input', updateCalculator);
    document.getElementById('calc2').addEventListener('input', updateCalculator);
    document.getElementById('operation').addEventListener('change', updateCalculator);

    document.getElementById('compare1').addEventListener('input', updateComparisons);
    document.getElementById('compare2').addEventListener('input', updateComparisons);

    // Initialize results
    updateAllResults();
});
