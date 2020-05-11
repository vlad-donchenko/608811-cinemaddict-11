import AbstractComponent from "./abstract-component";
import {getUserRankTitle} from "../utils/common";

const createUserRankTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${rank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

class UserRank extends AbstractComponent {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return createUserRankTemplate(this._rank);
  }
}

export default UserRank;
