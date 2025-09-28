import Journey from "../journey/Journey";
import Hometown from "../../assets/images/Hometown.jpg";
import School from "../../assets/images/School.jpg";
import Life from "../../assets/images/Life.jpg";
import Transformation from "../../assets/images/Transformation.jpg";

/* AboutMe component renders a chronological timeline using Journey entries */
function AboutMe() {
  return (
    <>
      <Journey
        reverse={false} /* Layout normal, image on right */
        title="Where it All Began"
        year="1989"
        subtitle="Curious Kid in Sari"
        description="I was born in 1989 in Sari, Iran, a place full of stunning nature and rich culture that always inspired me. As a kid, I was endlessly curious, always poking around, trying to understand how things worked. Learning new stuff? That was my jam."
        imageSrc={Hometown}
        imageAlt="Childhood in Sari surrounded by nature and culture"
      />

      <Journey
        reverse={true} /* Layout reversed, image on left */
        title="School & Early Career"
        year="2013–2023"
        subtitle="From Civil Engineering to Project Management"
        description="Fast forward to 2013, I finished my Master’s in Civil Engineering. I dove into the construction world headfirst—over 10 years working in project offices, managing teams, and coordinating complex projects. Every challenge pushed me to level up both technically and as a leader."
        imageSrc={School}
        imageAlt="School and early career in engineering and project management"
      />

      <Journey
        reverse={false} /* Layout normal, image on right */
        title="Life"
        year="2017"
        subtitle="Marriage, Parenthood"
        description="In 2017, I got married to my amazing partner, who’s been my rock ever since. Then in 2024, our little bundle of joy arrived—a moment that completely reshaped my perspective on life, work, and motivation."
        imageSrc={Life}
        imageAlt="Marriage and parenthood milestones"
      />

      <Journey
        reverse={true} /* Layout reversed, image on left */
        title="Career Transformation"
        year="2024-2025"
        subtitle="Web Development"
        description="Also in 2024, I decided to switch gears and jump into web development. Learning React, Next.js, Node.js, and TypeScript wasn’t easy, but diving into modern tech and new concepts transformed my career. Today, I’m proud of my skills, my problem-solving chops, and my creative approach. I’m all about building fast, interactive, and beautiful user interfaces, with a strong love for game-inspired projects and engaging UX/UI design."
        imageSrc={Transformation}
        imageAlt="Transition to web development and modern tech"
      />
    </>
  );
}

export default AboutMe;
