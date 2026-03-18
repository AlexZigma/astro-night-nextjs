import { Movie, SortField } from "./types";

export const MOVIES_STORAGE_KEY = "movies";

export const MOVIES: Movie[] = [
  {
    id: "1",
    title: "Major Thunder",
    year: "2018",
    rating: 9.5,
    image: "/imgs/cardbg.webp",
    genres: ["action"],
  },
  {
    id: "2",
    title: "Morphine",
    director: "John Doe",
    year: "2008",
    rating: 8.5,
    image: "/imgs/cardbg.webp",
    genres: ["noir", "drama", "horror"],
    mainActors: "Leonid Bichevin, Ingeborga Dapkunaite",
    description:
      "The year 1917 was a time of turmoil, revolution, hopes and losses. A 23-year-old doctor Polyakov arrives at the hospital in the county town of N. One day, fighting for the life of a patient, Polyakov endangers his...",
  },
  {
    id: "3",
    title: "Akira",
    director: "Katsuhiro Otomo",
    year: "1988",
    rating: 8.5,
    image: "/imgs/cardbg.webp",
    genres: ["animation", "action", "horror"],
    mainActors: "Mitsuo Iwata, Nozomu Sasaki, Mami Koyama",
    description: `In 2019, following a world war triggered 
by the sudden destruction of Tokyo on July 16, 1988, Neo-Tokyo is plagued by corruption, anti-government protests, terrorism, and gang violence. During 
a violent rally, the hot-headed Shōtarō Kaneda leads his vigilante bōsōzoku gang, the Capsules, against the rival Clown gang. Kaneda's best friend, Tetsuo Shima, inadvertently crashes his motorcycle 
into Takashi, an esper who escaped from a government laboratory with the aid of a resistance organization. Assisted by fellow esper Masaru, Japan Self-Defense Forces Colonel Shikishima recaptures Takashi, 
has Tetsuo hospitalized, and arrests the Capsules. While being interrogated by the police, Kaneda meets Kei, an activist within the resistance movement, 
and tricks the authorities into releasing
her with his gang`,
  },

  {
    id: "4",
    title: "Major Thunder",
    year: "2018",
    rating: 9.5,
    image: "/imgs/cardbg.webp",
    genres: ["action"],
  },
  {
    id: "5",
    title: "Major Thunder",
    year: "2018",
    rating: 9.5,
    image: "/imgs/cardbg.webp",
    genres: ["action"],
  },
  {
    id: "6",
    title: "Major Thunder",
    year: "2018",
    rating: 9.5,
    image: "/imgs/cardbg.webp",
    genres: ["action"],
  },
];

export const SortFields: SortField[] = ["rating", "title", "year"];
