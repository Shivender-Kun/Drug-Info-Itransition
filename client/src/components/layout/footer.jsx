import React from "react";

const Footer = () => {
  const CURRENT_YEAR = new Date().getFullYear();

  return (
    <footer className="bg-accent p-4 text-center font-medium">
      Copyright &copy; {CURRENT_YEAR} -{" "}
      <a href="https://github.com/Shivender-Kun">Shivender-Kun</a>
    </footer>
  );
};

export default Footer;
