import { useContext, useEffect, useState } from "react";
import { auth, fireStore } from "../utils/firebase";
import { UserContext } from "../utils/user_context";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { LangContext } from "../utils/lang_context";
import { StringManager } from "../utils/stringmanager";

export default function ToDoList() {

  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const { uID, setid } = useContext(UserContext);
  const { lang } = useContext(LangContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setid(user.uid);
        fetchTodos(user.uid);
      } else {
        navigate("/login");
      }
    });

  }, [navigate, setid]);

  const fetchTodos = async (uID) => {
    try {
      const userRef = doc(fireStore, "user", uID);
      const todosRef = collection(userRef, 'todos');
      const todosSnapshot = await getDocs(todosRef);
      const todosArray = todosSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setToDos(todosArray);

    } catch (e) {
      console.log(e);
    }

  };

  const addTodo = async () => {
    if (toDo.trim() === "") return;

    const newTodo = {
      content: toDo.trim(),
      isdeleted: false,
      isdone: false,
    };

    try {
      const userRef = doc(fireStore, "user", uID);
      const todosRef = collection(userRef, 'todos');
      await addDoc(todosRef, newTodo);
      setToDos([...toDos, newTodo]);
      setToDo("");
    } catch (e) {
      console.log(e);
    }

  };

  const completeTodo = async (id) => {
    try {
      const userRef = doc(fireStore, "user", uID);
      const todosRef = collection(userRef, 'todos');
      await updateDoc(doc(todosRef, id), { isdone: true });
      setToDos(
        toDos.map((todo) =>
          todo.id === id ? { ...todo, isdone: !todo.isdone } : todo
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteTodo = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmDelete) return;

    try {
      const userRef = doc(fireStore, "user", uID);
      const todosRef = collection(userRef, 'todos');
      await updateDoc(doc(todosRef, id), { isdeleted: true });
      setToDos(toDos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.log(e);
    }
  };
  const logout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      console.log(error);
    });
  };



  return (
    <div dir={lang == "en" ? "ltr" : "rtl"} className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {lang == 'en' ? StringManager.todoList.en : StringManager.todoList.ar}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex">
          <input
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
            className="ps-3 rounded-md border-0 py-1.5 text-gray-900 shadow-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder={lang == 'en' ? StringManager.addnewtask.en : StringManager.addnewtask.ar}

          />
          <button
            onClick={addTodo}
            className="ms-3 rounded-md bg-indigo-600 px-2.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {lang == 'en' ? StringManager.addtodo.en : StringManager.addtodo.ar}

          </button>
        </div>
      </div>

      <div>
        <ul>
          {toDos.filter(todo => !todo.isdeleted).map((todo) => (
            <li key={todo.content} className="flex items-center justify-between">
              <span onClick={() => completeTodo(todo.id)} className={`material-symbols-outlined cursor-pointer ${todo.isdone ? "text-green-500" : ""}`}>
                check_circle
              </span>
              <span className={todo.isdone ? "line-through" : ""}>{todo.content}</span>
              <span onClick={() => deleteTodo(todo.id)} className="material-symbols-outlined cursor-pointer text-red-500">delete</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={logout}
          className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
        >
          {lang == 'en' ? StringManager.logout.en : StringManager.logout.ar}

        </button>
      </div>
    </div>
  );
}
