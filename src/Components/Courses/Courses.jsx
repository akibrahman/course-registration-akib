import { useEffect, useState } from "react";
import Course from "../Course/Course";
import EnrolledCourse from "../EnrolledCourse/EnrolledCourse";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Courses = () => {
  let remainingCredit = 20;
  let enrolledCredit = 0;
  let enrolledPrice = 0;
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const enroll = (id) => {
    const clickedCourse = courses.find((course) => course.id === id);
    const checkClickedCourse = enrolledCourses.find(
      (course) => course.id === clickedCourse.id
    );
    if (checkClickedCourse) {
      toast.info(`Already Enrolled - '${clickedCourse.title}'!`, {
        autoClose: 2000,
      });
      return;
    }
    enrolledCredit = 0;
    enrolledCourses.map((course) => (enrolledCredit += course.credit_hour));
    enrolledCredit += clickedCourse.credit_hour;
    if (enrolledCredit - clickedCourse.credit_hour === 20) {
      toast.error(`Your Credit Hour is Over!`, {
        autoClose: 2000,
      });
      return;
    } else if (enrolledCredit > 20) {
      let shortCredit = enrolledCredit - 20;
      toast.warn(
        `You need ${shortCredit} Credit Hour more to Enroll this Course!`,
        {
          autoClose: 2000,
        }
      );
      return;
    }
    let tempEnrolledCourses = [...enrolledCourses, clickedCourse];
    setEnrolledCourses(tempEnrolledCourses);
    toast.success(`'${clickedCourse.title}' Course Enrolled Successfully.`, {
      autoClose: 2000,
    });
  };

  enrolledCourses.map((course) => (enrolledPrice += course.price));
  enrolledCourses.map((course) => (enrolledCredit += course.credit_hour));
  remainingCredit -= enrolledCredit;

  return (
    <div className="flex flex-col  md:items-center lg:items-start lg:flex-row gap-6">
      <ToastContainer />
      {/* Courses  */}
      <div className=" w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Course  */}
        {courses.map((course) => (
          <Course key={course.id} course={course} enroll={enroll}></Course>
        ))}
      </div>
      {/* Cart  */}
      <div className=" w-full md:w-max  lg:w-1/4 bg-white rounded-xl p-6 h-max">
        <p className="py-4 text-[#2F80ED]  text-lg  font-bold border-b">
          Credit Hour Remaining {remainingCredit} hr
        </p>
        <p className="py-4 text-[#1c1b1b] font-bold text-xl">Course Name</p>
        <div className=" py-6 text-[#777676] border-b space-y-2">
          {enrolledCourses.map((course, index) => (
            <EnrolledCourse
              key={course.id}
              name={course.title}
              index={index}
            ></EnrolledCourse>
          ))}
        </div>
        <p className="text-[#5F5F5F] text-base font-medium py-4 border-b">
          Total Credit Hour : {enrolledCredit}
        </p>
        <p className="text-[#5F5F5F] text-base font-medium py-4 ">
          Total Price : {enrolledPrice} USD
        </p>
      </div>
    </div>
  );
};

export default Courses;
