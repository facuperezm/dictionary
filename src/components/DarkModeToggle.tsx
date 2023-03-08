export default function DarkModeToggle() {
  const toggleColorMode = {};
  return (
    <button onClick={toggleColorMode} aria-label="Toggle Dark Switch">
      {isDark ? On : Off}
    </button>
  );
}
