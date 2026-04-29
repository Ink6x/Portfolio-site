export function ThreeFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center"
    >
      <svg
        width="480"
        height="480"
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-20"
      >
        <circle cx="240" cy="240" r="220" stroke="white" strokeWidth="0.5" />
        <circle cx="240" cy="240" r="160" stroke="white" strokeWidth="0.5" />
        <circle cx="240" cy="240" r="100" stroke="white" strokeWidth="0.5" />
        <ellipse cx="240" cy="240" rx="220" ry="80" stroke="white" strokeWidth="0.5" />
        <ellipse cx="240" cy="240" rx="220" ry="140" stroke="white" strokeWidth="0.5" />
        <line x1="20" y1="240" x2="460" y2="240" stroke="white" strokeWidth="0.5" />
        <line x1="240" y1="20" x2="240" y2="460" stroke="white" strokeWidth="0.5" />
      </svg>
    </div>
  );
}
