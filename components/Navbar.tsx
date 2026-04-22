export default function Navbar() {
  return (
    <nav
      style={{
        padding: "20px",
        background: "#ff0000",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(255,0,0,0.5)",
      }}
    >
      {/* LINKS */}
      <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
        <span style={{ fontFamily: "Anton", fontSize: "30px" }}>
          UP N ATOM
        </span>

        <a href="/" style={linkStyle}>Home</a>
        <a href="/bewerben" style={linkStyle}>Bewerben</a>
        <a href="/statuscheck" style={linkStyle}>Status</a>
        <a href="/admin" style={linkStyle}>Admin</a>
      </div>

      {/* NOCH GRÖSSERES LOGO */}
      <img
        src="/atomlogo.png"
        alt="Up n Atom Logo"
        style={{
          width: "140px",
          height: "auto",
          cursor: "pointer",
          marginRight: "10px"
        }}
      />
    </nav>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "22px",
};
