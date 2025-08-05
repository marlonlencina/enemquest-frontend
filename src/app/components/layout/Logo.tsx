import Image from "next/image";
import logomark from "../../../assets/logomark.svg";

interface LogoProps {
  height?: number;
  showLogomark?: boolean;
  showLogotext?: boolean;
  logoTextColor?: string;
}

export const Logo = ({ 
  height = 32, 
  showLogomark = true, 
  showLogotext = true, 
  logoTextColor = "white" 
}: LogoProps) => {
  return (
    <div className="flex items-center gap-3">
      {showLogomark && (
        <Image height={height} alt="Logomark" src={logomark} />
      )}
      {showLogotext && (
        <svg
          height={height}
          viewBox="0 0 254 47"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.325 6.5V10.8152H12.7757V19.8818H18.8732V24.2455H12.7757V34.1848H21.0509L20.6638 38.5H0V6.5H20.325Z"
            fill={logoTextColor}
          />
          <path
            d="M36.8667 38.5L28.4947 13.9182V38.5H22.5424V6.5H38.6572L47.0776 31.0818V6.5H53.0299V38.5H36.8667Z"
            fill={logoTextColor}
          />
          <path
            d="M77.6971 6.5V10.8152H70.1478V19.8818H76.2453V24.2455H70.1478V34.1848H78.4229L78.0358 38.5H57.372V6.5H77.6971Z"
            fill={logoTextColor}
          />
          <path
            d="M121 6.5V38.5H108.224V14.6939L100.336 38.5H93.7548L85.8668 14.7424V38.5H79.9144V6.5H95.7389L100.385 21.6758L105.03 6.5H121Z"
            fill={logoTextColor}
          />
          <path
            d="M146.439 45.5V39H133.48V32.5H127V13H133.48V6.5H146.439V13H152.918V32.5H146.439V39H152.918V45.5H146.439ZM133.48 32.24H146.439V13.26H133.48V32.24Z"
            fill={logoTextColor}
          />
          <path
            d="M161.99 39V32.5H155.51V6.5H161.99V32.5H174.949V39H161.99ZM174.949 32.5V6.5H181.429V32.5H174.949Z"
            fill={logoTextColor}
          />
          <path
            d="M184.02 39V6.5H203.459V13H190.5V19.5H203.459V26H190.5V32.5H203.459V39H184.02Z"
            fill={logoTextColor}
          />
          <path
            d="M212.531 13V6.5H231.969V13H212.531ZM225.49 32.5V26H212.531V19.5H206.051V13H212.531V19.5H225.49V26H231.969V32.5H225.49ZM206.051 39V32.5H225.49V39H206.051Z"
            fill={logoTextColor}
          />
          <path
            d="M241.041 39V13H234.561V6.5H254V13H247.52V39H241.041Z"
            fill={logoTextColor}
          />
        </svg>
      )}
    </div>
  );
};