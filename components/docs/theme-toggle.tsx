"use client";

import { useTheme, type Theme } from "@/components/theme/theme-provider";
import { cn } from "@/lib/cn";

const OPTIONS: Array<{ value: Theme; label: string }> = [
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
  { value: "dark", label: "Dark" },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className="flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5"
    >
      {OPTIONS.map((option) => {
        const selected = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} theme`}
            title={`${option.label} theme`}
            onClick={() => setTheme(option.value)}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md transition-colors",
              selected
                ? "bg-background text-foreground shadow-sm"
                : "text-subtle hover:text-foreground",
            )}
          >
            <ThemeIcon theme={option.value} />
          </button>
        );
      })}
    </div>
  );
}

function ThemeIcon({ theme }: { theme: Theme }) {
  const shared = {
    viewBox: "0 0 24 24",
    className: "size-4",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (theme === "light") {
    return (
      <svg {...shared}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8-1.4 1.4m-10 10-1.4 1.4" />
      </svg>
    );
  }

  if (theme === "dark") {
    return (
      <svg {...shared}>
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
      </svg>
    );
  }

  return (
    <svg {...shared}>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M9 20h6m-3-4v4" />
    </svg>
  );
}
