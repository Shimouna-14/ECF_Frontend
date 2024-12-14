import Globe from "../assets/globe-solid.svg";
import Clock from "../assets/clock-solid.svg";
import Ustensil from "../assets/fork-knife.svg";
import HeartFull from "../assets/heart-solid.svg";
import HeartEmpty from "../assets/heart-regular.svg";
import { useEffect, useState } from "react";
import FetchData from "../components/Fetch";
import { useParams } from "react-router-dom";
function Recipe() {
  const [like, setLike] = useState(false);
  const [recipe, setRecipe] = useState({});
  const { _id } = useParams();
  const getRecipe = () =>
    FetchData(`http://localhost:3000/recipes/${_id}`, setRecipe);

  useEffect(() => {
    getRecipe();
  }, []);

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

            <section className='recipe--infos'>
              <span>
                <img src={Globe} alt='Icone Globe' />
                <p>{recipe.type}</p>
              </span>
              <span>
                <img src={Ustensil} alt='Icone Ustensil' />
                <p>{recipe.category}</p>
              </span>
              <span>
                <img src={Clock} alt='Icone Horloge' />
                <p>{recipe.time}</p>
              </span>
              <span>
                <img
                  onClick={() => setLike(!like)}
                  src={like ? HeartFull : HeartEmpty}
                  alt='Icone Coeur'
                  className='heart {like ? "heart-full" : "heart-empty"}'
                />
                <p>Favori</p>
              </span>
            </section>
          </section>

          <section className='preparation'>
            <section className='preparation--ingredients'>
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {recipe.ingredients &&
                    recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                </ul>
              </div>
              <hr />
              <img
                src={`http://localhost:3000/images/${recipe.image}`}
                alt={recipe.title}
              />
            </section>
            <section className='preparation--steps'>
              <ul>
                {recipe.steps &&
                  recipe.steps.map((step, index) => (
                    <ul>
                      <p key={index}>Etape {recipe.steps.indexOf(step) + 1}</p>
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
