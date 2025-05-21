const fs = require('fs');
const path = require('path');
const readline = require('readline');
const SparseMatrix = require('./SparseMatrix');
const { addMatrices, subtractMatrices, multiplyMatrices } = require('./matrixOperations');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const prompt = (query) =>
    new Promise((resolve) => rl.question(query, (ans) => resolve(ans.trim())));

function loadMatrix(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return SparseMatrix.fromFileContent(content);
}

function saveMatrix(matrix, filename) {
    const lines = [`rows=${matrix.rows}`, `cols=${matrix.cols}`];
    for (const [row, col, val] of matrix.getNonZeroEntries()) {
        lines.push(`(${row}, ${col}, ${val})`);
    }
    fs.writeFileSync(filename, lines.join('\n'));
}

async function main() {
    console.log("=== Sparse Matrix Operations ===");
    console.log("1. Addition");
    console.log("2. Subtraction");
    console.log("3. Multiplication\n");

    const opChoice = await prompt("Choose an operation (1/2/3): ");
    const operations = { '1': 'add', '2': 'sub', '3': 'mul' };
    const operation = operations[opChoice];

    if (!operation) {
        console.log("❌ Invalid choice. Exiting...");
        rl.close();
        return;
    }

    const default1 = path.join(__dirname, '../../sample_inputs/matrix1.txt');
    const default2 = path.join(__dirname, '../../sample_inputs/matrix2.txt');

    const file1 = await prompt(`Enter path to Matrix 1 [Default: ${default1}]: `) || default1;
    const file2 = await prompt(`Enter path to Matrix 2 [Default: ${default2}]: `) || default2;

    try {
        const matrix1 = loadMatrix(file1);
        const matrix2 = loadMatrix(file2);

        let result;
        if (operation === 'add') result = addMatrices(matrix1, matrix2);
        else if (operation === 'sub') result = subtractMatrices(matrix1, matrix2);
        else result = multiplyMatrices(matrix1, matrix2);

        const outputFile = `output_${operation}.txt`;
        saveMatrix(result, outputFile);
        console.log(`✅ Operation "${operation}" complete. Result saved to "${outputFile}"`);
    } catch (err) {
        console.error(`❌ Error: ${err.message}`);
    }

    rl.close();
}

main();
// This script provides a command-line interface for performing operations on sparse matrices.
// It allows users to load matrices from files, perform addition, subtraction, or multiplication,
// and save the result to a new file. The script uses the SparseMatrix class and matrixOperations module
// to handle the underlying logic. It also includes error handling for invalid inputs and file formats.
// The script uses the readline module to interact with the user and the fs module to read/write files.
// The script is designed to be run in a Node.js environment and expects the SparseMatrix class and matrixOperations module to be present in the same directory.
