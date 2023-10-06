import LOGO from "../assets/logo.png";
function Footer() {
  return (
    <div style={{ padding: "15px", margin: "auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          padding: "15px",
        }}
      >
        <img src={LOGO} alt="logo" style={{ width: "25px", height: "25px" }} />
        <h3>pour les passionnés de plante</h3>
      </div>
      <p>Laisser nous votre email : </p>
      <input type="email" placeholder="bboubacar366@gmail.com" />
      <input type="submit" />
      <br />
      @made by Bouba
    </div>
  );
}
export default Footer;
