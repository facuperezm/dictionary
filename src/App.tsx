import axios from "axios";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
}

interface Word {
  word: string;
  phonetic: string;
  phonetics: Phonetic[];
  origin: string;
  meanings: Meaning[];
}

const queryClient = new QueryClient();

function Words(): JSX.Element {
  const { isLoading, error, data, isFetching } = useQuery<Word>(
    "words",
    async () => {
      const response = await axios.get<Word[]>(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
      );
      return response.data[0];
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <div className="dark:bg-black dark:text-white">
      <h1 className="text-5xl">{data.word}</h1>
      <div>
        {data.phonetics.map((phonetic: Phonetic, index: number) => (
          <div key={index}>
            <h2 className="font-bold">{phonetic.text}</h2>
          </div>
        ))}
        {data.meanings.map((meaning: Meaning) => (
          <div key={meaning.partOfSpeech}>
            <h2 className="border-b my-5 font-serif">{meaning.partOfSpeech}</h2>
            {meaning.definitions.map((definition: Definition) => (
              <div key={definition.definition}>
                <div className="font-thin">Meaning</div>
                <h3>{definition.definition}</h3>
              </div>
            ))}
          </div>
        ))}
      </div>
      <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Words />
    </QueryClientProvider>
  );
}
