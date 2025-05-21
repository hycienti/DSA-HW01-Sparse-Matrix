class SparseMatrix {
    constructor(numRows, numCols) {
        this.rows = numRows;
        this.cols = numCols;
        this.values = {}; // format: { "row,col": value }
    }

    static fromFileContent(content) {
        const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
        if (!lines[0].startsWith('rows=') || !lines[1].startsWith('cols=')) {
            throw new Error('Input file has wrong format');
        }

        const rows = parseInt(lines[0].split('=')[1]);
        const cols = parseInt(lines[1].split('=')[1]);
        const matrix = new SparseMatrix(rows, cols);

        for (let i = 2; i < lines.length; i++) {
            const match = lines[i].match(/^\((\d+),\s*(\d+),\s*(-?\d+)\)$/);
            if (!match) throw new Error('Input file has wrong format');
            const [_, r, c, v] = match;
            matrix.setElement(parseInt(r), parseInt(c), parseInt(v));
        }

        return matrix;
    }

    setElement(row, col, value) {
        if (value === 0) return;
        this.values[`${row},${col}`] = value;
    }

    getElement(row, col) {
        return this.values[`${row},${col}`] || 0;
    }

    getNonZeroEntries() {
        return Object.entries(this.values).map(([key, val]) => {
            const [row, col] = key.split(',').map(Number);
            return [row, col, val];
        });
    }
}

module.exports = SparseMatrix;
// Example usage
// const matrix = SparseMatrix.fromFileContent(`
// rows=3
// cols=3
// (0, 0, 1)
// (1, 2, 2)
// (2, 1, 3)
// `);
// console.log(matrix.getNonZeroEntries()); // [[0, 0, 1], [1, 2, 2], [2, 1, 3]]
// console.log(matrix.getElement(1, 2)); // 2
// console.log(matrix.getElement(0, 1)); // 0
// console.log(matrix.getElement(2, 2)); // 0
// console.log(matrix.getElement(3, 3)); // 0
// console.log(matrix.getElement(0, 0)); // 1

