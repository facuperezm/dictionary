import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
      <main
        className={`flex flex-col h-screen font-sans subpixel-antialiased bg-gray-100 dark:bg-gray-900 dark:text-gray-50 text-gray-900 ${
          theme === "dark" ? "dark" : ""
        } dotted-background`}
      >
        <nav className="flex flex-wrap items-center justify-center md:justify-between py-6 px-6 md:px-12 bg-inherit dark:bg-gray-900 dark:text-gray-50 text-gray-900 ">
          <div className="flex flex-row items-end mr-6 justify-end ">
            <h1 className="text-xl pb-1 font-bold">Dictionary</h1>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-between"
          >
            <div className="rounded-lg bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5">
              <input
                className="w-full max-w-lg sm:max-w-2xl rounded-md py-2 px-4  focus:outline-none focus:shadow-outline dark:bg-gray-800 bg-gray-50 appearance-none leading-normaL"
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
        <ReactQueryDevtools />
      </main>
    </QueryClientProvider>
  );
}
