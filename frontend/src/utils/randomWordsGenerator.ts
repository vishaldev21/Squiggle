import { generateSlug } from "random-word-slugs";

type TCase = "kebab" | "camel" | "sentence" | "lower" | "title";

type TNoun =
  | "animals"
  | "business"
  | "education"
  | "family"
  | "food"
  | "health"
  | "media"
  | "people"
  | "place"
  | "profession"
  | "religion"
  | "science"
  | "sports"
  | "technology"
  | "thing"
  | "time"
  | "transportation";

function generateRandomWords(length: number): string {
  const nounArr = [
    "animals",
    "business",
    "education",
    "family",
    "food",
    "health",
    "media",
    "people",
    "place",
    "profession",
    "religion",
    "science",
    "sports",
    "technology",
    "thing",
    "time",
  ];
  const noun = [nounArr[Math.floor(Math.random() * nounArr.length)]] as TNoun[];
  const caseType: TCase = "lower";
  const options = {
    format: caseType,
    categories: {
      noun: noun,
    },
  };
  const word = generateSlug(length, options);
  return word;
}

export { generateRandomWords };
