export type GalleryItem = {
  type: "image" | "video";
  src: string;
  caption: string;
  date: string;
  poster?: string;
};

export const gallery: GalleryItem[] = [
  { type: "image", src: "/surprise_images/1.jpeg", caption: "a model image from Vogue."},
  { type: "image", src: "/surprise_images/2.jpeg", caption: "Vishu!! hoog neer ge haaru!!"},
  { type: "image", src: "/surprise_images/3.jpeg", caption: "Ayyo, thinno thara nodtha idhane.."},
  { type: "image", src: "/surprise_images/4.jpeg", caption: "Putti heelidde correct!"},
  { type: "image", src: "/surprise_images/5.jpeg", caption: "The cute Mom to be picture."},
  { type: "image", src: "/surprise_images/6.jpeg", caption: "The beautiful smile."},
  { type: "image", src: "/surprise_images/7.jpeg", caption: "The Power Rangers pose."},
  { type: "image", src: "/surprise_images/8.jpeg", caption: "Loot at her confidence."},
  { type: "image", src: "/surprise_images/9.jpeg", caption: "The cutest of all the time."},
  { type: "image", src: "/surprise_images/10.jpeg", caption: "uffff........"},
  { type: "image", src: "/surprise_images/11.jpeg", caption: "eeeeeeeeeeee"},
  { type: "image", src: "/surprise_images/12.jpeg", caption: "The only cutest beings on the earth."},
  { type: "video", src: "/surprise_images/cute_video.mp4", caption: "The moment where the cuteness got sky rocketed.", date: "Play" },
];
