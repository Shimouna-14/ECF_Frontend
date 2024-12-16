import { useState, useEffect } from "react";
import Plus from "../assets/plus-solid.svg";
import Search from "../assets/search-solid.svg";
import Xmark from "../assets/xmark-solid.svg";
import { Link } from "react-router-dom";
import HeartFull from "../assets/heart-solid.svg";
import FetchData from "../components/Fetch";

function Header() {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [hours, setHours] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    type: "",
    ingredients: "",
    steps: "",
    time: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Import des categories et des types
  const getCategories = () =>
    FetchData("http://localhost:3000/filters/categories", setCategories);
  const getTypes = () =>
    FetchData("http://localhost:3000/filters/types", setTypes);

  // Aperçu de l'image
  const handlePreview = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  // Envoi de l'image
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Données du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Formatage des heures
  const handleHours = (e) => {
    const value = e.target.value;
    const regex = /^[0-9h ]*$/;
    if (value.match(regex)) {
      setHours(value);
    }
  };

  console.log(formData);

  // Envoi du formulaire pour la création d'une recette
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    formDataToSend.append("title", formData.title); // Utilisation explicite
    formDataToSend.append("description", formData.description);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("ingredients", formData.ingredients);
    formDataToSend.append("steps", formData.steps);
    formDataToSend.append("time", hours);

    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: `, value);
    }
    try {
      const response = await fetch("http://localhost:3000/recipes/create", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setFormData({
          image: null,
          title: "",
          description: "",
          category: "",
          type: "",
          ingredients: "",
          steps: "",
          time: "",
        });
        setPreview(null);
        alert("Votre recette a été enregistrée avec succès !");
        setIsOpen(false);
      } else {
        const errorData = await response.json();
        console.error("Erreur serveur :", errorData);
        alert("Une erreur s'est produite lors de l'envoi de la recette.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  useEffect(() => {
    getCategories();
    getTypes();
  }, []);

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
          <img loading='lazy' src={Search} alt='Icone Recherche' />
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

        {isOpen && (
          <section className='modal'>
            <section className='modal--form'>
              <img
                loading='lazy'
                src={Xmark}
                alt='Icone Croix'
                className='modal--form--close'
                onClick={() => setIsOpen(false)}
              />
              <h2>Ajouter une recette</h2>
              <form onSubmit={handleSubmit}>
                <section>
                  <section>
                    {/* Image et preview */}
                    {preview && (
                      <img
                        loading='lazy'
                        src={preview}
                        alt='Preview'
                        className='preview'
                      />
                    )}
                    <label>
                      Ajouter une image
                      <input
                        type='file'
                        name='file'
                        id='file'
                        onChange={(e) => {
                          handlePreview(e);
                          handleImage(e);
                        }}
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
                        onChange={handleChange}
                        required
                      />
                    </label>

                    {/* Description */}
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
                          {types.map((type) => (
                            <option key={type.id} value={type.name}>
                              {type.name}
                            </option>
                          ))}
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
                          {categories.map((category) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </section>

                  <section>
                    {/* Liste des ingrédients */}
                    <label>
                      Ingrédients
                      <textarea
                        id='ingredients'
                        name='ingredients'
                        placeholder="Nom de l'ingrédient"
                        value={formData.ingredients}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    {/* Liste des etapes */}
                    <label>
                      Etapes
                      <textarea
                        id='steps'
                        name='steps'
                        placeholder='Étapes de la recette'
                        value={formData.steps}
                        onChange={handleChange}
                        required
                      />
                    </label>

                    {/* Temps */}
                    <label>
                      Temps
                      <input
                        type='text'
                        name='time'
                        id='time'
                        value={hours}
                        placeholder='hh h mm'
                        onChange={handleHours}
                        maxLength={5}
                        required
                      />
                    </label>
                  </section>
                </section>

                <button type='submit'>Publier la recette</button>
              </form>
            </section>
          </section>
        )}
      </div>
    </header>
  );
}

export default Header;
