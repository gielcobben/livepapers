import variables from "../styles/variables";
import base from "../styles/base";

const Layout = ({ children }) => (
  <main>
    {children}

    <style jsx global>
      {variables}
    </style>

    <style jsx global>
      {base}
    </style>
  </main>
);

export default Layout;
