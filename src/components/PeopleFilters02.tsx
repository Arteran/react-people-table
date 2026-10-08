import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const search = searchParams.get('search') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleSexChange = (newSexParam: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', newSexParam);
    setSearchParams(params);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('search', e.target.value);
    setSearchParams(params);
  };

  const handleСenturiesChange = (newCentury: string) => {
    const params = new URLSearchParams(searchParams);

    const newCenturies = centuries.includes(newCentury)
      ? centuries.filter(century => century !== newCentury)
      : [...centuries, newCentury];

    params.delete('centuries');
    newCenturies.forEach(century => params.append('centuries', `${century}`));
    setSearchParams(params);
  };

  const handleСenturiesAges = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
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
