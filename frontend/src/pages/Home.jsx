import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import FetchData from "../components/Fetch";

function Home() {
  const [filterSelected, setFilterSelected] = useState(true);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [filterCategory, setFilterCategory] = useState(false);
  const [filterType, setFilterType] = useState(false);
  const [recipes, setRecipes] = useState([]);

  // Import des categories et des types
  const getCategories = () =>
    FetchData("http://localhost:3000/filters/categories", setCategories);
  const getTypes = () =>
    FetchData("http://localhost:3000/filters/types", setTypes);

  // Import des recettes
  const getRecipes = () =>
    FetchData(`http://localhost:3000/recipes`, setRecipes);

  useEffect(() => {
    getCategories();
    getTypes();
    getRecipes();
  }, []);

  return (
    <main>
      <section className='hero'>
        <div>
          <h2>
            Cook, Love, Share <br /> a recipe
          </h2>
        </div>
      </section>

      {/* ---------- FILTRES ---------- */}
      <section className='filter'>
        <section className='filter--title'>
          <p
            className={
              filterSelected ? "active-categories" : "inactive-categories"
            }
            onClick={() => setFilterSelected(true)}>
            Catégories
          </p>
          <p
            className={filterSelected ? "inactive-types" : "active-types"}
            onClick={() => setFilterSelected(false)}>
            Types
          </p>
        </section>

        {/* ---------- CATEGORIES ---------- */}
        <section
          className='content--categories'
          style={{ display: filterSelected ? "flex" : "none" }}>
          {categories.map((category) => (
            <span key={category.id}>
              <p
                onClick={() => {
                  setFilterCategory(
                    filterCategory === category.id ? false : category.id
                  );
                  setCategory(category.name);
                }}
                style={
                  filterCategory === category.id
                    ? { borderBottom: "var(--black) 1px solid" }
                    : { borderBottom: "none" }
                }>
                {category.name}
              </p>
            </span>
          ))}
        </section>

        {/* ---------- TYPES ---------- */}
        <section
          className='content--types'
          style={{ display: filterSelected ? "none" : "flex" }}>
          {types.map((type) => (
            <span key={type.id}>
              <p
                onClick={() => {
                  setFilterType(filterType === type.id ? false : type.id);
                  setType(type.name);
                }}
                style={
                  filterType === type.id
                    ? { borderBottom: "var(--black) 1px solid" }
                    : { borderBottom: "none" }
                }>
                {type.name}
              </p>
            </span>
          ))}
        </section>
      </section>
      {/* ---------- RECETTES ---------- */}
      <section className='recipes'>
        <h3>Découvrez differentes recettes à realiser selon vos envies</h3>
        <section className='recipes--cards'>
          {recipes
            .filter(
              (recipe) =>
                (filterType === false ? true : recipe.type === type) &&
                (filterCategory === false ? true : recipe.category === category)
            )
            .map((recipe) => (
              <Link to={`/recette/${recipe._id}`} key={recipe._id}>
                <section className='cards'>
                  <div>
                    <img
                      loading='lazy'
                      src={`http://localhost:3000/images/${recipe.image}`}
                      alt={recipe.title}
                    />
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

export default Home;

