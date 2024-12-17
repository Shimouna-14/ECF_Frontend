import { useState } from "react";
import Plus from "../assets/plus-solid.svg";
import Search from "../assets/search-solid.svg";
import { Link } from "react-router-dom";
import HeartFull from "../assets/heart-solid.svg";
import RecipeForm from "./RecipeForm";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

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
          <img
            loading='lazy'
            className='search-icon'
            src={Search}
            alt='Icone Recherche'
          />
        </label>

        <button className='btn' onClick={() => setIsOpen(true)}>
          + Ajouter une recette
        </button>

        <button className='btn-mobile' onClick={() => setIsOpen(true)}>
          <img loading='lazy' id='plus-icon' src={Plus} alt='Icone Plus' />
        </button>

        <Link className='btn' to='/favoris'>
          <button>Favoris</button>
        </Link>

        <Link to='/favoris'>
          <button className='btn-mobile'>
            <img
              loading='lazy'
              id='heart-icon'
              src={HeartFull}
              alt='Icone Coeur'
            />
          </button>
        </Link>

        <RecipeForm 
          isOpen={isOpen}
          onClose={() => setIsOpen(false)} 
          />
      </div>
    </header>
  );
}

export default Header;
