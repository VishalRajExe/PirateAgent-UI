export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="32" height="32" rx="9" className="fill-primary" />
      <path
        d="M9 20.5C9 17.4624 11.4624 15 14.5 15C15.8807 15 17 13.8807 17 12.5C17 11.1193 18.1193 10 19.5 10C21.9853 10 24 12.0147 24 14.5C24 17.5376 21.5376 20 18.5 20C17.1193 20 16 21.1193 16 22.5C16 23.8807 14.8807 25 13.5 25C11.0147 25 9 22.9853 9 20.5Z"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  );
}
