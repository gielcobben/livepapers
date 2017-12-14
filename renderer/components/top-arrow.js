// Packages
import electron from "electron";

// Vectors
import Caret from "../vectors/caret";

class TopArrow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      left: 0,
    };

    this.remote = electron.remote || false;
  }

  preventDefault(event) {
    event.preventDefault();
  }

  componentDidMount() {
    // Calculate top arrow position once in the beginning
    this.tryPosition();

    // And then every 500 milliseconds
    setInterval(() => {
      this.tryPosition();
    }, 500);
  }

  tryPosition() {
    if (!this.remote) {
      return;
    }

    if (!this.remote.process || !this.remote.getCurrentWindow) {
      return;
    }

    const currentWindow = this.remote.getCurrentWindow();
    const tray = this.remote.getGlobal("tray");

    if (!currentWindow || !tray) {
      return;
    }

    // Center the caret unter the tray icon
    const windowBounds = currentWindow.getBounds();
    this.position(tray, windowBounds);
  }

  position(tray, windowBounds) {
    const trayBounds = tray.getBounds();

    const trayCenter = trayBounds.x + trayBounds.width / 2;
    const windowLeft = windowBounds.x;

    const caretLeft = trayCenter - windowLeft - 28 / 2;

    this.setState({
      left: caretLeft,
    });
  }

  render() {
    const style = {};

    if (this.state.left) {
      style.paddingLeft = this.state.left;
    }

    return (
      <span
        style={style}
        onDragOver={this.preventDefault}
        onDrop={this.preventDefault}
      >
        <Caret />

        <style jsx>{`
          span {
            height: 12px;
            flex-shrink: 0;
            display: block;
          }
          span:not([style]) {
            display: flex;
            justify-content: center;
          }
        `}</style>
      </span>
    );
  }
}

export default TopArrow;
