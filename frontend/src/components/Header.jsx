import { useState } from "react";
import Plus from "../assets/plus-solid.svg";
import Search from "../assets/search-solid.svg";
import Xmark from "../assets/xmark-solid.svg";
import { Link } from "react-router-dom";
import HeartFull from "../assets/heart-solid.svg";
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  // Aperçu de l'image
  const [preview, setPreview] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // Données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envoi du formulaire pour la création d'une recette
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", formData.image);
    formData.append("title", formData.title);
    formData.append("description", formData.description);
    formData.append("type", formData.type);
    formData.append("category", formData.category);
    formData.append("ingredients", formData.ingredients);
    formData.append("steps", formData.steps);
    formData.append("time", formData.time);
    try {
      const response = await fetch("http://localhost:3000/recipes/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setFormData({
          image: null,
          title: "",
          description: "",
          type: "",
          category: "",
          ingredients: "",
          steps: "",
          time: "",
        });
        setPreview(null);
        alert("Votre recette a été enregistrée avec succès !");
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

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

        <button className='btn' onClick={() => setIsOpen(true)}>
          + Ajouter une recette
        </button>

        <button className='btn-mobile' onClick={() => setIsOpen(true)}>
          <img id='plus-icon' src={Plus} alt='Icone Plus' />
        </button>

        <Link className="btn" to='/favoris'>
          <button>Favoris</button>
        </Link>

        <Link to='/favoris'>
          <button className="btn-mobile">
            <img id="heart-icon" src={HeartFull} alt='Icone Coeur' />
          </button>
        </Link>

        {isOpen && (
          <section className='modal'>
            <section className='modal--form'>
              <img
                src={Xmark}
                alt='Icone Croix'
                className='modal--form--close'
                onClick={() => setIsOpen(false)}
              />
              <h2>Ajouter une recette</h2>
              <form onSubmit={handleSubmit}>
                <div>
                  {/* Image et preview */}
                  {preview && (
                    <div>
                      <img src={preview} alt='Preview' className='preview' />
                    </div>
                  )}
                  <label>
                    Ajouter une image
                    <input
                      type='file'
                      name='file'
                      id='file'
                      onChange={handleFile}
                      required
                    />
                  </label>

                  {/* Nom de la recette */}
                  <label>
                    Titre
                    <input
                      type='text'
                      name='title'
                      id='title'
                      placeholder='Nom de la recette'
                      value={formData.title}
                      onSubmit={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      id='description'
                      name='description'
                      placeholder='Description de la recette'
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <div className='form--select'>
                    {/* Type de recette */}
                    <label>
                      Type
                      <select
                        name='type'
                        id='type'
                        value={formData.type}
                        onChange={handleChange}
                        required>
                        <option value=''>Choisir</option>
                      </select>
                    </label>

                    {/* Categorie de recette */}
                    <label>
                      Categorie
                      <select
                        id='category'
                        name='category'
                        value={formData.category}
                        onChange={handleChange}
                        required>
                        <option value=''>Choisir</option>
                      </select>
                    </label>
                  </div>
                </div>

                <div>
                  {/* Liste des ingrédients */}
                  <label>
                    Ingrédients
                    <textarea
                      id='ingredients'
                      name='ingredients'
                      placeholder="Nom de l'ingrédient"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  {/* Liste des etapes */}
                  <label>
                    Etapes
                    <textarea
                      id='etapes'
                      name='etapes'
                      placeholder='Étapes de la recette'
                      value={formData.ingredients}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  {/* Temps */}
                  <label>
                    Temps
                    <input
                      type='time'
                      name='time'
                      id='time'
                      value={formData.time}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
              </form>

              <button type='submit'>Publier la recette</button>
            </section>
          </section>
        )}
      </div>
    </header>
  );
}

export default Header;
