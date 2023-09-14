import { useEffect, useState } from "react";
import Course from "../Course/Course";
import EnrolledCourse from "../EnrolledCourse/EnrolledCourse";

const Courses = () => {
  let remainingCredit = 20;
  let enrolledCredit = 0;
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
      alert(`Already Enrolled - '${clickedCourse.title}'`);
      return;
    }

    let tempEnrolledCourses = [...enrolledCourses, clickedCourse];
    setEnrolledCourses(tempEnrolledCourses);
  };

  enrolledCourses.map((course) => (enrolledCredit += course.credit_hour));
  remainingCredit -= enrolledCredit;

  return (
    <div className="flex gap-6">
      {/* Courses  */}
      <div className=" w-3/4 grid grid-cols-3 gap-6">
        {/* Course  */}
        {courses.map((course) => (
          <Course key={course.id} course={course} enroll={enroll}></Course>
        ))}
      </div>
      {/* Cart  */}
      <div className=" w-1/4 bg-white rounded-xl p-6 h-max">
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
          Total Price : 0 USD
        </p>
      </div>
    </div>
  );
};

export default Courses;
