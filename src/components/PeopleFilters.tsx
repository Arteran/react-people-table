import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

type Param = string | number;
type Params = {
  [key: string]: Param[] | Param | null;
};

function getSearchWith(params: Params, search?: string | URLSearchParams) {
  const newParams = new URLSearchParams(search);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newParams.delete(key);
    } else if (Array.isArray(value)) {
      newParams.delete(key);
      value.forEach(item => newParams.append(key, item.toString()));
    } else {
      newParams.set(key, value.toString());
    }
  }

  return newParams.toString();
}

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const search = searchParams.get('search') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: Params) => {
    const Search = getSearchWith(params, searchParams);

    setSearchParams(Search);
  };

  const handleSexChange = (newSexParam: string) => {
    setSearchWith({ sex: newSexParam || null });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ search: e.target.value || null });
  };

  const handleСenturiesChange = (newCentury: string) => {
    const newCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    setSearchWith({ centuries: newCenturies });
  };

  const handleСenturiesAges = () => {
    setSearchWith({ centuries: null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => handleSexChange('')}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={search}
            onChange={e => handleSearchChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(item => (
              <a
                key={item}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${item}`),
                })}
                onClick={() => handleСenturiesChange(`${item}`)}
              >
                {item}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
              onClick={handleСenturiesAges}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
