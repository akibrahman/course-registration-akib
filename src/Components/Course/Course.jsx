import propTypes from "prop-types";
import { FiDollarSign } from "react-icons/fi";
import { HiOutlineBookOpen } from "react-icons/hi";

const Course = ({ course, enroll }) => {
  const { id, image, title, description, price, credit_hour } = course;
  return (
    <div className=" bg-white p-4 rounded-xl">
      <img className=" w-full" src={image} alt="" />
      <p className="text-[#1c1b1b] text-[17px] font-semibold py-3">{title}</p>
      <p className="text-[#A3A3A3] text-sm leading-5  ">{description}</p>
      <div className="flex items-center justify-between py-4">
        <FiDollarSign className=" text-xl" />
        <p className="text-[#A3A3A3] text-base font-medium">Price: {price}</p>
        <HiOutlineBookOpen className="  text-xl" />
        <p className="text-[#A3A3A3] text-base font-medium">
          Credit: {credit_hour}hr
        </p>
      </div>
      <button
        onClick={() => {
          enroll(id);
        }}
        className=" capitalize text-white text-lg font-semibold bg-[#2F80ED] rounded-lg w-full py-1"
      >
        Select
      </button>
    </div>
  );
};

Course.propTypes = {
  course: propTypes.object.isRequired,
  enroll: propTypes.func.isRequired,
};
export default Course;
