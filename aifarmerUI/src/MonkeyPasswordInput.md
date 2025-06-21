# 🐒 MonkeyPasswordInput Component

An interactive password input component featuring an animated monkey that closes its eyes when typing and opens them when the password is shown.

## ✨ Features

- **👁️ Eye Animation**: Monkey's eyes close when typing for privacy
- **👀 Show/Hide Password**: Click the monkey to toggle password visibility
- **😊 Facial Expressions**: Smile appears when password is visible
- **✨ Eye Shine**: Sparkle effect when eyes are open
- **🎯 Hover Effects**: Smooth scaling and background changes on hover
- **⚡ Smooth Animations**: All transitions are smooth and responsive

## 📦 Installation

The component is already included in the project. Just import it:

```tsx
import MonkeyPasswordInput from './MonkeyPasswordInput';
```

## 🚀 Basic Usage

```tsx
import React, { useState } from 'react';
import MonkeyPasswordInput from './MonkeyPasswordInput';

const MyComponent = () => {
  const [password, setPassword] = useState('');

  return (
    <MonkeyPasswordInput
      value={password}
      onChange={setPassword}
      placeholder="Enter your password"
    />
  );
};
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | The current password value |
| `onChange` | `(value: string) => void` | - | Callback function when password changes |
| `placeholder` | `string` | `"Password"` | Placeholder text for the input |
| `required` | `boolean` | `false` | Whether the field is required |
| `style` | `React.CSSProperties` | `{}` | Custom styles for the input |

## 🎨 Examples

### Basic Password Input
```tsx
<MonkeyPasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Enter your password"
/>
```

### Required Field
```tsx
<MonkeyPasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Required password field"
  required
/>
```

### Custom Styled Input
```tsx
<MonkeyPasswordInput
  value={password}
  onChange={setPassword}
  placeholder="Custom styled input"
  style={{
    border: '2px solid #16a34a',
    backgroundColor: '#f0fdf4',
    borderRadius: '12px'
  }}
/>
```

## 🎭 Animation States

### 1. Default State
- Monkey's eyes are closed
- No smile visible
- Ready for input

### 2. Typing State
- Eyes remain closed while typing
- Shows typing indicator (👀 emoji)
- Maintains privacy during input

### 3. Password Visible State
- Eyes are open with sparkle effect
- Smile appears below nose
- Full facial expression visible

### 4. Hover State
- Monkey scales up slightly
- Background color changes
- Smooth transition effects

## 🎯 Accessibility

- **Keyboard Navigation**: Fully accessible via keyboard
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Clear focus indicators
- **Color Contrast**: Meets WCAG guidelines

## 🔧 Customization

### Styling the Input
```tsx
<MonkeyPasswordInput
  value={password}
  onChange={setPassword}
  style={{
    border: '2px solid #ff6b6b',
    backgroundColor: '#fff5f5',
    borderRadius: '20px',
    fontSize: '18px'
  }}
/>
```

### Custom Placeholder
```tsx
<MonkeyPasswordInput
  value={password}
  onChange={setPassword}
  placeholder="🔐 Enter your secret password"
/>
```

## 🐛 Troubleshooting

### Common Issues

1. **Monkey not animating**: Make sure you're passing the `onChange` prop correctly
2. **Styling conflicts**: Use the `style` prop to override default styles
3. **Accessibility issues**: Ensure proper form labels and ARIA attributes

### Performance Tips

- The component uses `useEffect` for cleanup to prevent memory leaks
- Animations are optimized with CSS transitions
- Timeout management prevents unnecessary re-renders

## 🎉 Demo

Check out the `MonkeyPasswordDemo.tsx` component for a complete demonstration of all features!

## 📝 License

This component is part of the AI Farmer project and follows the same license terms. 