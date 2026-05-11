import m1 from "@/assets/images/memory-1.jpg";
import m2 from "@/assets/images/memory-2.jpg";
import m3 from "@/assets/images/memory-3.jpg";
import m4 from "@/assets/images/memory-4.jpg";

export type Memory = {
  date: string;
  title: string;
  caption: string;
  image: string;
};

export const timeline: Memory[] = [
  { date: "The first day",       title: "When I first saw you",      caption: "I didn't know yet. But something in me did.",                       image: m1 },
  { date: "Our first laugh",     title: "The night we couldn't stop laughing", caption: "I remember the sound more than the joke.",            image: m2 },
  { date: "The hard month",      title: "When everything was heavy", caption: "We held on. That's all that mattered.",                              image: m3 },
  { date: "The quiet evening",   title: "Just us, no one else",      caption: "String lights, your hand in mine. Nothing fancy. Everything.",       image: m4 },
  { date: "And now",             title: "Today",                     caption: "Still choosing you. Still impossibly lucky.",                       image: m1 },
];
