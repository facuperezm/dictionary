interface DarkModeToggleProps {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export default function DarkModeToggle({
  theme,
  setTheme,
}: DarkModeToggleProps): JSX.Element {
  const handleDarkModeToggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className="bg-white dark:bg-gray-800 focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 block appearance-none rounded-md p-2"
      onClick={handleDarkModeToggle}
    >
      {theme === "dark" ? "🌑" : "🌞"}
    </button>
  );
}
