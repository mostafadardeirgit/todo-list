import { RouterProvider } from "react-router-dom";
import { router } from "./utils/routes";
import { useState } from "react";
import { UserContextProvider } from "./utils/user_context";
import { LangContextProvider } from "./utils/lang_context";
import { Provider } from "react-redux";
import { store } from "./utils/store";

export function App() {

  const [uID, setid] = useState("");
  const [lang, setLang] = useState("en");

  return (
    <>
      <UserContextProvider value={{ uID, setid }}>
        <LangContextProvider value={{ lang, setLang }}>
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </LangContextProvider>
      </UserContextProvider>
    </>
  );
}