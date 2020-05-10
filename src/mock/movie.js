import {randomInteger, getRandomArrayItem} from "../utils/common";
import {comments} from "./comment";


const watchingDates = [
  `2020-05-03T19:08:05.477Z`,
  `2020-05-03T19:08:05.477Z`,
  `2020-05-03T19:08:05.477Z`,
  `2020-04-20T19:08:05.477Z`,
  `2020-04-21T19:08:05.477Z`,
  `2020-04-10T19:08:05.493Z`,
  `2019-08-15T19:08:05.493Z`,
  `2019-05-10T19:08:05.493Z`,
  `2019-05-01T19:08:05.493Z`,
  `2019-08-11T19:08:05.493Z`,
  `2020-05-10T19:08:05.493Z`,
  `2020-05-10T19:08:05.493Z`,
  `2020-05-10T19:08:05.493Z`,
  `2019-09-08T19:08:05.494Z`,
  `2019-08-01T19:08:05.494Z`
];

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

const getMovie = (index) => {
  return {
    id: String(+new Date() + Math.random()),
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
    releaseDate: +(new Date()) - Math.floor(Math.random() * 10 * 31536000000),
    releaseCountry: getRandomArrayItem(countries),
    runtime: randomInteger(77, 180),
    favorite: Math.random() > 0.5,
    watchlist: Math.random() > 0.5,
    alreadyWatched: Math.random() > 0.5,
    userDetails: {
      personalRating: randomInteger(0, 30),
      watchingDate: watchingDates[index],
    }
  };
};

const getMovies = (count) => {
  const movies = [];

  for (let i = 0; i < count; i++) {
    movies.push(getMovie(i));
  }

  return movies;
};

export {getMovies};
