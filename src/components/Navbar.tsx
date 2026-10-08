import { NavLink } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
    cn('navbar-item', { 'has-background-grey-lighter': isActive });

  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink className={getLinkClassName} to="/">
            Home
          </NavLink>

          <NavLink
            aria-current="page"
            className={getLinkClassName}
            to="/people"
          >
            People
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
