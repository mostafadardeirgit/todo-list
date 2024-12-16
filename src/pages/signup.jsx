import { createUserWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth } from "../utils/firebase";
import { UserContext } from "../utils/user_context";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../utils/lang_context";
import { StringManager } from "../utils/stringmanager";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { uID, setid } = useContext(UserContext);
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  function onRegister(e) {
    e.preventDefault();
    let userdata = createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setid(userdata.user.uid);
        navigate("/");
        console.log(uID);
      })
      .catch((error) => {
        alert(error.message)
      });
  }



  return (
    <form dir={lang == "en" ? "ltr" : "rtl"}>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {lang == 'en' ? StringManager.singup.en : StringManager.singup.ar}

          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              {lang == 'en' ? StringManager.email.en : StringManager.email.ar}
            </label>
            <div className="mt-2">
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                {lang == 'en' ? StringManager.pass.en : StringManager.pass.ar}
              </label>
            </div>
            <div className="mt-2">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              onClick={(e) => {
                onRegister(e);
              }}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {lang == 'en' ? StringManager.singup.en : StringManager.singup.ar}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
