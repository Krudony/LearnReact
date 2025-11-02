# Props Drilling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create real-world Props Drilling examples showing how to pass data through multiple component levels, with comprehensive documentation.

**Architecture:** Build three separate learning examples (User Info, Theme Settings, Form Data) that demonstrate Props Drilling patterns. Each example will use nested components to show data flowing from parent to deeply nested children, with clear comments explaining the pattern.

**Tech Stack:** React 19, Vite, ES6 modules

---

## Task 1: Create User Info Props Example

**Files:**
- Create: `src/components/UserInfoExample.jsx`
- Create: `src/components/UserProfile/UserHeader.jsx`
- Create: `src/components/UserProfile/UserDetails.jsx`
- Create: `src/components/UserProfile/UserFooter.jsx`
- Modify: `src/App.jsx` (add import and example section)

**Step 1: Create UserInfoExample.jsx parent component**

Create file: `src/components/UserInfoExample.jsx`

```jsx
/**
 * UserInfoExample - Demonstrates Props Drilling with User Data
 *
 * Props Drilling: Passing data from parent to child to grandchild...
 * In this example, user data is passed down through multiple levels:
 * UserInfoExample → UserHeader → UserDetails → UserFooter
 *
 * This pattern works for simple cases but can become messy with many levels.
 * Later we'll learn Context API to avoid this.
 */

export default function UserInfoExample() {
  // User data at the top level
  const userData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '👨‍💼',
    role: 'Admin'
  };

  return (
    <div className="example-section">
      <h2>📌 Props Drilling Example: User Info</h2>
      <p>Notice how user data is passed through multiple components:</p>
      <p className="code-note">UserInfoExample → UserHeader → UserDetails → UserFooter</p>

      {/* Pass userData as prop to UserHeader */}
      <UserHeader userData={userData} />
    </div>
  );
}

/**
 * UserHeader - First level of nesting
 * Props: userData (passed from parent)
 * Job: Display user header and pass data to next level
 */
function UserHeader({ userData }) {
  return (
    <div className="user-header" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>{userData.avatar} {userData.name}</h3>
      <p>Role: {userData.role}</p>

      {/* Pass userData to UserDetails */}
      <UserDetails userData={userData} />
    </div>
  );
}

/**
 * UserDetails - Second level of nesting
 * Props: userData (received from UserHeader)
 * Job: Display user details and pass data to next level
 */
function UserDetails({ userData }) {
  return (
    <div className="user-details" style={{ paddingLeft: '20px', borderLeft: '2px solid #007bff' }}>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>User ID:</strong> {userData.id}</p>

      {/* Pass userData to UserFooter */}
      <UserFooter userData={userData} />
    </div>
  );
}

/**
 * UserFooter - Third level of nesting
 * Props: userData (received from UserDetails)
 * Job: Display user footer information
 */
function UserFooter({ userData }) {
  return (
    <div className="user-footer" style={{ paddingLeft: '40px', fontSize: '12px', color: '#666' }}>
      <p>User #{userData.id} - Last active: just now</p>
    </div>
  );
}
```

**Step 2: Create UserHeader component file**

Create file: `src/components/UserProfile/UserHeader.jsx`

```jsx
import UserDetails from './UserDetails';

/**
 * UserHeader Component
 * Props: userData - User information object
 *
 * This component receives userData and passes it to UserDetails
 * without modifying or using it (except for display).
 * This is the essence of Props Drilling.
 */
export default function UserHeader({ userData }) {
  return (
    <div className="user-header" style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
      <h3>{userData.avatar} {userData.name}</h3>
      <p>Role: {userData.role}</p>
      <UserDetails userData={userData} />
    </div>
  );
}
```

**Step 3: Create UserDetails component file**

Create file: `src/components/UserProfile/UserDetails.jsx`

```jsx
import UserFooter from './UserFooter';

/**
 * UserDetails Component
 * Props: userData - User information object
 *
 * This component displays email and ID, then passes userData
 * to UserFooter. The component itself doesn't need all props,
 * but must pass them down anyway.
 */
export default function UserDetails({ userData }) {
  return (
    <div className="user-details" style={{ paddingLeft: '20px', borderLeft: '2px solid #007bff' }}>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>User ID:</strong> {userData.id}</p>
      <UserFooter userData={userData} />
    </div>
  );
}
```

**Step 4: Create UserFooter component file**

Create file: `src/components/UserProfile/UserFooter.jsx`

```jsx
/**
 * UserFooter Component
 * Props: userData - User information object
 *
 * This is the deepest component in the hierarchy.
 * It receives userData only to access userData.id.
 *
 * Problem: If we wanted to add a new piece of data at the top,
 * we'd have to pass it through UserHeader and UserDetails too,
 * even if they don't need it!
 */
export default function UserFooter({ userData }) {
  return (
    <div className="user-footer" style={{ paddingLeft: '40px', fontSize: '12px', color: '#666' }}>
      <p>User #{userData.id} - Last active: just now</p>
    </div>
  );
}
```

**Step 5: Update App.jsx to include UserInfoExample**

Modify: `src/App.jsx`

Add this import at the top:
```jsx
import UserInfoExample from './components/UserInfoExample';
```

Add this in the JSX (in the main return statement):
```jsx
<UserInfoExample />
```

**Step 6: View the component in browser**

Run: `npm run dev`

Open: `http://localhost:5173`

Expected: See "Props Drilling Example: User Info" section with user data displayed through multiple levels.

**Step 7: Commit**

```bash
git add src/components/UserInfoExample.jsx src/components/UserProfile/ src/App.jsx
git commit -m "feat: add Props Drilling example - User Info"
```

---

## Task 2: Create Theme Settings Props Example

**Files:**
- Create: `src/components/ThemeExample.jsx`
- Create: `src/components/Theme/ThemePanel.jsx`
- Create: `src/components/Theme/ThemeContent.jsx`
- Modify: `src/App.jsx` (add import and example section)

**Step 1: Create ThemeExample.jsx with state management**

Create file: `src/components/ThemeExample.jsx`

```jsx
import { useState } from 'react';
import ThemePanel from './Theme/ThemePanel';

/**
 * ThemeExample - Demonstrates Props Drilling with Theme Settings
 *
 * This example shows:
 * 1. State management at the top level (isDarkMode)
 * 2. Passing state AND setState function through props
 * 3. Child components updating parent state through callback props
 *
 * Props Drilling path: ThemeExample → ThemePanel → ThemeContent
 */
export default function ThemeExample() {
  // Theme state at top level
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Calculate theme colors based on mode
  const theme = {
    isDarkMode,
    backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
    textColor: isDarkMode ? '#ffffff' : '#000000',
    borderColor: isDarkMode ? '#404040' : '#cccccc'
  };

  return (
    <div className="example-section">
      <h2>🎨 Props Drilling Example: Theme Settings</h2>
      <p>Notice how theme state and setter are passed down through components:</p>
      <p className="code-note">ThemeExample → ThemePanel → ThemeContent</p>

      {/* Pass both theme data and setter function */}
      <ThemePanel theme={theme} onThemeChange={setIsDarkMode} />
    </div>
  );
}

/**
 * ThemePanel - First level
 * Props: theme (object), onThemeChange (callback function)
 */
function ThemePanel({ theme, onThemeChange }) {
  return (
    <div
      className="theme-panel"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px'
      }}
    >
      <h3>Theme Settings</h3>
      <button onClick={() => onThemeChange(!theme.isDarkMode)}>
        {theme.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Pass props to next level */}
      <ThemeContent theme={theme} />
    </div>
  );
}

/**
 * ThemeContent - Second level
 * Props: theme (object)
 * This component displays content styled with the theme
 */
function ThemeContent({ theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        border: `1px solid ${theme.borderColor}`,
        padding: '10px',
        marginTop: '10px',
        borderRadius: '5px'
      }}
    >
      <p>This content is styled with the current theme.</p>
      <p>Current mode: {theme.isDarkMode ? 'Dark 🌙' : 'Light ☀️'}</p>
    </div>
  );
}
```

**Step 2: Create ThemePanel component file**

Create file: `src/components/Theme/ThemePanel.jsx`

```jsx
import ThemeContent from './ThemeContent';

/**
 * ThemePanel Component
 * Props:
 *   - theme: object with theme settings
 *   - onThemeChange: callback function to update parent state
 *
 * This component is a middle layer that passes both data
 * and callbacks down to children.
 */
export default function ThemePanel({ theme, onThemeChange }) {
  return (
    <div
      className="theme-panel"
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '10px'
      }}
    >
      <h3>Theme Settings</h3>
      <button onClick={() => onThemeChange(!theme.isDarkMode)}>
        {theme.isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <ThemeContent theme={theme} />
    </div>
  );
}
```

**Step 3: Create ThemeContent component file**

Create file: `src/components/Theme/ThemeContent.jsx`

```jsx
/**
 * ThemeContent Component
 * Props: theme - theme settings object
 *
 * This is the deepest component that consumes the theme.
 * It only needs the theme data, not the setter.
 */
export default function ThemeContent({ theme }) {
  return (
    <div
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        border: `1px solid ${theme.borderColor}`,
        padding: '10px',
        marginTop: '10px',
        borderRadius: '5px'
      }}
    >
      <p>This content is styled with the current theme.</p>
      <p>Current mode: {theme.isDarkMode ? 'Dark 🌙' : 'Light ☀️'}</p>
    </div>
  );
}
```

**Step 4: Update App.jsx to include ThemeExample**

Modify: `src/App.jsx`

Add this import:
```jsx
import ThemeExample from './components/ThemeExample';
```

Add this in the JSX:
```jsx
<ThemeExample />
```

**Step 5: Test in browser**

Browser should show theme section with toggle button working.

Expected: Clicking toggle button changes theme colors throughout the component tree.

**Step 6: Commit**

```bash
git add src/components/ThemeExample.jsx src/components/Theme/ src/App.jsx
git commit -m "feat: add Props Drilling example - Theme Settings"
```

---

## Task 3: Create Form Data Props Example

**Files:**
- Create: `src/components/FormExample.jsx`
- Create: `src/components/FormComponents/FormWrapper.jsx`
- Create: `src/components/FormComponents/FormFields.jsx`
- Create: `src/components/FormComponents/FormSubmit.jsx`
- Modify: `src/App.jsx` (add import and example section)

**Step 1: Create FormExample.jsx with form state**

Create file: `src/components/FormExample.jsx`

```jsx
import { useState } from 'react';
import FormWrapper from './FormComponents/FormWrapper';

/**
 * FormExample - Demonstrates Props Drilling with Form Data
 *
 * This example shows:
 * 1. Multiple pieces of state (form fields)
 * 2. Passing form data and handlers through many levels
 * 3. Handling form submission
 *
 * Props Drilling path: FormExample → FormWrapper → FormFields → FormSubmit
 *
 * Problem: As the form grows, we have to pass more and more props
 * through components that don't even use them!
 */
export default function FormExample() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: ''
  });

  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form submitted:', formData);
    // Reset after 2 seconds
    setTimeout(() => setSubmitted(false), 2000);
  };

  return (
    <div className="example-section">
      <h2>📝 Props Drilling Example: Form Data</h2>
      <p>Notice how form data and handlers are passed through multiple levels:</p>
      <p className="code-note">FormExample → FormWrapper → FormFields → FormSubmit</p>

      {/* Pass form data and handlers to wrapper */}
      <FormWrapper
        formData={formData}
        onFormChange={handleChange}
        onFormSubmit={handleSubmit}
        isSubmitted={submitted}
      />
    </div>
  );
}

/**
 * FormWrapper - First level of nesting
 * Props: formData, onFormChange, onFormSubmit, isSubmitted
 */
function FormWrapper({ formData, onFormChange, onFormSubmit, isSubmitted }) {
  return (
    <div className="form-wrapper" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={onFormSubmit}>
        {/* Pass all props to FormFields */}
        <FormFields
          formData={formData}
          onFormChange={onFormChange}
        />

        {/* Pass props to FormSubmit */}
        <FormSubmit isSubmitted={isSubmitted} />
      </form>
    </div>
  );
}

/**
 * FormFields - Second level
 * Props: formData, onFormChange
 */
function FormFields({ formData, onFormChange }) {
  return (
    <div className="form-fields">
      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onFormChange}
          placeholder="Enter first name"
        />
      </div>
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onFormChange}
          placeholder="Enter last name"
        />
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onFormChange}
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label>Country: </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={onFormChange}
          placeholder="Enter country"
        />
      </div>
    </div>
  );
}

/**
 * FormSubmit - Third level (deepest)
 * Props: isSubmitted
 */
function FormSubmit({ isSubmitted }) {
  return (
    <div className="form-submit">
      <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>
        Submit Form
      </button>
      {isSubmitted && <p style={{ color: 'green' }}>✅ Form submitted successfully!</p>}
    </div>
  );
}
```

**Step 2: Create FormWrapper component file**

Create file: `src/components/FormComponents/FormWrapper.jsx`

```jsx
import FormFields from './FormFields';
import FormSubmit from './FormSubmit';

/**
 * FormWrapper Component
 * Props: formData, onFormChange, onFormSubmit, isSubmitted
 *
 * This wrapper receives all the form-related props and passes them
 * to child components. Notice how it passes props that it doesn't
 * directly use.
 */
export default function FormWrapper({ formData, onFormChange, onFormSubmit, isSubmitted }) {
  return (
    <div className="form-wrapper" style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
      <form onSubmit={onFormSubmit}>
        <FormFields
          formData={formData}
          onFormChange={onFormChange}
        />
        <FormSubmit isSubmitted={isSubmitted} />
      </form>
    </div>
  );
}
```

**Step 3: Create FormFields component file**

Create file: `src/components/FormComponents/FormFields.jsx`

```jsx
/**
 * FormFields Component
 * Props: formData, onFormChange
 *
 * This component handles all input fields.
 * Each input needs both the value from formData and the onChange handler.
 */
export default function FormFields({ formData, onFormChange }) {
  return (
    <div className="form-fields">
      <div className="form-group">
        <label>First Name: </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={onFormChange}
          placeholder="Enter first name"
        />
      </div>
      <div className="form-group">
        <label>Last Name: </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={onFormChange}
          placeholder="Enter last name"
        />
      </div>
      <div className="form-group">
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onFormChange}
          placeholder="Enter email"
        />
      </div>
      <div className="form-group">
        <label>Country: </label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={onFormChange}
          placeholder="Enter country"
        />
      </div>
    </div>
  );
}
```

**Step 4: Create FormSubmit component file**

Create file: `src/components/FormComponents/FormSubmit.jsx`

```jsx
/**
 * FormSubmit Component
 * Props: isSubmitted
 *
 * This component is at the deepest level and only needs isSubmitted.
 * It doesn't need form data or handlers, but receives them from parent.
 */
export default function FormSubmit({ isSubmitted }) {
  return (
    <div className="form-submit">
      <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>
        Submit Form
      </button>
      {isSubmitted && <p style={{ color: 'green' }}>✅ Form submitted successfully!</p>}
    </div>
  );
}
```

**Step 5: Update App.jsx to include FormExample**

Modify: `src/App.jsx`

Add this import:
```jsx
import FormExample from './components/FormExample';
```

Add this in the JSX:
```jsx
<FormExample />
```

**Step 6: Test form in browser**

Expected: Fill in form fields and click submit. See success message.

**Step 7: Commit**

```bash
git add src/components/FormExample.jsx src/components/FormComponents/ src/App.jsx
git commit -m "feat: add Props Drilling example - Form Data"
```

---

## Task 4: Add CSS Styling for Examples

**Files:**
- Create: `src/styles/examples.css`
- Modify: `src/main.jsx` (import CSS)

**Step 1: Create styling file**

Create file: `src/styles/examples.css`

```css
/* Example Section Styling */
.example-section {
  border: 2px solid #007bff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.example-section h2 {
  color: #007bff;
  margin-top: 0;
}

.example-section p {
  margin: 8px 0;
}

.code-note {
  background-color: #e9ecef;
  padding: 8px 12px;
  border-radius: 4px;
  font-family: monospace;
  color: #495057;
}

/* User Info Styling */
.user-header {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #fff;
}

.user-details {
  padding-left: 20px;
  border-left: 2px solid #007bff;
}

.user-footer {
  padding-left: 40px;
  font-size: 12px;
  color: #666;
}

/* Form Styling */
.form-wrapper {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #0056b3;
}
```

**Step 2: Update main.jsx to import CSS**

Modify: `src/main.jsx`

Add this import at the top:
```jsx
import './styles/examples.css';
```

**Step 3: Test styling in browser**

Expected: All examples should have nice styling.

**Step 4: Commit**

```bash
git add src/styles/examples.css src/main.jsx
git commit -m "style: add styling for Props Drilling examples"
```

---

## Task 5: Add Comments to Existing Components

**Files:**
- Modify: `src/components/BasicUseReducer.jsx`
- Modify: `src/components/UseEffectBasic.jsx`
- Modify: `src/components/FormInput.jsx`

**Step 1: Add comments to BasicUseReducer.jsx**

Modify: `src/components/BasicUseReducer.jsx`

Add comment block at the top:

```jsx
/**
 * BasicUseReducer Component
 *
 * This component demonstrates the useReducer hook, which is useful for
 * managing complex state logic with multiple related state values.
 *
 * Key concepts:
 * - reducer function: takes (state, action) and returns new state
 * - dispatch: function to trigger state updates
 * - useReducer: hook for state management (alternative to useState)
 *
 * When to use useReducer:
 * - Multiple related state values
 * - Complex state logic
 * - State depends on previous state
 *
 * Compared to Props Drilling:
 * - useReducer manages state locally
 * - For passing state between components, Props Drilling or Context API is needed
 * - This shows why Context API is useful with useReducer!
 */
```

**Step 2: Add comments to UseEffectBasic.jsx**

Modify: `src/components/UseEffectBasic.jsx`

Add comment block at the top:

```jsx
/**
 * UseEffectBasic Component
 *
 * This component demonstrates the useEffect hook, which runs side effects
 * after the component renders.
 *
 * Key concepts:
 * - Side effects: data fetching, subscriptions, DOM updates
 * - Dependency array: controls when effect runs
 * - Cleanup function: runs before effect runs again or on unmount
 *
 * Dependency array patterns:
 * - No array: runs after every render (not recommended)
 * - Empty array []: runs once on mount
 * - [dep1, dep2]: runs when dep1 or dep2 changes
 *
 * Relation to Props Drilling:
 * - Effects might trigger data fetches that need to be passed via props
 * - Context API often works better with effects
 */
```

**Step 3: Add comments to FormInput.jsx**

Modify: `src/components/FormInput.jsx`

Add comment block at the top:

```jsx
/**
 * FormInput Component
 *
 * This component demonstrates basic form input handling with React.
 *
 * Key concepts:
 * - Controlled components: React state drives the input value
 * - onChange handler: updates state on input change
 * - Form submission: handling the submit event
 *
 * Form patterns:
 * - Single input: one piece of state
 * - Multiple inputs: object state (like FormExample uses)
 * - Complex forms: useReducer + multiple inputs
 *
 * See FormExample.jsx for Props Drilling with multiple form fields
 */
```

**Step 4: Commit**

```bash
git add src/components/BasicUseReducer.jsx src/components/UseEffectBasic.jsx src/components/FormInput.jsx
git commit -m "docs: add explanatory comments to existing components"
```

---

## Task 6: Create Documentation File

**Files:**
- Create: `docs/PROPS_DRILLING_GUIDE.md`

**Step 1: Create Props Drilling guide**

Create file: `docs/PROPS_DRILLING_GUIDE.md`

```markdown
# Props Drilling Learning Guide

## What is Props Drilling?

Props Drilling (also called "prop threading") is a pattern where you pass data from a parent component through many intermediate components to reach a child component that actually needs the data.

## Real-World Examples in This Project

### Example 1: User Info Props
**File:** `src/components/UserInfoExample.jsx`

User data flows:
```
UserInfoExample (has userData)
  ↓ passes userData
  UserHeader (doesn't use userData, just passes it)
  ↓ passes userData
  UserDetails (doesn't use userData, just passes it)
  ↓ passes userData
  UserFooter (uses userData)
```

**Problem:** UserHeader and UserDetails don't need userData, but must accept and pass it.

### Example 2: Theme Settings Props
**File:** `src/components/ThemeExample.jsx`

Theme data and setter flow:
```
ThemeExample (has theme state + setter)
  ↓ passes theme + onThemeChange
  ThemePanel (uses theme, passes onThemeChange + theme)
  ↓ passes theme
  ThemeContent (uses theme)
```

**Problem:** As theme data grows, more props must pass through middle components.

### Example 3: Form Data Props
**File:** `src/components/FormExample.jsx`

Form data and handlers flow:
```
FormExample (has form state + handler)
  ↓ passes formData, onFormChange, onFormSubmit, isSubmitted
  FormWrapper (receives all props, passes them to children)
  ↓ splits and passes relevant props
  FormFields (uses formData + onFormChange)
  FormSubmit (uses isSubmitted)
```

**Problem:** FormWrapper doesn't use most props, just passes them through.

## Why is Props Drilling a Problem?

1. **Boilerplate:** Components must accept props they don't use
2. **Maintenance:** Adding new data requires updating every level
3. **Refactoring:** Hard to change component hierarchy
4. **Performance:** Every component re-renders even if props don't change

## When Props Drilling is Okay

- 1-2 levels deep
- Few pieces of data
- Static component hierarchy
- Simple data structure

## Solutions to Props Drilling

### 1. Context API
Best for:
- Global data (theme, auth)
- Avoiding many intermediate levels
- Read and update from any level

```jsx
const UserContext = createContext();

// At top level
<UserContext.Provider value={userData}>
  <UserHeader />
</UserContext.Provider>

// In deep child
const userData = useContext(UserContext);
```

### 2. Component Composition
Best for:
- Reducing nesting levels
- Simpler data flow
- Better readability

```jsx
// Instead of nesting components:
<UserInfoExample>
  <UserHeader>
    <UserDetails>
      <UserFooter />
    </UserDetails>
  </UserHeader>
</UserInfoExample>

// Pass components as children:
<UserInfo footer={<UserFooter />} />
```

### 3. Custom Hooks
Best for:
- Sharing logic
- Avoiding repeated props
- Cleaner component code

```jsx
const useUser = () => {
  const context = useContext(UserContext);
  return context;
};
```

## Next Learning Steps

1. Study the examples in this project
2. Trace the data flow in each example
3. Learn Context API to solve Props Drilling
4. Build a project using Context instead of Props Drilling
5. Learn Custom Hooks for advanced patterns

## Quick Reference

| Pattern | Best For | Complexity |
|---------|----------|-----------|
| Props Drilling | Simple, 1-2 levels | Low |
| Context API | Global data, 3+ levels | Medium |
| Custom Hooks | Logic sharing | Medium |
| Redux | Complex state | High |

---

*Last updated: 2025-11-02*
```

**Step 2: Commit**

```bash
git add docs/PROPS_DRILLING_GUIDE.md
git commit -m "docs: add Props Drilling learning guide"
```

---

## Task 7: Final Testing and Verification

**Step 1: Build the project**

Run: `npm run build`

Expected: Build succeeds with no errors.

**Step 2: Run dev server**

Run: `npm run dev`

Expected: Dev server starts on http://localhost:5173

**Step 3: Test all examples in browser**

- [ ] User Info Example displays correctly
- [ ] Theme toggle button works
- [ ] Form inputs accept text
- [ ] Form submit button works
- [ ] All styling looks correct

**Step 4: Lint the code**

Run: `npm run lint`

Expected: No linting errors or warnings.

**Step 5: Final commit**

```bash
git status
git add .
git commit -m "feat: complete Props Drilling learning project"
```

**Step 6: Push to LearnReact**

```bash
git push origin main
```

Expected: Push succeeds, changes visible on GitHub.

---

## Verification Checklist

- [ ] All 3 examples created and working
- [ ] Comments added to all components
- [ ] CSS styling applied
- [ ] Guide documentation created
- [ ] Build succeeds
- [ ] Dev server works
- [ ] All examples interactive
- [ ] Code lints without errors
- [ ] Commits made after each task
- [ ] Pushed to LearnReact repo

---

## Time Estimate: 55-60 minutes

- Task 1 (User Info): 10 min
- Task 2 (Theme): 10 min
- Task 3 (Form): 12 min
- Task 4 (Styling): 5 min
- Task 5 (Comments): 5 min
- Task 6 (Guide): 8 min
- Task 7 (Testing): 5 min

---

## Notes for Implementation

1. **Code Structure:** Each example is self-contained in one component file for clarity
2. **Comments:** Detailed comments explain the Props Drilling pattern
3. **Incremental:** Build examples one at a time, commit after each
4. **Testing:** Test in browser after adding each example
5. **Documentation:** Comments and guide help future learning

This plan teaches Props Drilling through hands-on examples while building real-world components that demonstrate the pattern's strengths and limitations.
