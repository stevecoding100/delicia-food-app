import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "t0cl55tq",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

//RUN THIS to add exeption for localhost 3000 CORS policy
// sanity cors add https://locahost:3000

export default client;
