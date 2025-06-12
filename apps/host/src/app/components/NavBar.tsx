import { NavLink } from 'react-router-dom';

const linkBase =
  'px-4 py-2 rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
const linkInactive = 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
const linkActive = 'text-white bg-blue-600';

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="dashboard/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="upload/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? linkActive : linkInactive}`
          }
        >
          Upload
        </NavLink>
      </nav>
    </header>
  );
}
