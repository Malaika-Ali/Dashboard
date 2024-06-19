import { useRef } from "react"
import { useState } from "react"

export default function AnimatedIconButton({ children, text, color, onClick,  ...props }) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef(null)

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        flex flex-row sm:p-1 md:p-1.5 items-center rounded-full
        text-white ${color || "bg-gray-600"}
      `}
      {...props}
      onClick={onClick}
    >
      {children}
      <div
        style={{ width: hovered ? ref.current?.offsetWidth || 0 : 0 , whiteSpace: "nowrap"}}
        className="overflow-x-hidden transition-all duration-300 ease-out inline-flex"
      >
        <span ref={ref} className="sm:px-1 md:px-1.5 flex flex-row">
          {text}
        </span>
      </div>
    </button>
  )
}

