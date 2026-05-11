export type Question = { q: string; options: string[]; answer: number };

export const quiz: Question[] = [
  { q: "When will you sing soo much?", options: ["when you are sad", "when you are happy", "when you are mad.", "All of the above."], answer: 3 },
  { q: "Who is your fav person after your mother?", options: ["Vishwas", "Vishu", "dudu", "vish"], answer: -1 }, // Special case: any answer is correct
  { q: "When will putti cry?", options: ["when you are sad", "when you are happy", "when you are mad.", "All of the above."], answer: 3 },
];
