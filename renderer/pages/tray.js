// Packages
import os from "os";

// Components
import Layout from "../components/layout";
import TopArrow from "../components/top-arrow";

class Tray extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.isWindows = os.platform() === "win32";
  }
  render() {
    return (
      <Layout>
        {!this.isWindows && <TopArrow />}

        <div />

        <style jsx>{`
          div {
            background: #fff;
            width: 100vw;
            height: 100vh;
            border-radius: 6px;
            overflow: hidden;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Tray;
