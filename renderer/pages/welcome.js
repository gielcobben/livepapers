// Packages
import "isomorphic-fetch";

// Components
import Layout from "../components/layout";
import Indicator from "../components/indicator";

// Vectors
import Logo from "../vectors/logo";

// const URL = `http://a1.phobos.apple.com/us/r1000/000/Features/atv/AutumnResources/videos/entries.json`;
const URL = `http://localhost:8000/static/data/videos.json`;

const Button = ({ value, direction, goToSlide }) => (
  <button
    onClick={() => {
      goToSlide(direction);
    }}
  >
    {value}
    <style jsx>{`
      button {
        background: none;
        border: none;
        font-size: 18px;
        font-weight: 500;
        color: var(--brand-color);
        outline: none;
      }
    `}</style>
  </button>
);

const First = ({ goToSlide }) => (
  <div>
    <Logo />
    <p>
      We highly recommend not using this app on a laptop, it’s really bad for
      you battery.
    </p>
    <Button value="Get Started" direction="next" goToSlide={goToSlide} />

    <style jsx>{`
      div {
        margin: 0 auto;
      }

      p {
        margin-top: 8px;
        max-width: 420px;
      }
    `}</style>
  </div>
);

const Second = ({ videos, selectedVideos, selectVideo, goToSlide }) => (
  <div>
    <p>Please select the video you want to have as live wallpaper.</p>
    <ul>
      {videos.map((video, index) => (
        <li
          key={index}
          className={selectedVideos.indexOf(index) !== -1 ? "active" : ""}
          onClick={selectVideo.bind(this, index)}
          style={{
            background: `url(${video.thumbnail})`,
            backgroundSize: "cover",
          }}
        />
      ))}
    </ul>

    <Button value="Download!" direction="next" goToSlide={goToSlide} />

    <style jsx>{`
      div {
        margin: 0 auto;
      }

      p {
        max-width: 420px;
      }

      ul {
        display: flex;
        list-style: none;
      }

      li {
        width: 195px;
        height: 110px;
        overflow: hidden;
        border-radius: 6px;
        margin: 16px;
        transition: box-shadow 0.1s ease-out;
      }

      li.active {
        box-shadow: inset 0 0 0 2px #ff6058, inset 0 0 0 3px #ffffff;
      }
    `}</style>
  </div>
);

const Third = () => (
  <div>
    <p>Downloading...</p>
    <style jsx>{``}</style>
  </div>
);

class Tray extends React.Component {
  static async getInitialProps() {
    const req = await fetch(URL);
    const videos = await req.json();
    return { videos };
  }

  constructor(props) {
    super(props);

    this.state = {
      videos: props.videos,
      selectedVideos: [],
      currentScreen: 1,
    };

    this.goToSlide = this.goToSlide.bind(this);
    this.selectVideo = this.selectVideo.bind(this);
  }

  goToSlide(direction) {
    let screen;
    const { currentScreen } = this.state;

    if (direction === "next") {
      screen = currentScreen + 1;
    }

    if (direction === "prev") {
      screen = currentScreen - 1;
    }

    this.setState({
      currentScreen: screen,
    });
  }

  selectVideo(value) {
    const { selectedVideos } = this.state;
    const index = selectedVideos.indexOf(value);
    let array = [...selectedVideos];

    if (index === -1) {
      array.push(value);
    } else {
      array.splice(index, 1);
    }

    this.setState({
      selectedVideos: array,
    });
  }

  render() {
    const { videos, selectedVideos, currentScreen } = this.state;

    return (
      <Layout>
        <section>
          {currentScreen === 1 && <First goToSlide={this.goToSlide} />}
          {currentScreen === 2 && (
            <Second
              videos={videos}
              selectedVideos={selectedVideos}
              selectVideo={this.selectVideo}
              goToSlide={this.goToSlide}
            />
          )}
          {currentScreen === 3 && <Third />}
          <Indicator total={3} current={currentScreen} />
        </section>

        <style jsx>{`
          section {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            padding: 32px;
            font-size: 24px;
            font-weight: 300;
            color: var(--grey-dark);
            text-align: center;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Tray;
