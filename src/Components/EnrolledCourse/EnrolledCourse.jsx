import propTypes from "prop-types";

const EnrolledCourse = ({ name, index }) => {
  return <p>{`${index + 1}. ${name}`}</p>;
};

EnrolledCourse.propTypes = {
  name: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
};
export default EnrolledCourse;
