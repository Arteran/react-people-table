import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { useMemo } from 'react';
import cn from 'classnames';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const search = (searchParams.get('search') || '').toLocaleLowerCase();
  const centuries = searchParams.getAll('centuries').map(Number);
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = useMemo(() => {
    let returnArray = [...people];

    if (search.trim()) {
      returnArray = returnArray.filter(
        person =>
          person.name.toLocaleLowerCase().includes(search) ||
          person.fatherName?.toLocaleLowerCase().includes(search) ||
          person.motherName?.toLocaleLowerCase().includes(search),
      );
    }

    if (sex) {
      returnArray = returnArray.filter(person => {
        if (sex === 'f') {
          return person.sex === 'f';
        }

        if (sex === 'm') {
          return person.sex === 'm';
        }
      });
    }

    if (centuries.length !== 0) {
      returnArray = returnArray.filter(
        person =>
          person.born <= Math.max(...centuries) * 100 &&
          person.born > (Math.min(...centuries) - 1) * 100,
      );
    }

    if (sort) {
      returnArray = returnArray.sort((person1, person2) => {
        switch (sort) {
          case 'name':
            return order ? 1 : -1 * person2.name.localeCompare(person1.name);

          case 'sex':
            return order ? 1 : -1 * person2.sex.localeCompare(person1.sex);

          case 'born':
            return order ? 1 : -1 * person2.born - person1.born;

          case 'died':
            return order ? 1 : -1 * person2.died - person1.died;

          default:
            return 0;
        }
      });
    }

    return returnArray;
  }, [people, search, sex, centuries, sort, order]);

  const HandleSortChange = (newParam: string) => {
    if (order) {
      searchParams.delete('order');
      if (sort !== newParam) {
        searchParams.set('sort', newParam);
      } else {
        searchParams.delete('sort');
      }

      return setSearchParams(searchParams);
    }

    if (sort === newParam) {
      searchParams.set('order', 'desc');

      return setSearchParams(searchParams);
    }

    searchParams.set('sort', newParam);

    return setSearchParams(searchParams);
  };

  if (filteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <a onClick={() => HandleSortChange('name')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'name',
                      'fa-sort-up': sort === 'name' && !order,
                      'fa-sort-down': sort === 'name' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => HandleSortChange('sex')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'sex',
                      'fa-sort-up': sort === 'sex' && !order,
                      'fa-sort-down': sort === 'sex' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => HandleSortChange('born')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'born',
                      'fa-sort-up': sort === 'born' && !order,
                      'fa-sort-down': sort === 'born' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => HandleSortChange('died')}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sort !== 'died',
                      'fa-sort-up': sort === 'died' && !order,
                      'fa-sort-down': sort === 'died' && order,
                    })}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredPeople.length !== 0 &&
          filteredPeople.map(person => (
            <tr
              data-cy="person"
              key={person.slug}
              className={person.slug === slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={{
                    pathname: `/people/${person.slug}`,
                    search: searchParams.toString(),
                  }}
                  className={person.sex === 'f' ? 'has-text-danger' : ''}
                >
                  {person.name}
                </Link>
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              {!person.motherName && <td>-</td>}
              {!person.fatherName && <td>-</td>}

              {person.motherName && (
                <td>
                  {person.mother ? (
                    <Link
                      className="has-text-danger"
                      to={{
                        pathname: `/people/${person.mother.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {person.mother.name}
                    </Link>
                  ) : (
                    <p>{person.motherName}</p>
                  )}
                </td>
              )}

              {person.fatherName && (
                <td>
                  {person.father ? (
                    <Link
                      to={{
                        pathname: `/people/${person.father.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    <p>{person.fatherName}</p>
                  )}
                </td>
              )}
            </tr>
          ))}
      </tbody>
      {sort}
    </table>
  );
};
