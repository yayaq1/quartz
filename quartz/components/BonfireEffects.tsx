import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Minimal Bonfire Effects Component
const BonfireEffects: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={`bonfire-effects ${displayClass || ""}`}>
    </div>
  )
}

BonfireEffects.afterDOMLoaded = `
// Enhanced dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  // Ensure dark mode toggle works properly
  const darkModeButton = document.querySelector('.darkmode button');
  if (darkModeButton) {
    darkModeButton.addEventListener('click', () => {
      // Force a re-render of styles after theme change
      setTimeout(() => {
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger reflow
        document.body.style.display = '';
      }, 50);
    });
  }
  
  // Subtle hover effects on interactive elements
  const interactiveElements = document.querySelectorAll('button, .search-button, a[href]');
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        element.style.transition = 'all 0.2s ease';
      }
    });
  });
  
  // Add bonfire glow effect to hero image on hover
  const bonfireImage = document.querySelector('.bonfire-image');
  if (bonfireImage) {
    bonfireImage.addEventListener('mouseenter', () => {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bonfireImage.style.filter = 'brightness(1.1) contrast(1.1)';
      }
    });
    
    bonfireImage.addEventListener('mouseleave', () => {
      bonfireImage.style.filter = '';
    });
  }
});
`

BonfireEffects.css = `
.bonfire-effects {
  /* Minimal styling - no particles or complex effects */
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .bonfire-effects {
    display: none;
  }
  
  .bonfire-image {
    transform: none !important;
    filter: none !important;
  }
}
`

export default (() => BonfireEffects) satisfies QuartzComponentConstructor 