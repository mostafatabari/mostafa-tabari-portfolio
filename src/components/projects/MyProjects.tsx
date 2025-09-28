import Projects from "../projects/Projects";
import PlantVsZombies from "../../assets/images/PlantVsZombies.jpg";

function MyProjects() {
  return (
    <>
      <Projects
        reverse={false}
        title="Plants & Zombies V2"
        overview="This is the second edition of the classic Plants & Zombies game, rebuilt with slick graphics, smooth gameplay, and interactive animations. It’s fun, challenging, and merges design, logic, and UX seamlessly."
        tech="HTML, JavaScript, CSS"
        imageSrc={PlantVsZombies}
        imageAlt="Plant Vs Zombies"
        role="Lead developer—designed every part of the game, built the mechanics and animations, and optimized it to run perfectly in the browser."
        achievements="Created a fully playable, engaging game that runs smoothly across devices. For me, it was an awesome experience combining creativity with logic and bringing a digital world to life."
      />
    </>
  );
}

export default MyProjects;
