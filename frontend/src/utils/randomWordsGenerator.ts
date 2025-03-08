import { generateSlug } from "random-word-slugs";

type TNounCategory =
  | (
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
      | "transportation"
    )[]
  | undefined;

type TCase = "kebab" | "camel" | "sentence" | "lower" | "title";

function generateRandomWords(noun: TNounCategory, length: number): string {
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
  if (typeof noun === "undefined") {
    noun = [
      nounArr[Math.floor(Math.random() * nounArr.length)],
    ] as TNounCategory;
  }
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
