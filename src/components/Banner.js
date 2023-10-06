import LOGO from "../assets/logo.png";
import "../styles/banner.css";
function Banner() {
  return (
    <div className="banner">
      <img src={LOGO} className="logo" alt="logo" />
      <h1>La maison de jungle</h1>
    </div>
  );
}
export default Banner;
