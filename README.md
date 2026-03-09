# GitHub Issues Tracker

A simple **GitHub Issues Tracker** built with **HTML, TailwindCSS, DaisyUI, and Vanilla JavaScript**.  
It fetches issues from an API and displays them in cards similar to GitHub Issues.

---

## Features
- Login page with demo credentials
- Load all issues from API
- Filter issues by **All / Open / Closed**
- Responsive card layout (4 columns on large screens)
- Each card shows **Title, Description, Status, Author, Priority, Labels, Created Date**
- Clicking a card opens a **modal with full issue details**
- Search functionality
- Loading spinner while fetching data
- Active tab indicator

---

## API Endpoints

**All Issues**:  
https://phi-lab-server.vercel.app/api/v1/lab/issues

**Single Issue**:  
https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}  
Example: https://phi-lab-server.vercel.app/api/v1/lab/issue/33

**Search Issue**:  
https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q={searchText}  
Example: https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications

---

## Questions & Answers

**1️⃣ What is the difference between var, let, and const?**

- **var**: Function-scoped, can be redeclared, older syntax.  
- **let**: Block-scoped, cannot be redeclared in the same block, value can change.  
- **const**: Block-scoped, cannot be redeclared or reassigned, value is constant.

**2️⃣ What is the spread operator (...)**  

The spread operator expands an array or object into individual elements.  
Example:
```javascript
const arr = [1,2,3];
const newArr = [...arr,4,5]; // [1,2,3,4,5]
```

**3️⃣ Difference between `map()`, `filter()`, and `forEach()`**  
- `map()` → transforms each element of an array and returns a **new array**.  
- `filter()` → returns a **new array** containing only elements that meet a condition.  
- `forEach()` → executes a function on each element, **does not return a new array**.  

**4️⃣ Arrow function**  
- A shorter syntax for writing functions.  
- Inherits `this` from the surrounding scope.  
Example:  
```javascript
const add = (a, b) => a + b;
```

**5️⃣ What are Template Literals?**  
Template literals are strings defined with backticks (`` ` ``) that allow embedding variables and expressions using `${}` and support multi-line strings.

- Embed variables or expressions: `${variable}`  
- Multi-line strings without `\n`  
- Cleaner string concatenation

Example:  
```javascript
const name = "Alice";
const a = 5;
const b = 10;

console.log(`Hello ${name}, the sum of ${a} + ${b} is ${a + b}`);
// Output: Hello Alice, the sum of 5 + 10 is 15
```