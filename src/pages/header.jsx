import { NavLink } from "react-router-dom";
import { LangContext } from "../utils/lang_context";
import { useContext } from "react";
import { StringManager } from "../utils/stringmanager";

function Header() {
  const { lang, setLang } = useContext(LangContext);

  const changeLanguage = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  return (
    <header
      dir={lang === "en" ? "ltr" : "rtl"}
      className="bg-gray-800 text-white shadow-md"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Navigation Links */}
        <nav className="flex space-x-4 rtl:space-x-reverse">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-400 ${isActive ? "text-blue-400" : "text-white"
              }`
            }
          >
            {lang === "en" ? StringManager.login.en : StringManager.login.ar}
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-400 ${isActive ? "text-blue-400" : "text-white"
              }`
            }
          >
            {lang === "en" ? StringManager.todos.en : StringManager.todos.ar}
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-400 ${isActive ? "text-blue-400" : "text-white"
              }`
            }
          >
            {lang === "en" ? StringManager.movies.en : StringManager.movies.ar}
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              `text-sm font-medium hover:text-gray-400 ${isActive ? "text-blue-400" : "text-white"
              }`
            }
          >
            {lang === "en" ? StringManager.singup.en : StringManager.singup.ar}
          </NavLink>
        </nav>

        {/* Language Toggle Button */}
        <button
          onClick={changeLanguage}
          className="px-4 py-2 bg-blue-500 text-sm font-medium text-white rounded hover:bg-blue-600 transition"
        >
          {lang === "en"
            ? StringManager.changelang.en
            : StringManager.changelang.ar}
        </button>
      </div>
    </header>
  );
}

export default Header;
