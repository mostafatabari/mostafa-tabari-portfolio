import { createBrowserRouter, Outlet } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import NotFound from "../../notFound/NotFound";
import Navbar from "../../navbar/Navbar";
import HomePage from "../home/HomePage";
import AboutPage from "../about/AboutPage";
import ProjectsPage from "../projects/ProjectsPage";
import ContactPage from "../contact/ContactPage";
import Footer from "../../footer/Footer";
import SocialSidebar from "../../socialSidebar/SocialSidebar";

/* Register GSAP plugin for smooth scrolling effects */
gsap.registerPlugin(ScrollSmoother);

const MainLayout = () => {
  useEffect(() => {
    /* Initialize GSAP ScrollSmoother for smooth scrolling on the page */
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1, // Smoothness factor (1 = default)
      effects: true, // Enable scroll-based effects
    });

    /* Cleanup: kill smoother instance when component unmounts */
    return () => {
      if (smoother) smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <Navbar />

      <div id="smooth-content">
        <main>
          <Outlet />
        </main>

        <Footer />
      </div>

      <SocialSidebar />
    </div>
  );
};

/* Define routes for the application using React Router */
const Routers = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default Routers;
