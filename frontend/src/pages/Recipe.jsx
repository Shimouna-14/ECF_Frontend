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
  const [recipe, setRecipe] = useState([]);
  const { id } = useParams();
  const getRecipe = () =>
    FetchData(`http://localhost:3000/recipes/${id}`, setRecipe);

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <main>
      {recipe.map((recipe) => (
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
                  onClick={() => setLike(like)}
                  src={like ? HeartFull : HeartEmpty}
                  alt='Icone Coeur'
                  className={like ? "heart-full" : "heart-empty"}
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
                  {recipe.ingredients.map((ingredient) => (
                    <li>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <img
                src={`http://localhost:3000/images/${recipe.image}`}
                alt={recipe.title}
              />
            </section>
            <section className='preparation--steps'>
              <ul>
                <ul>
                  <p>Etape 1</p>
                  {recipe.steps.map((step) => (
                    <li>{step}</li>
                  ))}
                </ul>
              </ul>
            </section>
          </section>
        </>
      ))}
    </main>
  );
}

export default Recipe;
