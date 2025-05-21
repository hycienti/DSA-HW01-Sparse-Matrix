function addMatrices(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
        throw new Error("Addition requires matrices of same dimensions");
    }

    const result = new a.constructor(a.rows, a.cols);

    for (const [row, col, val] of a.getNonZeroEntries()) {
        result.setElement(row, col, val);
    }

    for (const [row, col, val] of b.getNonZeroEntries()) {
        const sum = result.getElement(row, col) + val;
        result.setElement(row, col, sum);
    }

    return result;
}

function subtractMatrices(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
        throw new Error("Subtraction requires matrices of same dimensions");
    }

    const result = new a.constructor(a.rows, a.cols);

    for (const [row, col, val] of a.getNonZeroEntries()) {
        result.setElement(row, col, val);
    }

    for (const [row, col, val] of b.getNonZeroEntries()) {
        const diff = result.getElement(row, col) - val;
        result.setElement(row, col, diff);
    }

    return result;
}

function multiplyMatrices(a, b) {
    if (a.cols !== b.rows) {
        throw new Error("Matrix multiplication dimension mismatch");
    }

    const result = new a.constructor(a.rows, b.cols);

    for (const [rA, cA, valA] of a.getNonZeroEntries()) {
        for (let cB = 0; cB < b.cols; cB++) {
            const valB = b.getElement(cA, cB);
            if (valB !== 0) {
                const prev = result.getElement(rA, cB);
                result.setElement(rA, cB, prev + valA * valB);
            }
        }
    }

    return result;
}

module.exports = { addMatrices, subtractMatrices, multiplyMatrices };
// This module provides functions to add, subtract, and multiply sparse matrices.
// It uses the SparseMatrix class to perform these operations efficiently.
// The functions check for dimension compatibility and handle non-zero entries.
// The addMatrices function adds two sparse matrices.
// The subtractMatrices function subtracts one sparse matrix from another.
// The multiplyMatrices function multiplies two sparse matrices.
// The module exports these functions for use in other parts of the application.