import { useState } from "react";
import About from "../../about/About";
import MainContent from "../../mainContent/MainContent";
import ContactMe from "../../contactMe/ContactMe";

function HomePage() {
  /* State to track visibility of a section (used for scroll or animation triggers) */
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  return (
    <>
      <About isSectionVisible={isSectionVisible} />

      <MainContent setIsSectionVisible={setIsSectionVisible} />

      <div
        id="contact-section"
        className="bg-secondary flex items-center justify-center"
      >
        <ContactMe />
      </div>
    </>
  );
}

export default HomePage;
