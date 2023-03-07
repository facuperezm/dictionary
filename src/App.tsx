import React from "react";
import axios from "axios";

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

export default function App() {
  const [word, setWord] = React.useState<Word>({
    word: "",
    phonetic: "",
    phonetics: [],
    origin: "",
    meanings: [],
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/pan`
      );
      setWord(res.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);
  console.log(word, "this is word");

  return (
    <>
      <h1>{word.phonetic}</h1>
      <p>{word.word}</p>
    </>
  );
}
