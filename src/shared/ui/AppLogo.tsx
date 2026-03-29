import { CarFront, Wrench } from "lucide-react";

export function AppLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#fff7ed] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
        <CarFront className="h-10 w-10 text-[#FF8A00]" strokeWidth={2.2} />
        <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#0b1730] shadow-lg">
          <Wrench className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-center leading-tight">
        <div className="text-lg font-extrabold tracking-tight text-[#1f2937]">
          Smart Garage
        </div>
        <div className="text-xs text-[#6b7280]">
          Vehicle manager + AI mechanic
        </div>
      </div>
    </div>
  );
}