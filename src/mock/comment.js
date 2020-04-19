import {COMMENTS_COUNT} from "../const";
import {getRandomArrayItem} from "../utils/common";

const emotions = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const authors = [
  `Ilya O'Reilly`,
  `Sam Smith`,
  `Taylor Swift`,
  `Tim Macoveev`,
  `John Doe`
];

const getComment = (id) => (
  {
    id,
    author: getRandomArrayItem(authors),
    comment: `a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.`,
    date: `2019-05-11T16:12:32.554Z`,
    emotion: getRandomArrayItem(emotions),
  }
);

const getComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push(getComment(i));
  }

  return comments;
};

const comments = getComments(COMMENTS_COUNT);

export {comments};
