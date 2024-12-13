import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Etre en haut de la page d'une recette
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });  }, [pathname]);
}

export default ScrollToTop;
