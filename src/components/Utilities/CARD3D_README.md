# Card3D Component

A reusable React component that provides premium 3D perspective hover effects using Framer Motion.

## Features

✨ **Cursor-Driven 3D Tilt** - Card tilts based on mouse position (rotateX, rotateY)  
🎯 **Smooth Spring Physics** - Natural, bouncy animations using Framer Motion springs  
🚀 **Floating Effect** - Card lifts upward on hover with smooth transitions  
💫 **Border Glow Reveal** - Gradient border becomes visible on hover  
🎨 **Layered Depth** - Content layers use translateZ for true 3D depth  
⚡ **Performance Optimized** - GPU-accelerated transforms, will-change optimization  
📱 **Responsive** - Automatically adjusts on mobile devices  

---

## Installation

The component is already created in your project at:
```
src/components/Utilities/Card3D.jsx
src/components/Utilities/Card3D.css
```

No additional packages needed - uses existing Framer Motion (already installed).

---

## Basic Usage

```jsx
import Card3D from './components/Utilities/Card3D';

function MyComponent() {
  return (
    <Card3D>
      <div style={{ padding: '2rem' }}>
        <h3>My Awesome Card</h3>
        <p>Hover me to see the 3D effect!</p>
      </div>
    </Card3D>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Content to render inside the card |
| `className` | string | `''` | Additional CSS classes |
| `onClick` | function | undefined | Click handler function |
| `style` | object | `{}` | Additional inline styles |

---

## Advanced Examples

### 1. Project Card
```jsx
<Card3D 
  className="my-project-card"
  onClick={() => handleProjectClick(project.id)}
>
  <img src={project.image} alt={project.title} />
  <div className="project-content">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
  </div>
</Card3D>
```

### 2. Feature Card
```jsx
<Card3D className="feature-card">
  <div className="icon">🚀</div>
  <h4>Fast Performance</h4>
  <p>GPU-accelerated 3D transforms</p>
</Card3D>
```

### 3. Custom Styling
```jsx
<Card3D 
  style={{ maxWidth: '400px', margin: '20px auto' }}
  className="custom-gradient"
>
  <div style={{
    padding: '2rem',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white'
  }}>
    Your content here
  </div>
</Card3D>
```

---

## Customization

### Adjust 3D Intensity
Edit `Card3D.jsx` line 33-34 to change tilt amount:
```jsx
const rotateX = ((y - centerY) / centerY) * -12;  // Change -12 to your value
const rotateY = ((x - centerX) / centerX) * 12;   // Change 12 to your value
```

### Modify Spring Physics
Edit the `transition` object (lines 67-90):
```jsx
rotateX: {
  type: 'spring',
  stiffness: 150,  // Higher = faster response
  damping: 25,     // Higher = less bounce
  mass: 0.8        // Higher = heavier feel
}
```

### Change Hover Height
Edit line 64:
```jsx
y: isHovered ? -15 : 0,  // Change -15 to your value
```

### Custom Border Glow Colors
Edit `Card3D.css` line 32-37:
```css
background: linear-gradient(
  135deg,
  rgba(88, 166, 255, 0.4),   /* Your color 1 */
  rgba(147, 51, 234, 0.4),   /* Your color 2 */
  rgba(236, 72, 153, 0.4)    /* Your color 3 */
);
```

---

## How It Works

### 1. Perspective Wrapper
```jsx
<div style={{ perspective: '1000px' }}>
```
Creates the 3D space for the card to rotate in.

### 2. Mouse Tracking
```jsx
const handleMouseMove = (e) => {
  // Calculate mouse position relative to card center
  // Convert to rotation angles
  setMousePosition({ rotateX, rotateY });
};
```

### 3. Framer Motion Animation
```jsx
<motion.div
  animate={{
    rotateX: mousePosition.rotateX,
    rotateY: mousePosition.rotateY,
    scale: isHovered ? 1.03 : 1,
    y: isHovered ? -15 : 0
  }}
  transition={{ type: 'spring', ... }}
>
```

### 4. 3D Depth Layers
```jsx
<div style={{ transform: 'translateZ(20px)' }}>
  {children}
</div>
```
Content layers pushed forward in 3D space.

---

## Performance Tips

✅ The component uses:
- `will-change: transform` for optimization
- `backface-visibility: hidden` to prevent flickering
- GPU-accelerated properties only (transform, opacity)
- Spring physics instead of linear transitions

❌ Avoid:
- Large images without optimization
- Too many Card3D components on one page (use virtualization)
- Heavy content inside cards

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ Mobile: Reduced 3D effect for better UX

---

## Demo

Check out `Card3DExample.jsx` for 5 different usage examples:
1. Simple Content Card
2. Project Card with Image
3. Feature Card
4. Stats Card
5. Custom Styled Card

To see the examples, import and render `Card3DExample`:
```jsx
import Card3DExample from './components/Utilities/Card3DExample';

<Card3DExample />
```

---

## Technical Details

- **Component Type**: Functional Component with Hooks
- **Animation Library**: Framer Motion 12.x
- **CSS Approach**: Modular CSS with CSS Variables support
- **State Management**: useState for hover and mouse position
- **Event Handlers**: onMouseMove, onMouseEnter, onMouseLeave

---

## Credits

Built with:
- React 18.2.0
- Framer Motion 12.23.26
- Modern CSS3 transforms & animations

---

## License

Part of your portfolio project - use freely! 🎉
