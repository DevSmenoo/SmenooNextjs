import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const MenuButton = ({ menu }) => {
  const router = useRouter();

  const startSessionAndRedirect = (menuId) => {
    // Salva l'ID del menu come cookie
    Cookies.set('menuId', menuId, { expires: 1 }); // Il cookie scade in 1 giorno
    // Reindirizza l'utente alla nuova pagina del menu
    router.push(`/menu/${menuId}`);
  };

  return (
    <div className="container courseBox text-center" onClick={() => startSessionAndRedirect(menu.id)}>
      <button className="courseRow">
        <p className="d-inline">{menu.nome}</p>
        <img className="frecciaCourse d-inline" src="/img/Freccia-attiva-preferiti.svg" alt="Arrow" />
      </button>
    </div>
  );
};

export default MenuButton;