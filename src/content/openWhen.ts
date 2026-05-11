export type Envelope = {
  label: string;
  title: string;
  letter: string;
};

export const envelopes: Envelope[] = [
  { label: "Open when you're sad",
    title: "Hey. It's okay.",
    letter: "Sit with it. I'm not asking you to be okay right now. Just remember: this passes. Everything passes except us." },
  { label: "Open when you miss me",
    title: "I'm closer than you think.",
    letter: "Close your eyes. I'm there. I always am, in the back of your chest, in the song that just played, in the smell of coffee in the morning." },
  { label: "Open when you feel lonely",
    title: "You are not alone.",
    letter: "I'm thinking about you right now. Yes — right now, while you're reading this. That's how it works. That's how it's always worked." },
  { label: "Open when you need motivation",
    title: "You've done harder things.",
    letter: "Look at everything you've already survived. You're not behind. You're not too late. You're exactly where you need to be, and I believe in you stupidly much." },
];
