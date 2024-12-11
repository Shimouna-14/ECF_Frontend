import Plus from "../assets/plus-solid.svg";
import Search from "../assets/search-solid.svg";
import { Link } from "react-router-dom";
function Header() {
  return (
    <header>
      <h1>
        <Link to='/'>Zestify</Link>
      </h1>
      <div>
        <label htmlFor='search'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Rechercher une recette'
          />
          <img src={Search} alt='Icone Recherche' />
        </label>
        <button id='btn'>+ Ajouter une recette</button>
        <button id='btn-mobile'>
          <img id='plus-icon' src={Plus} alt='Icone Plus' />
        </button>
      </div>
    </header>
  );
}

export default Header;
