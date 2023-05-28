import { FaTimes } from "react-icons/fa";
import "../../styles/addPerson.css";
import axios from "axios";
import { useGlobalContext } from "../context";
import { useRef } from "react";

const AddPerson = () => {
  const {
    showModal,
    setShowModal,
    person,
    setPerson,
    getData,
    btnContentRef,
    initState,
  } = useGlobalContext();
  const { name, job, email, company, url, about } = person;

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPerson({ ...person, [name]: value });
  };

  // Add New Person and Edit Person
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !job || !email || !company || !about) {
      console.log("I can't be empty");
    } else {
      // Add Person
      if (btnContentRef.current.textContent === "Add") {
        // console.log("Add");
        try {
          const { data } = await axios.post("http://localhost:3000/users", {
            id: Date.now(),
            ...person,
          });
        } catch (error) {
          console.log(error);
        }
        await getData();
        setPerson({
          name: "",
          job: "",
          email: "",
          company: "",
          url: "",
          about: "",
        });
        setShowModal(false);
        // Edit Person
      } else {
        // console.log("Update");
        try {
          const { data } = await axios.put(
            `http://localhost:3000/users/${initState.id}`,
            {
              id: Date.now(),
              ...person,
            }
          );
        } catch (error) {
          console.log(error);
        }
        await getData();
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <section className={`overlay-sect ${showModal ? "add-show-form" : ""}`}>
        <section>
          <FaTimes
            className="close-icon"
            onClick={() => {
              setShowModal(false);
              setPerson({
                name: "",
                job: "",
                email: "",
                company: "",
                url: "",
                about: "",
              });
            }}
          />
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="job"
              placeholder="Job"
              value={job}
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
            />
            <br />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={company}
              onChange={handleChange}
            />
            <br />
            <input type="file" name="url" onChange={handleChange} />
            <br />
            <textarea
              name="about"
              rows="7"
              cols="30"
              placeholder="about you..."
              value={about}
              onChange={handleChange}
            />
            <br />
            <button className="add-btn" ref={btnContentRef}>
              Add
            </button>
          </form>
        </section>
      </section>
    </>
  );
};

export default AddPerson;
