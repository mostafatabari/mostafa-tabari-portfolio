import { Link } from "react-router-dom";
import Icon from "../iconsSvg/IconsSvg";

/* Footer component containing personal info, quick links, and contact details */
const Footer = () => {
  return (
    <div className="w-full border-t border-secondary bg-light text-black flex justify-center">
      <div className="w-full max-w-7xl px-4 flex flex-col justify-center">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="col-span-1 sm:col-span-2 md:col-span-1 lg:col-span-1 flex flex-col gap-5">
            <h3 className="text-accent text-body-sm font-bold">
              Mostafa Tabari
            </h3>

            <h4 className="-mt-2 text-body text-primary">
              Welcome to my personal website. I'm Mostafa Tabari, 35 years old,
              married, and a Front-End Developer specialized in React, Next.js,
              and TypeScript. I love turning ideas into interactive web
              experiences and blending creativity with tech.
            </h4>

            {/* Social media icons */}
            <div className="flex items-center gap-2">
              <Icon
                type="instagram"
                className="text-2xl text-secondary cursor-pointer hover:text-blue-500 hover:scale-110 duration-300"
              />

              <Icon
                type="linkedin"
                aria-label="LinkedIn"
                className="text-2xl text-secondary cursor-pointer hover:text-blue-500 hover:scale-110 duration-300"
              />

              <Icon
                type="github"
                className="text-2xl text-secondary cursor-pointer hover:text-blue-500 hover:scale-110 duration-300"
              />
            </div>
          </div>

          {/* Quick links navigation */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-start md:justify-end lg:justify-center">
            <div className="flex flex-col gap-2">
              <p className="text-black text-body-sm font-bold">Quick Links</p>

              <Link to={"/"}>
                <p className="text-body text-primary cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  Home
                </p>
              </Link>

              <Link to={"/projects"}>
                <p className="text-body text-primary cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  Projects
                </p>
              </Link>

              <Link to={"/contact"}>
                <p className="text-body text-primary cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  Contact
                </p>
              </Link>

              <Link to={"/about"}>
                <p className="text-body text-primary cursor-pointer hover:text-blue-500 transition-colors duration-300">
                  About
                </p>
              </Link>
            </div>
          </div>

          {/* Contact information section */}
          <div className="col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 flex justify-start sm:justify-end md:justify-start lg:justify-end">
            <div className="flex flex-col gap-2">
              <p className="text-black text-body-sm font-bold">Contact</p>
              <p className="text-body text-primary">Sari, Iran</p>

              <p className="text-body text-primary hover:text-blue-500 duration-300 cursor-pointer">
                <a href="mailto:Mostaafa.Tabari@gmail.com">
                  Mostaafa.Tabari@gmail.com
                </a>
              </p>

              <p className="text-body text-primary hover:text-blue-500 duration-300 cursor-pointer">
                <a href="tel:+989113558257">+98 911 355 8257</a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer copyright section */}
        <div className="pt-8 pb-16 mb-12 border-t border-secondary text-body-sm text-primary flex justify-center items-center">
          © 2025 Mostafa Tabari. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
