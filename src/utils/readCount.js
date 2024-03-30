import { convert } from "html-to-text";

export const readCount = (content) => {
  const text = convert(content, { wordwrap: null }); // converting the html to string
  const words = text.split(" "); //converting the string to array to count words
  const readTime = Math.ceil(words.length / 200); // assuming 200 words/min
  return readTime;
};
