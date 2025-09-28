import AboutMe from "../../journey/AboutMe";

function AboutPage() {
  return (
    <div className="mt-14 md:mt-16 lg:mt-20 bg-secondary flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-12 flex flex-col justify-center items-center lg:w-full lg:max-w-7xl">
        <h3
          id="about-section"
          className="mb-12 text-black text-h1 font-semibold"
        >
          About Me
        </h3>

        <AboutMe />
      </div>
    </div>
  );
}

export default AboutPage;
