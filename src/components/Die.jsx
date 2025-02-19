export default function Die(props) {
  const styleObj = { background: "#59E391" };

  return (
    <button
      className="die-item"
      style={props.isHeld ? styleObj : undefined}
      onClick={() => props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
