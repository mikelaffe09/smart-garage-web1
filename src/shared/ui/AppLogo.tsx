import { Link } from "react-router-dom";
import logo from "@/assets/branding/logo.png";
import logoMark from "@/assets/branding/logo-mark.png";

type AppLogoProps = {
  compact?: boolean;
  clickable?: boolean;
  to?: string;
  className?: string;
};

function LogoContent({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <img
          src={logoMark}
          alt="Smart Garage"
          className="h-10 w-10 rounded-xl object-contain"
        />
        <div>
          <div className="text-[24px] font-extrabold leading-none text-[#FF8A00]">
            Smart Garage
          </div>
          <div className="mt-1 text-xs text-white/65">
            Vehicle manager + AI mechanic
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src={logo}
        alt="Smart Garage"
        className="h-12 w-auto object-contain"
      />
    </div>
  );
}

export function AppLogo({
  compact = false,
  clickable = false,
  to = "/",
  className = "",
}: AppLogoProps) {
  if (clickable) {
    return (
      <Link to={to} className="inline-flex">
        <LogoContent compact={compact} className={className} />
      </Link>
    );
  }

  return <LogoContent compact={compact} className={className} />;
}
