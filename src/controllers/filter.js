import {FilterType} from "../const";
import MenuComponent from "../components/filter";
import {getMoviesByFilter} from "../utils/filter";
import {RenderPosition, replace, render} from "../utils/render";

class FilterController {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;
    this._activeFilterType = FilterType.ALL_MOVIES;
    this._filterComponent = null;
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._moviesModel.setDataChangeHandler(this._onDataChange);
  }

  render() {
    const container = this._container;
    const allMovies = this._moviesModel.getMoviesAll();

    const filters = Object.values(FilterType).map((filterType) => {
      return {
        title: filterType,
        count: filterType === FilterType.ALL_MOVIES ? null : getMoviesByFilter(filterType, allMovies).length,
        isActive: this._activeFilterType === filterType
      };
    });

    const oldFilterComponent = this._filterComponent;
    this._filterComponent = new MenuComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldFilterComponent) {
      replace(this._filterComponent, oldFilterComponent);
    } else {
      render(container, this._filterComponent, RenderPosition.AFTER_BEGIN);
    }
  }

  _onFilterChange(filterType) {
    this._moviesModel.setFilter(filterType);
    this._activeFilterType = filterType;
  }

  _onDataChange() {
    this.render();
  }
}

export default FilterController;
