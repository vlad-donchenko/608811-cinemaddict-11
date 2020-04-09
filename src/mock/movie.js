import {randomInteger, getRandomArrayItem} from "../utils";
import {comments} from "./comment";

const getRandomComments = () => {
  return comments.slice().filter(() => {
    return Math.random() > 0.5;
  });
};

const getRandomCommentsId = (items) => {
  return items.map((item) => {
    return item.id;
  });
};

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`
];

const posters = [
  `made-for-each-other.png`,
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`
];

const genres = [
  `Drama`,
  `Film-Noir`,
  `Mystery`,
  `Cartoon`,
  `Comedy`,
  `Western`,
  `Musical`
];

const countries = [
  `Finland`,
  `USA`,
  `England`,
  `Canada`,
  `France`
];

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const getRandomDescription = () => {
  const descriptionItems = description.slice().split(`.`);

  return descriptionItems.slice().filter(() => {
    return Math.random() > 0.5;
  }).slice(0, 5).join(`. `);
};

const getGenre = () => {
  const currentGenres = genres.slice().filter(() => {
    return Math.random() > 0.5;
  });

  return currentGenres.slice(0, randomInteger(1, currentGenres.length - 1));
};

const getMovie = () => {
  return {
    title: getRandomArrayItem(titles),
    poster: getRandomArrayItem(posters),
    description: getRandomDescription(),
    rating: randomInteger(0, 9).toFixed(1),
    comments: getRandomCommentsId(getRandomComments()),
    genre: getGenre(),
    ageRating: randomInteger(4, 18),
    director: [`Anthony Mann`, `Tom Ford`],
    writers: [`Takeshi Kitano`, `Anne Wigton`, `Heinz Herald`, `Richard Weil`],
    actors: [`Erich von Stroheim`, `Mary Beth Hughes`, `Dan Duryea`, `Morgan Freeman`],
    release: {
      date: 1475924187819,
      releaseCountry: getRandomArrayItem(countries),
    },
    runtime: randomInteger(77, 180),
    userDetails: {
      personalRating: randomInteger(0, 30),
      watchlist: Math.random() > 0.5,
      alreadyWatched: Math.random() > 0.5,
      watchingDate: `2019-05-11T16:12:32.554Z`,
      favorite: Math.random() > 0.5,
    }
  };
};

const getMovies = (count) => {
  const movies = [];

  for (let i = 0; i < count; i++) {
    movies.push(getMovie());
  }

  return movies;
};

export {getMovies};