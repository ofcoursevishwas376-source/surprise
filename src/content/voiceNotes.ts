export type VoiceNote = {
  title: string;
  category: string;
  src: string;        // public path
  duration?: string;
};

export const voiceNotes: VoiceNote[] = [
  { title: "AK Cover 1",                    category: "AK Cover",   src: "/surprise_voice_recording/1.mp4", duration: "0:45" },
  { title: "AK Cover 2",                    category: "AK Cover",   src: "/surprise_voice_recording/2.mp4", duration: "0:45" },
  { title: "AK Cover 3",                    category: "AK Cover",   src: "/surprise_voice_recording/3.mp4", duration: "0:45" },
  { title: "AK Cover 4",                    category: "AK Cover",   src: "/surprise_voice_recording/4.mp4", duration: "0:45" },
  { title: "AK Cover 5",                    category: "AK Cover",   src: "/surprise_voice_recording/5.mp4", duration: "0:45" },
  { title: "AK Cover 6",                    category: "AK Cover",   src: "/surprise_voice_recording/6.mp4", duration: "0:45" },
  { title: "AK Cover 7",                    category: "AK Cover",   src: "/surprise_voice_recording/7.mp4", duration: "0:45" },
  { title: "AK Cover 8",                    category: "AK Cover",   src: "/surprise_voice_recording/8.mp4", duration: "0:45" },
  { title: "AK Cover 9",                    category: "AK Cover",   src: "/surprise_voice_recording/9.mp4", duration: "0:45" },
  { title: "AK Cover 10",                   category: "AK Cover",   src: "/surprise_voice_recording/10.mp4", duration: "0:45" },
  { title: "AK Cover 11",                   category: "AK Cover",   src: "/surprise_voice_recording/11.mp4", duration: "0:45" },
];
