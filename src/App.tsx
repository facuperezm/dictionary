import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import DarkModeToggle from "./components/DarkModeToggle";
import Words from "./components/Words";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App(): JSX.Element {
  const [theme, setTheme] = React.useState<"dark" | "light">("dark");
  const [searchWord, setSearchWord] = React.useState<string>("");
  const [word, setWord] = React.useState<string>("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setWord(searchWord);
  }

  React.useEffect(() => {
    const htmlElement = document.documentElement;
    theme === "dark"
      ? htmlElement.classList.add("dark")
      : htmlElement.classList.remove("dark");
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={`container  mx-auto w-screen flex flex-col gap-7 md:gap-10 lg:max-w-4xl  h-screen ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        <nav className="flex flex-wrap gap-2 items-center justify-center md:justify-between p-6 md:px-12 ">
          <div className="flex flex-row items-end justify-end">
            <a href="/">
              <h1 className="text-xl pb-1 font-bold">Dictionary</h1>
            </a>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-between"
          >
            <div className="rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
              <input
                className={`w-full max-w-3xl sm:max-w-2xl rounded-md py-2 px-4  focus:outline-none focus:shadow-outline ${
                  theme === "dark"
                    ? "dark:bg-gray-800 bg-gray-700"
                    : "bg-gray-50"
                } appearance-none leading-normaL`}
                type="text"
                value={searchWord}
                placeholder="Search for any word..."
                onChange={(e) => setSearchWord(e.target.value)}
              />
            </div>
          </form>
          <div className="flex items-center">
            <DarkModeToggle theme={theme} setTheme={setTheme} />
          </div>
        </nav>
        <Words word={word} />
      </div>
    </QueryClientProvider>
  );
}
