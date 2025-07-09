import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { cloneElement, isValidElement, JSX } from "preact"

const handleKeyDown = (handler?: () => void) => (e: JSX.TargetedKeyboardEvent<HTMLDivElement>) => {
  if ((e.key === "Enter" || e.key === " ") && handler) {
    e.preventDefault()
    handler()
  }
}

function hasOnClickProp(child: any): child is { props: { onClick: () => void } } {
  return (
    isValidElement(child) &&
    typeof child.props === "object" &&
    child.props !== null &&
    Object.prototype.hasOwnProperty.call(child.props, "onClick") &&
    typeof (child.props as any).onClick === "function"
  )
}

const getOnClick = (child: any) => {
  if (hasOnClickProp(child)) {
    return child.props.onClick
  }
  return undefined
}

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  // If no children or only one child, don't render the header
  if (!children || children.length < 2) {
    return null
  }

  const [first, ...rest] = children
  const last = rest[rest.length - 1]
  const middle = rest.slice(0, -1)

  const firstOnClick = getOnClick(first)
  const lastOnClick = getOnClick(last)

  return (
    <header>
      {/* Hamburger/Menu Button */}
      <div
        className="header-button"
        onClick={firstOnClick}
        onKeyDown={handleKeyDown(firstOnClick)}
        tabIndex={0}
        role="button"
        aria-label="Toggle menu"
      >
        {isValidElement(first) ? cloneElement(first, { 
          className: "header-icon"
        }) : first}
      </div>

      {/* Site Title */}
      <div className="header-title">
        <h1>{middle}</h1>
      </div>

      {/* Search Button */}
      <div
        className="header-button"
        onClick={lastOnClick}
        onKeyDown={handleKeyDown(lastOnClick)}
        tabIndex={0}
        role="button"
        aria-label="Search"
      >
        {isValidElement(last) ? cloneElement(last, { 
          className: "header-icon"
        }) : last}
      </div>
    </header>
  )
}

Header.css = `
header {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  height: 56px !important;
  padding: 0 0.5rem !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  background: var(--light) !important;
  border: none !important;
  gap: 0.5rem !important;
}

.header-button {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 40px !important;
  height: 40px !important;
  border-radius: 0 !important;
  background: transparent !important;
  border: none !important;
  cursor: pointer !important;
  transition: background-color 0.2s ease !important;
  flex-shrink: 0 !important;
  box-shadow: none !important;
  outline: none !important;
  padding: 0 !important;
}

.header-button:hover,
.header-button:focus {
  background-color: transparent !important;
}

.header-icon {
  width: 20px !important;
  height: 20px !important;
  stroke: var(--darkgray) !important;
  fill: none !important;
}

.header-title {
  flex: 1 !important;
  min-width: 0 !important;
  text-align: center !important;
  padding: 0 0.5rem !important;
}

.header-title h1 {
  margin: 0 !important;
  padding: 0 !important;
  font-size: 1.1rem !important;
  font-weight: 600 !important;
  color: var(--dark) !important;
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  line-height: 1.2 !important;
}

@media (max-width: 800px) {
  header {
    height: 48px !important;
    padding: 0 0.25rem !important;
  }
  
  .header-button {
    width: 36px !important;
    height: 36px !important;
  }
  
  .header-icon {
    width: 18px !important;
    height: 18px !important;
  }
  
  .header-title h1 {
    font-size: 1rem !important;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
