type PageStateProps = {
  title: string;
  description?: string;
  variant?: "loading" | "empty" | "error";
};

function getClasses(variant: NonNullable<PageStateProps["variant"]>) {
  if (variant === "error") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (variant === "empty") {
    return "border-dashed border-white/20 bg-[#0f2236] text-white/75";
  }

  return "border-white/10 bg-white text-[#111827]";
}

export function PageState({
  title,
  description,
  variant = "loading",
}: PageStateProps) {
  return (
    <div
      className={`rounded-[22px] border p-5 shadow-[0_10px_30px_rgba(0,0,0,0.12)] ${getClasses(
        variant
      )}`}
    >
      <div className="text-base font-extrabold">{title}</div>
      {description ? (
        <div className="mt-2 text-sm leading-7 opacity-90">{description}</div>
      ) : null}
    </div>
  );
}