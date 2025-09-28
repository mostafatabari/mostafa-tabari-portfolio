import MyProjects from "../../projects/MyProjects";

function ProjectsPage() {
  return (
    <div className="mt-14 md:mt-16 lg:mt-20 bg-secondary flex items-center justify-center">
      <div className="w-full max-w-2xl px-4 py-12 flex flex-col justify-center items-center lg:w-full lg:max-w-7xl">
        <h3 className="mb-12 text-black text-h1 font-semibold">My Projects</h3>

        <MyProjects />
      </div>
    </div>
  );
}

export default ProjectsPage;
