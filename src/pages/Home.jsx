import { Link } from "react-router-dom";
import BgImg from "../assets/stefan-vladimirov-Q_Moi2xjieU-unsplash.jpg";
function Home() {
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
          <p className='filtre--titre--categories active-categories'>
            Catégories
          </p>
          <p className='filtre--titre--types active-types'>Types</p>
        </section>

        <section className='contenu--categories'>
          <span>
            <img src='' alt='' />
            <p>Mot</p>
          </span>
        </section>
        {/* <section className='contenu--types'>
          <span>
            <img src='' alt='' />
            <p>Mot</p>
          </span>
        </section> */}
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
