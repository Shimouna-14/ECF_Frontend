import { Link } from "react-router-dom";
import BgImg from "../assets/stefan-vladimirov-Q_Moi2xjieU-unsplash.jpg";
import { useEffect, useState } from "react";
import FetchData from "../components/Fetch";

function Home() {
  const [filtreSelected, setFiltreSelected] = useState(true);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [filterCategory, setFilterCategory] = useState(false);
  const [filterType, setFilterType] = useState(false);

  // Importation des categories et des types
  const getCategories = () =>
    FetchData("http://localhost:3000/filters/categories", setCategories);
  const getTypes = () =>
    FetchData("http://localhost:3000/filters/types", setTypes);

  useEffect(() => {
    getCategories();
    getTypes();
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

      <section className='filtre'>
        <section className='filtre--titre'>
          <p
            onClick={() => setFiltreSelected(true)}
            className={
              filtreSelected ? "active-categories" : "filtre--titre--categories"
            }>
            Catégories
          </p>
          <p
            onClick={() => setFiltreSelected(false)}
            className={
              filtreSelected ? "filtre--titre--types" : "active-types"
            }>
            Types
          </p>
        </section>

        <section
          className='contenu--categories'
          style={{ display: filtreSelected ? "flex" : "none" }}>
          {categories.map((category) => (
            <span key={category.id}>
              <p
                onClick={() =>
                  setFilterCategory(
                    filterCategory === category.id ? false : category.id
                  )
                }
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
        <section
          className='contenu--types'
          style={{ display: filtreSelected ? "none" : "flex" }}>
          {types.map((type) => (
            <span key={type.id}>
              <p
                onClick={() =>
                  setFilterType(filterType === type.id ? false : type.id)
                }
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

      <section className='recettes'>
        <h3>Découvrez differentes recettes à realiser selon vos envies</h3>
        <section className='recettes--cards'>
          <Link to={"/recette"}>
            <section className='cards'>
              <div>
                <img src='' alt='' />
              </div>
              <p>Recette</p>
              <p>Temps : </p>
            </section>
          </Link>
        </section>
      </section>
    </main>
  );
}

export default Home;
