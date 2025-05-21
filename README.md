
# Sparse Matrix Processor in JavaScript

This project is a command-line tool for performing arithmetic operations (addition, subtraction, multiplication) on sparse matrices provided in a custom input format. The purpose of this tool is to demonstrate efficient sparse matrix operations, without relying on external libraries, by manually implementing storage and arithmetic logic.

---

## 📁 Project Structure

```
/dsa/sparse_matrix/
├── code/
│   └── src/
│       ├── SparseMatrix.js         # Defines the SparseMatrix class and related logic
│       ├── matrixOperations.js     # Contains logic for matrix addition, subtraction, multiplication
│       └── main.js                 # Command-line interface and interaction logic
└── sample_inputs/
    ├── matrix1.txt                 # Sample sparse matrix input file
    └── matrix2.txt                 # Another sample input for operations
```

---

## 🔧 How It Works

### 1. **Sparse Matrix Representation**

Sparse matrices contain mostly zero values. To store them efficiently, we use a key-value dictionary:

```js
this.values = {
  "row,col": value
}
```

This allows us to access or set elements directly using string keys, which is memory efficient and faster than creating a full 2D array.

---

### 2. **SparseMatrix.js**

This file defines the `SparseMatrix` class. Here’s what it contains:

- **Constructor**: Takes `numRows` and `numCols` to define dimensions.
- **fromFileContent()**: Reads matrix from text format. It validates the format strictly, ensuring only integers and correct tuple syntax.
- **getElement(row, col)**: Retrieves non-zero value or returns `0` if not found.
- **setElement(row, col, value)**: Sets a value if it’s non-zero.
- **getNonZeroEntries()**: Returns all non-zero entries for use in arithmetic functions.

Why not use a 2D array?
Because 99% of the matrix is zero. Storing every cell would be a waste of memory and slow down lookups/updates.

---

### 3. **matrixOperations.js**

This file includes logic for:

- **addMatrices(a, b)**:
  - Both matrices must have the same dimensions.
  - Loops through all non-zero entries of `a`, then `b`, summing up corresponding values.

- **subtractMatrices(a, b)**:
  - Similar to addition but subtracts values from `b`.

- **multiplyMatrices(a, b)**:
  - Ensures `a.cols === b.rows`.
  - Loops over non-zero entries in `a`.
  - For every column in `b`, multiplies and adds if the corresponding value exists in `b`.

All these functions throw errors when dimensions are invalid, following proper matrix math rules.

---

### 4. **main.js**

This script is the command-line interface.

**Step-by-step Flow:**

1. It shows available operations to the user:
   ```
   1. Addition
   2. Subtraction
   3. Multiplication
   ```

2. The user selects an option (1, 2, or 3).

3. The script prompts for input file paths:
   - If the user hits Enter, it defaults to `sample_inputs/matrix1.txt` and `matrix2.txt`.

4. It loads matrices from the file using `SparseMatrix.fromFileContent`.

5. Performs the operation using the chosen function (`addMatrices`, `subtractMatrices`, etc.)

6. Saves the result into a file like `output_add.txt`.

7. Any errors (bad input format, mismatched dimensions) are caught and shown to the user.

Why use readline?
To simulate an interactive CLI without needing third-party tools. It’s built-in and ideal for prompting users one step at a time.

---

## ✅ Input Format (example)

```
rows=3
cols=3
(0, 1, 5)
(1, 2, 10)
(2, 0, -2)
```

- First two lines define matrix dimensions.
- Each following line is a tuple: `(row, column, value)`
- Any whitespace or empty lines are safely ignored.
- If formatting is incorrect (e.g. `(1.0, 2, 5.5)`), it throws a clear error.

---

## ⚠️ Edge Case Handling

- **Empty lines / whitespace**: Ignored.
- **Incorrect formats**: Throws `Error("Input file has wrong format")`
- **Zero values**: Not stored or written to output to maintain sparsity.
- **Multiplication dimension mismatch**: Gracefully handled.

---

## 🏁 Running the App

From the `src/` directory:

```bash
node main.js
```

Then follow prompts to choose operation and input files.

---

## 📦 Output Example

After running, a file `output_add.txt` (or `output_sub.txt`, etc.) will be created in the same directory with this format:

```
rows=3
cols=3
(0, 1, 8)
(1, 2, 5)
...
```

Only non-zero entries are written, preserving memory and readability.

---

## 📚 Why This Design?

- Focused on performance and clarity.
- Avoids bloated libraries by using only core Node.js modules.
- Efficient data model (`{ "r,c": value }`) ensures fast lookup and low memory use.
- Clean CLI makes it user-friendly and testable.

---

## 🚫 What We Didn't Use (on purpose)

- No `regex` or built-in `Matrix` or `Math` libs.
- No external libraries (like `inquirer`, `mathjs`).
- No file format converters (e.g., JSON or CSV).
- Manually parsed input for full control and understanding.

---

## 🧪 Next Steps

- Add support for saving in CSV format.
- Extend for dense matrix fallback.
- Add matrix transposition.

---

**Built for learning how to work with sparse matrices efficiently in real-world applications like data science, image processing, and recommendation systems.**

---

### Author
Hycient Igweze — 2025
