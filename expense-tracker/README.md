# Expense Tracker

This project is a React-based expense tracker built with Create React App. It lets the user:

- track wallet balance
- add income
- add expenses
- edit and delete existing expenses
- persist balance and expenses in `localStorage`
- visualize category-wise spending with a pie chart and a bar chart

## How The App Works

The main screen is rendered by `Home.jsx`. It stores the full app state:

- `balance`: current wallet balance
- `expense`: total amount spent
- `expenseData`: list of expense objects
- `isBalanceOpen`: controls the add-balance modal
- `isExpenseOpen`: controls the add-expense modal
- `category`: derived totals for `food`, `entertainment`, and `travel`

### Expense Object Shape

Each expense item inside `expenseData` follows this structure:

```js
{
  id: number,
  title: string,
  price: string | number,
  category: "food" | "entertainment" | "travel",
  date: string
}
```

### Data Flow

1. `src/index.js` mounts the React app.
3. `src/pages/Home.jsx` loads saved balance and expenses from `localStorage`.
4. `Home.jsx` passes data and setter functions to child components.
5. Forms update state through setter props.
6. Whenever `expenseData` changes, `Home.jsx` recalculates:
   - total expenses
   - category-wise totals
   - `localStorage` persistence

## Setup And Run

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm start
```

### Create Production Build

```bash
npm run build
```

## Project Structure

```text
expense-tracker/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   ├── App.test.js
│   ├── index.css
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

## File-By-File Explanation

### Root Files

#### `package.json`

Project metadata, dependencies, npm scripts, ESLint configuration, and browser support targets.

Important parts:

- `dependencies`: lists React, charting, modal, snackbar, and testing packages
- `scripts.start`: runs the CRA development server
- `scripts.build`: creates the production build
- `scripts.test`: runs tests

#### `package-lock.json`

Auto-generated dependency lock file created by npm. It keeps package versions consistent across environments.

#### `.gitignore`

Prevents unnecessary or generated files from being committed, such as:

- `node_modules`
- `build`
- coverage output
- local environment files

### Public Folder

#### `public/index.html`

HTML template used by Create React App.

Role:

- defines `<div id="root"></div>` where React mounts
- sets page title to `Expense Tracker`
- includes favicon and manifest references


### Source Entry Files

#### `src/index.js`

Application entry point.

What it does:

- imports global styles from `index.css`
- creates the React root using `ReactDOM.createRoot`
- renders `<App />` inside `React.StrictMode`
- calls `reportWebVitals()`

#### `src/App.js`

Top-level app component.

What it does:

- imports `SnackbarProvider` from `notistack`
- wraps the app so child components can trigger snackbars
- renders the `Home` page

Function:

- `App()`: top-level wrapper component for the application

#### `src/index.css`

Global styling and theme variables.

What it defines:

- CSS variables like:
  - `--color-primary-bg`
  - `--color-secondary-bg`
  - `--color-primary-text`
  - `--font-heading`
  - `--font-body`
- global reset using `*`
- default body background color
- font families for headings, buttons, and paragraphs

### Pages

#### `src/pages/Home.jsx`

This is the main page and the central state manager of the project.

Imports:

- React hooks: `useEffect`, `useState`
- styles from `Home.module.css`
- `Card`
- `Modal`
- `BalanceForm`
- `ExpenseForm`
- `PieChart`
- `ExpenseList`
- `BarGraph`

State variables:

- `balance`: wallet amount
- `expense`: total spent amount
- `expenseData`: all expense records
- `isBalanceOpen`: controls add-balance modal
- `isExpenseOpen`: controls add-expense modal
- `isMounted`: prevents initial localStorage overwrite problems
- `category`: object containing totals for:
  - `food`
  - `entertainment`
  - `travel`

Functions and effects:

- first `useEffect(...)`
  - loads `balance` from `localStorage`
  - sets default balance to `5000` if nothing is stored
  - loads `expenses` from `localStorage`
  - marks the page as mounted

- second `useEffect(...)`
  - writes updated `balance` back to `localStorage`

- third `useEffect(...)`
  - writes `expenseData` to `localStorage`
  - recalculates total expenses
  - recalculates category totals for charts

Component role:

- renders top summary cards
- renders category pie chart
- renders recent transactions list
- renders category bar graph
- renders modal for adding income
- renders modal for adding expenses

#### `src/pages/Home.module.css`

Styles for the main page layout.

What it controls:

- page container spacing and minimum height
- top summary section grid layout
- bottom section grid layout
- mobile responsive layout for both sections

### Reusable Components

#### `src/components/Button/Button.jsx`

Reusable button component.

Props:

- `children`: button label/content
- `buttonType`: style variant such as `income`, `expense`, `success`, or `cancel`
- `handleButton`: click handler
- `shadow`: adds shadow styling when `true`
- `type`: button type, defaults to `"button"`

Function:

- `Button(...)`: renders a styled button with CSS module classes based on props

Role:

- used across cards and forms to keep buttons visually consistent

#### `src/components/Button/Button.module.css`

Style variants for `Button`.

Classes:

- `.income`: green gradient button
- `.expense`: red gradient button
- `.success`: yellow action button
- `.cancel`: grey cancel button
- `.btn`: base button styling
- `.shadow`: optional shadow effect

#### `src/components/Card/Card.jsx`

Summary card component used for wallet balance and total expenses.

Props:

- `title`: card heading
- `money`: amount to display
- `buttonText`: action button label
- `buttonType`: controls amount color and button style
- `handleButton`: click handler for the card button

Function:

- `Card(...)`: renders the title, amount, and action button

Role:

- displays summary info for:
  - current wallet balance
  - current total expenses

Note:

- the rupee symbol is rendered as a mis-encoded string (`â‚¹`) in the current code

#### `src/components/Card/Card.module.css`

Styles for summary cards.

What it controls:

- card background
- centered layout
- heading size
- amount color variants:
  - `.income`
  - `.expense`

#### `src/components/Modal/Modal.jsx`

Wrapper around `react-modal`.

Props:

- `isOpen`: modal visibility flag
- `setIsOpen`: setter used to close the modal
- `children`: content rendered inside the modal

Functions:

- `handleClose()`: closes the modal by setting `isOpen` to `false`

Role:

- centralizes modal configuration and custom styles
- used for add-income, add-expense, and edit-expense dialogs

#### `src/components/Form/BalanceForm/BalanceForm.jsx`

Form for adding income to the wallet.

Imports:

- React hooks: `useEffect`, `useRef`, `useState`
- `Button`
- snackbar hook from `notistack`

Props:

- `setIsOpen`: closes the modal
- `setBalance`: updates wallet balance in parent state

State and refs:

- `income`: current input value
- `isRequired`: controls HTML required validation
- `inputRef`: focuses the input when the modal opens

Functions:

- `handleSubmit(e)`
  - prevents default form submission
  - validates that amount is greater than `0`
  - adds income to wallet balance
  - closes modal on success
  - shows snackbar feedback

- `useEffect(...)`
  - focuses the input on mount

Role:

- handles the add-income workflow only

#### `src/components/Form/BalanceForm/BalanceForm.module.css`

Styles for the balance form layout and input.

What it controls:

- form spacing
- heading size
- flex layout
- input appearance
- mobile stacking

#### `src/components/Form/ExpenseForm/ExpenseForm.jsx`

Form used for both adding and editing expenses.

Props:

- `setIsOpen`: closes or reopens the modal
- `expenseData`: current list of expenses
- `setExpenseData`: updates the expense list
- `balance`: current wallet balance
- `setBalance`: updates wallet balance
- `editId`: optional expense id for edit mode

State:

- `isRequired`: controls HTML required validation
- `formData`: stores:
  - `title`
  - `price`
  - `category`
  - `date`

Functions:

- `handleChange(e)`
  - reads `name` and `value` from the field
  - updates the matching property in `formData`

- `handleSubmit(e)`
  - used when creating a new expense
  - prevents spending more than the current wallet balance
  - blocks zero or negative values
  - subtracts price from balance
  - generates a new `id`
  - adds the new expense at the start of the list
  - shows success snackbar

- `handleEdit(e)`
  - used when `editId` is present
  - validates positive price
  - checks whether anything actually changed
  - compares the updated price with the original price
  - adjusts wallet balance by the price difference
  - prevents edits that would exceed remaining wallet balance
  - updates the target expense item in the list

- `useEffect(...)`
  - when `editId` is set, finds the existing item and pre-fills the form

Role:

- handles both add-expense and edit-expense flows in a single component

#### `src/components/Form/ExpenseForm/ExpenseForm.module.css`

Styles for the expense form.

What it controls:

- grid-based form layout
- input and select appearance
- responsive single-column layout on smaller screens

#### `src/components/ExpenseList/ExpenseList.jsx`

Displays recent transactions and manages pagination and editing modal state.

Props:

- `expenseData`: full expense list
- `setExpenseData`: updates the expense list
- `balance`: current wallet balance
- `setBalance`: updates wallet balance

State:

- `editId`: selected expense id for editing
- `isOpen`: controls edit modal
- `currentPage`: currently active page
- `totalPages`: total number of pages
- `currentRecords`: expenses shown on the current page
- `recordsPerPage`: fixed at `3`

Functions:

- `handleDelete(id)`
  - finds the item to delete
  - refunds its price back into the wallet balance
  - removes it from `expenseData`

- `handleEdit(id)`
  - stores the selected `id`
  - opens the edit modal

- first `useEffect(...)`
  - calculates page boundaries
  - slices `expenseData` into `currentRecords`
  - recalculates `totalPages`

- second `useEffect(...)`
  - moves back one page if the current page becomes invalid after deletion

Role:

- owns the transaction list UI
- renders expense rows
- opens edit modal
- renders pagination controls when needed

#### `src/components/ExpenseList/ExpenseList.module.css`

Styles for the recent transactions section.

What it controls:

- heading style
- white card-like list container
- responsive heading alignment

#### `src/components/ExpenseCard/ExpenseCard.jsx`

Displays one expense row.

Props:

- `details`: expense object
- `handleDelete`: delete button handler
- `handleEdit`: edit button handler

Function:

- `ExpenseCard(...)`: renders icon, title, date, price, delete button, and edit button

Role:

- shows a single transaction in the list
- chooses the category icon based on `details.category`

Category icon mapping:

- `food` -> `PiPizza`
- `entertainment` -> `PiGift`
- `travel` -> `BsSuitcase2`

Note:

- price display also uses the mis-encoded rupee symbol string

#### `src/components/ExpenseCard/ExpesneCard.module.css`

CSS module for individual expense rows.

What it controls:

- row layout
- icon circle
- details typography
- price color
- delete and edit button styling
- responsive layout adjustments

Note:

- the filename contains a typo: `ExpesneCard.module.css` instead of `ExpenseCard.module.css`

#### `src/components/Pagination/Pagination.jsx`

Simple page navigation component.

Props:

- `currentPage`: active page number
- `setCurrentPage`: page setter
- `totalPages`: last page number

Functions:

- `handlePreviousPage()`
  - moves to the previous page if the current page is greater than `1`

- `handleNextPage()`
  - moves to the next page if the current page is not the last page

Role:

- helps the transaction list show only 3 items per page

#### `src/components/Pagination/Pagination.module.css`

Styles for pagination buttons and current-page indicator.

What it controls:

- button sizes
- center alignment
- page number badge
- disabled button styling

#### `src/components/PieChart/PieChart.jsx`

Pie chart component built with `recharts`.

Props:

- `data`: array of category objects with `name` and `value`

Constants and functions:

- `COLORS`
  - array of slice colors

- `RADIAN`
  - math helper constant used for label positioning

- `renderCustomizedLabel(...)`
  - calculates custom label coordinates
  - renders percentage text inside each pie slice

- `PieChartComp({ data })`
  - renders the responsive pie chart and legend

Role:

- visualizes spending distribution by category

Note:

- `PureComponent` and `Sector` are imported but not used

#### `src/components/BarGraph/BarGraph.jsx`

Vertical bar chart for category totals.

Props:

- `data`: array of category objects with `name` and `value`

Function:

- `BarGraph({ data })`: renders a responsive vertical `BarChart`

Role:

- displays top expense categories using bars

Chart setup:

- `XAxis` uses numeric values and is hidden
- `YAxis` shows category names
- `Bar` uses `value` as the data key

#### `src/components/BarGraph/BarGraph.module.css`

Styles for the bar chart section.

What it controls:

- section heading
- chart container background and padding
- responsive heading alignment

## Component Relationship Map

```text
index.js
  -> App.js
    -> Home.jsx
      -> Card.jsx
        -> Button.jsx
      -> Card.jsx
        -> Button.jsx
      -> PieChart.jsx
      -> ExpenseList.jsx
        -> ExpenseCard.jsx
        -> Pagination.jsx
        -> Modal.jsx
          -> ExpenseForm.jsx
            -> Button.jsx
      -> BarGraph.jsx
      -> Modal.jsx
        -> BalanceForm.jsx
          -> Button.jsx
      -> Modal.jsx
        -> ExpenseForm.jsx
          -> Button.jsx
```

## Key Business Logic Summary

### Balance Logic

- initial balance is loaded from `localStorage`
- if not found, balance starts at `5000`
- adding income increases balance
- adding expense decreases balance
- deleting expense refunds that amount
- editing expense updates balance based on the difference between old and new price

### Expense Logic

- expenses are stored in `expenseData`
- new expenses are inserted at the start of the array
- ids are generated using the first item’s id plus one
- only three records are shown per page

### Persistence Logic

- `balance` is saved in `localStorage` under `"balance"`
- expenses are saved in `localStorage` under `"expenses"`

### Chart Logic

- `Home.jsx` computes totals for:
  - food
  - entertainment
  - travel
- those totals are passed to:
  - `PieChart.jsx`
  - `BarGraph.jsx`
