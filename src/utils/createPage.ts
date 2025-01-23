import { nanoid } from "nanoid";

export const createPage = () => {
  const slug = nanoid();
  const id = nanoid();

  const page = {
    id,
    slug,
    title: "Untitled",
    nodes: [],
    cover: "Notez.png"
  }
  return page;
}