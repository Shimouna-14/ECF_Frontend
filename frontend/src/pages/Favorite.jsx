import { useState } from "react";
import { Link } from "react-router-dom";

function Favorite() {
  // Import des recettes dans le localStorage
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );

  return (
    <main>
      <section className='recipes'>
        <h2>Mes recettes favorites</h2>
        <section className='recipes--cards'>
          {favorite.map((recipe) => (
            <Link to={`/recette/${recipe._id}`} key={recipe._id}>
              <section className='cards'>
                <div>
                  <img loading="lazy" src={`http://localhost:3000/images/${recipe.image}`} alt={recipe.title} />
                </div>
                <p>{recipe.title}</p>
                <p>Temps : {recipe.time} </p>
              </section>
            </Link>
          ))}
        </section>
      </section>
    </main>
  );
}

export default Favorite;

