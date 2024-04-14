import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="py-10">
      <nav className="flex justify-between" data-testid="navigation">
        <Link
          data-testid="brand"
          className="text-xl text-white hover:text-white"
          to="/"
        >
          Testing
        </Link>

        <ul className="flex gap-5">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export { Navbar };
