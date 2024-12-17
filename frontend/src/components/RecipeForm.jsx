import { useState, useEffect } from "react";
import Xmark from "../assets/xmark-solid.svg";
import FetchData from "../components/Fetch";

function RecipeForm({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "",
    type: "",
    ingredients: [""],
    steps: [""],
    time: "",
  });
  const [preview, setPreview] = useState("");

  // Import des categories et des types
  const getCategories = () =>
    FetchData("http://localhost:3000/filters/categories", setCategories);
  const getTypes = () =>
    FetchData("http://localhost:3000/filters/types", setTypes);

  useEffect(() => {
    getCategories();
    getTypes();
  }, []);
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
  const handleTime = (e) => {
    const value = e.target.value;
    const regex = /^[0-9h ]*$/;
    if (value.match(regex)) {
      setTime(value);
    }
  };

  // Gestion des inputs catégories et types
  const handleListChange = (e, index, listName) =>
    setFormData({
      ...formData,
      [listName]: formData[listName].map((value, i) =>
        i === index ? e.target.value : value
      ),
    });

  // Ajout des inputs catégories et types
  const handleAddItem = (listName) =>
    setFormData({
      ...formData,
      [listName]: [...formData[listName], ""],
    });

  // Suppression des inputs catégories et types
  const handleRemoveItem = (index, listName) =>
    setFormData({
      ...formData,
      [listName]: formData[listName].filter((_, i) => i !== index),
    });

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
    formDataToSend.append("steps", JSON.stringify(formData.steps));
    formDataToSend.append("ingredients", JSON.stringify(formData.ingredients));
    formDataToSend.append("time", time);

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
        isOpen(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error("Erreur serveur :", errorData);
        alert("Une erreur s'est produite lors de l'envoi de la recette.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };
  return (
    <>
      {isOpen && (
        <section className='modal'>
          <section className='modal--form'>
            <img
              loading='lazy'
              src={Xmark}
              alt='Icone Croix'
              className='modal--form--close'
              onClick={() => onClose(false)}
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
                      placeholder='Courte description de la recette'
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
                  <label className='ingredients'>
                    Ingrédients
                    {formData.ingredients &&
                      formData.ingredients.map((ingredient, index) => (
                        <div key={index}>
                          <input
                            type='text'
                            value={ingredient}
                            onChange={(e) =>
                              handleListChange(e, index, "ingredients")
                            }
                            placeholder={`Ingrédient ${index + 1}`}
                            required
                          />
                          <button
                            type='button'
                            className='btn-remove'
                            onClick={() =>
                              handleRemoveItem(index, "ingredients")
                            }>
                            <img
                              src={Xmark}
                              className='btn-remove-icon'
                              alt='Icone Croix'
                            />
                          </button>
                        </div>
                      ))}
                    <button
                      type='button'
                      className='btn-add'
                      onClick={() => handleAddItem("ingredients")}>
                      Ajouter une étape
                    </button>
                  </label>

                  {/* Liste des etapes */}
                  <label className='steps'>
                    Etapes
                    {formData.steps &&
                      formData.steps.map((step, index) => (
                        <div key={index}>
                          <textarea
                            value={step}
                            onChange={(e) =>
                              handleListChange(e, index, "steps")
                            }
                            placeholder={`Étape ${index + 1}`}
                            required
                          />
                          <button
                            type='button'
                            className='btn-remove'
                            onClick={() => handleRemoveItem(index, "steps")}>
                            <img
                              src={Xmark}
                              className='btn-remove-icon'
                              alt='Icone Croix'
                            />
                          </button>
                        </div>
                      ))}
                    <button
                      type='button'
                      className='btn-add'
                      onClick={() => handleAddItem("steps")}>
                      Ajouter une étape
                    </button>
                  </label>

                  {/* Temps */}
                  <label>
                    Temps
                    <input
                      type='text'
                      name='time'
                      id='time'
                      value={time}
                      placeholder='hh h mm'
                      onChange={handleTime}
                      maxLength={5}
                      required
                    />
                  </label>
                </section>
              </section>

              <button className='btn-publish' type='submit'>
                Publier la recette
              </button>
            </form>
          </section>
        </section>
      )}
    </>
  );
}

export default RecipeForm;
