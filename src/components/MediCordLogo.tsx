interface MediCordLogoProps {
  size?: number;
  className?: string;
}

const MediCordLogo = ({ size = 20, className = '' }: MediCordLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Shield outline */}
    <path
      d="M12 2L4 5.5V11C4 16.25 7.4 21.15 12 22.5C16.6 21.15 20 16.25 20 11V5.5L12 2Z"
      fill="currentColor"
      opacity="0.15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    {/* Stethoscope tubing - elegant Y shape */}
    <path
      d="M9.5 8.5C9.5 8.5 9.5 11 12 13C14.5 11 14.5 8.5 14.5 8.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Stethoscope chest piece / bell */}
    <circle cx="12" cy="15" r="1.8" stroke="currentColor" strokeWidth="1.4" fill="currentColor" opacity="0.3" />
    <circle cx="12" cy="15" r="0.7" fill="currentColor" />
    {/* Ear tips */}
    <circle cx="9.5" cy="7.8" r="1" fill="currentColor" />
    <circle cx="14.5" cy="7.8" r="1" fill="currentColor" />
  </svg>
);

export default MedCordLogo;
