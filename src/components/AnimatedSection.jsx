import { Element } from "react-scroll";
import "../../styles/animationstyle.css";

const AnimatedSection = ({ id, children }) => {
  return (
    <>
      <Element name={id} className="animated-section">
        {children}
      </Element>
    </>
  );
};
export default AnimatedSection;
