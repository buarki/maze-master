import { Metadata } from "next";

const title = 'maze master';
const description = 'Funny webapp to solve mazes.';
const siteURL = process.env.SITE_URL;
const authorName = process.env.AUTHOR_NAME;

export const defaultMetadata: Metadata = {
  title: title,
  description: description,
  keywords: ['maze solving', 'graphs', 'A*', 'dijkstra', 'bfs'],
  authors: [
    {
      url: siteURL,
      name: authorName,
    },
  ],
  creator: authorName,
  openGraph: {
    title: title,
    description: description,
    siteName: title,
    locale: 'en-US',
    images: [
      {
        url: '/maze-master.png',
        alt: 'A solved maze screenshot',
      },
    ],
  },
  twitter: {
    title: title,
    description: description,
    creator: authorName,
    images: [
      {
        url: '/maze-master.png',
      },
    ],
  },
}
