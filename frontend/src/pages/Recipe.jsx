import Globe from "../assets/globe-solid.svg";
import Clock from "../assets/clock-solid.svg";
import Ustensil from "../assets/fork-knife.svg";
import HeartFull from "../assets/heart-solid.svg";
import HeartEmpty from "../assets/heart-regular.svg";

function Recipe() {
  return (
    <main>
      <section className='recette'>
        <section className='recette--titre'>
          <h2>Recipe Title</h2>
          <hr />
          <p>Recipe Description</p>
        </section>

        <section className='recette--infos'>
          <span>
            <img src={Globe} alt='Icone Globe' />
            <p>Type</p>
          </span>
          <span>
            <img src={Ustensil} alt='Icone Ustensil' />
            <p>Categorie</p>
          </span>
          <span>
            <img src={Clock} alt='Icone Horloge' />
            <p>Temps</p>
          </span>
          <span>
            <img src={HeartEmpty} alt='Icone Coeur' className='heart-empty' />
            <p>Favori</p>
          </span>
        </section>
      </section>

      <section className='preparation'>
        <section className='preparation--ingredients'>
          <div>
            <h3>Ingredients</h3>
            <ul>
              <li>Ingredient 1</li>
            </ul>
          </div>
          <img src='' alt='' />
        </section>
        <section className='preparation--etapes'>
          <ul>
            <ul>
              <p>Etape 1</p>
              <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. </li>
            </ul>
          </ul>
        </section>
      </section>
    </main>
  );
}

export default Recipe;
