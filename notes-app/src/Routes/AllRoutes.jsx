import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import AddNote from "../pages/AddNote";
import NoteDetails from "../pages/NoteDetails";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/singlenote/:id" element={<NoteDetails />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
