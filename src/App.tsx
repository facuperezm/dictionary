import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DarkModeToggle from "./components/DarkModeToggle";
import Words from "./components/Words";

const queryClient = new QueryClient();

export default function App(): JSX.Element {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [searchWord, setSearchWord] = React.useState<string>("");
  const [word, setWord] = React.useState<string>("");

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWord(searchWord);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`min-h-screen font-sans ${theme === "dark" ? "dark" : ""}`}
      >
        <form onSubmit={handleSubmit}>
          <input
            className="bg-gray-200 rounded-md p-2"
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
        </form>
        <DarkModeToggle theme={theme} setTheme={setTheme} />
        <Words word={word} />
      </div>
    </QueryClientProvider>
  );
}
