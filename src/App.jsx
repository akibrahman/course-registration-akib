import Courses from "./Components/Courses/Courses";

function App() {
  return (
    <div className=" w-[95%] mx-auto">
      <h1 className="text-[#1c1b1b] text-3xl font-bold py-8 text-center">
        Course Registration
      </h1>
      {/* Courses & Cart  */}
      <Courses></Courses>
    </div>
  );
}

export default App;
