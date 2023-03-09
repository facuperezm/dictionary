interface DarkModeToggleProps {
  theme: "dark" | "light";
  setTheme: (theme: "dark" | "light") => void;
}

export default function DarkModeToggle({
  theme,
  setTheme,
}: DarkModeToggleProps): JSX.Element {
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button className="bg-gray-200 rounded-md p-2" onClick={handleThemeSwitch}>
      {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
