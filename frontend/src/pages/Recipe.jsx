import Globe from "../assets/globe-solid.svg";
import Clock from "../assets/clock-solid.svg";
import Ustensil from "../assets/fork-knife.svg";
import HeartFull from "../assets/heart-solid.svg";
import HeartEmpty from "../assets/heart-regular.svg";
import { useEffect, useState } from "react";
import FetchData from "../components/Fetch";
import { useParams } from "react-router-dom";

function Recipe() {
  const { _id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorite")) || []
  );
  const [like, setLike] = useState(
    favorite.find((item) => item._id === _id) ? false : true
  );

  // Import de la recette
  const getRecipe = () =>
    FetchData(`http://localhost:3000/recipes/${_id}`, setRecipe);

  // Ajout ou suppression de la recette aux favoris dans le localStorage
  const addFavorite = () => {
    const newFavorite = like
      ? [...favorite, recipe]
      : favorite.filter((item) => item._id !== recipe._id);
    setFavorite(newFavorite);
    localStorage.setItem("favorite", JSON.stringify(newFavorite));
    setLike(!like);
  };

  useEffect(() => {
    getRecipe();
  }, [_id]);

  return (
    <main>
      {recipe ? (
        <>
          <section className='recipe'>
            <section className='recipe--title'>
              <h2>{recipe.title}</h2>
              <hr />
              <p>{recipe.description}</p>
            </section>

            {/* SECTION INFORMATIONS */}
            <section className='recipe--infos'>
              <span>
                <img loading='lazy' src={Globe} alt='Icone Globe' />
                <p>{recipe.type}</p>
              </span>
              <span>
                <img loading='lazy' src={Ustensil} alt='Icone Ustensil' />
                <p>{recipe.category}</p>
              </span>
              <span>
                <img loading='lazy' src={Clock} alt='Icone Horloge' />
                <p>{recipe.time}</p>
              </span>
              <span>
                <img
                  loading='lazy'
                  onClick={() => addFavorite()}
                  src={like ? HeartEmpty : HeartFull}
                  alt='Icone Coeur'
                  className='heart'
                  key={_id}
                />
                <p>Favori</p>
              </span>
            </section>
          </section>

          <section className='preparation'>
            <section className='preparation--ingredients'>
              <div>
                <h3>Ingredients</h3>
                {/* lISTE DES INGREDIENTS */}
                <ul>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                </ul>
              </div>
              <hr />
              <img
                loading='lazy'
                src={`http://localhost:3000/images/${recipe.image}`}
                alt={recipe.title}
              />
            </section>
            {/* ETAPES DE LA PREPARATION */}
            <section className='preparation--steps'>
              <ul>
                {recipe.steps &&
                  recipe.steps.map((step, index) => (
                    <ul key={index}>
                      <p>Etape {index + 1}</p>
                      <li>{step}</li>
                    </ul>
                  ))}
              </ul>
            </section>
          </section>
        </>
      ) : (
        <p>La recette n'existe pas</p>
      )}
    </main>
  );
}

export default Recipe;
