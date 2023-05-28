import { FaUser, FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import "../../styles/interface.css";
import { useGlobalContext } from "../context";
import { useEffect } from "react";
import Loading from "./Loading";
import { ACTIONS } from "../context";

const Interface = () => {
  const {
    setShowModal,
    isLoading,
    initState,
    getData,
    btnContentRef,
    setPerson,
    dispatch,
  } = useGlobalContext();

  // Delete person
  const deletePerson = async (id) => {
    try {
      const { data } = await axios.delete(`http://localhost:3000/users/${id}`);
    } catch (error) {
      console.log(error);
    }
    await getData();
  };

  const getSinglePerson = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:3000/users/${id}`);
      setPerson(data);
      dispatch({ type: ACTIONS.ACCESS_ID, payload: { id: id } }); //Get each id
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setShowModal(true);
    btnContentRef.current.textContent = "Update";
    await getSinglePerson(id);
    // console.log(initState.id);
  };

  // Call the person data function
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <main>
        <header>
          <h2>Random Users</h2>
          <div className="user-count-con">
            <FaUser className="user-icon" />
            <div className="count">{initState.initial.length}</div>
          </div>
        </header>
        {isLoading ? (
          <section className="body-sect">
            {/* Each card section */}
            {initState.initial.map((each, i) => {
              const { id, name, job, company, url, email, about, favColor } =
                each;
              return (
                <article className="each-con" key={i}>
                  <section className="top-sect">
                    {url === "" ? (
                      <div
                        className="image"
                        style={{ backgroundColor: favColor || "red" }}
                      >
                        {name.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <img src={url} alt="person" />
                    )}
                    <div className="name-con">
                      <h3>{name}</h3>
                      <p>
                        <span>{job}</span> at {company}
                      </p>
                    </div>
                  </section>
                  <summary>
                    <p>{email}</p>
                    <p>{about}</p>
                  </summary>
                  <div className="edit-del-con">
                    <FaEdit
                      className="icon"
                      title="Edit"
                      onClick={() => handleEdit(id)}
                    />
                    <FaTrash
                      className="icon"
                      title="Delete"
                      onClick={() => deletePerson(id)}
                    />
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <Loading />
        )}
        <FaUserPlus
          className="add-person"
          title="Add Person"
          onClick={() => {
            setShowModal(true);
            btnContentRef.current.textContent = "Add";
          }}
        />
      </main>
    </>
  );
};

export default Interface;
