import axios from "axios";
import { Definition, Meaning, Phonetic, Word } from "../types/types";
import { useQuery } from "react-query";

interface Props {
  word: string;
}

export default function Words({ word }: Props): JSX.Element {
  const { isLoading, data, isFetching } = useQuery<Word>(
    ["words", word],
    async () => {
      const response = await axios.get<Word[]>(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      return response.data[0];
    },
    {
      enabled: Boolean(word), // Only fetch when `word` is truthy
    }
  );

  if (!word) {
    return null; // Don't render anything if `word` is falsy
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white px-6 py-3">
      <h1 className="text-5xl">{data?.word}</h1>
      <div>
        {data?.phonetics.map((phonetic: Phonetic, index: number) => (
          <div key={index}>
            <h2 className="font-bold">{phonetic.text}</h2>
          </div>
        ))}
        {data?.meanings.map((meaning: Meaning) => (
          <div key={meaning.partOfSpeech}>
            <h2 className="border-b my-5 text-2xl font-semibold">
              {meaning.partOfSpeech}
            </h2>
            {meaning.definitions?.map(({ definition }: Definition) => (
              <ul key={definition}>
                <li>{definition}</li>
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
