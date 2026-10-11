
import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from "react-router-dom";

function Home() {
  return <h2>Welcome to Home Page</h2>;
}

function About() {
  return <h2>About Us</h2>;
}

function Students() {
  return (
    <div>
      <h2>Students List</h2>
      <p><Link to="/students/1">Rahul</Link></p>
      <p><Link to="/students/2">Priya</Link></p>
      <Outlet />
    </div>
  );
}

function StudentDetails() {
  const { id } = useParams();
  const students = { 1: "Rahul", 2: "Priya" };

  return <h3>Name: {students[id] || "Unknown"}, ID: {id}</h3>;
}

function NotFound() {
  return <h2>404 - Page Not Found!</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/students">Students</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/students" element={<Students />}>
          <Route path=":id" element={<StudentDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
