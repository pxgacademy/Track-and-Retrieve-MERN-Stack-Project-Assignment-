import useContextValue from "../../hooks/useContextValue";
import Navbar from "./Navbar";

const Header = () => {
  const { isDark } = useContextValue();

  return (
    <header className={`${isDark && "dark"}`}>
      <section className="px-5 w-full bg-white dark:bg-darkThree text-darkTwo dark:text-lightTwo">
        <section className="max-w-7xl mx-auto">
          <Navbar />
        </section>
      </section>
    </header>
  );
};

export default Header;
