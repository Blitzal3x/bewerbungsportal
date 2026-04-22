export default function UButton({ children, onClick, style }: any) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 25px",
        background: "#ff0000",
        color: "white",
        border: "none",
        fontSize: "20px",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: "Anton",
        letterSpacing: "1px",
        textShadow: "0 0 5px rgba(0,0,0,0.8)",
        boxShadow: "0 0 15px rgba(255,0,0,0.5)",
        ...style
      }}
    >
      {children}
    </button>
  );
}
