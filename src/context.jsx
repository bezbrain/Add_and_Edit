import React, { useState, useReducer, useRef } from "react";
import { useContext } from "react";
import axios from "axios";

export const ACTIONS = {
  ADD_PEOPLE: "add-people",
  ACCESS_ID: "access-id",
};

const allData = {
  id: "",
  initial: [],
};

const reducer = (currState, action) => {
  if (action.type === ACTIONS.ADD_PEOPLE) {
    return { ...currState, initial: action.payload.people };
  } else if (action.type === ACTIONS.ACCESS_ID) {
    // console.log(action.payload.id);
    return { ...currState, id: action.payload.id };
  }
};

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [initState, dispatch] = useReducer(reducer, allData);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const btnContentRef = useRef(null);
  const [person, setPerson] = useState({
    name: "",
    job: "",
    email: "",
    company: "",
    url: "",
    about: "",
  });

  // Fetching Data
  const getData = async () => {
    try {
      setIsLoading(false);
      const { data } = await axios.get("http://localhost:3000/users");
      // console.log(data);
      setIsLoading(true);
      dispatch({ type: ACTIONS.ADD_PEOPLE, payload: { people: data } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        showModal,
        setShowModal,
        isLoading,
        setIsLoading,
        initState,
        dispatch,
        person,
        setPerson,
        getData,
        btnContentRef,
        allData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
