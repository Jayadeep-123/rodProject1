import {
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
 
const TermPaymentChart = ({ term = "Term 1", amount = 46000, status = "Unpaid", percentage = 20 }) => {
  return (
    <div style={{
      width: 150,
      height: 150,
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop:"7vh"
    }}>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={12}
        styles={buildStyles({
          trailColor: "#ffdada",
          pathColor: "#5d0e0e",  // dark red
          strokeLinecap: "round",
        })}
      >
        {/* Circle center content */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12 }}>{term}</div>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>
            {amount.toLocaleString()}
          </div>
          <div
            style={{
              backgroundColor: "#ffcccc",
              color: "#7a0000",
              padding: "2px 8px",
              borderRadius: "8px",
              fontSize: 12,
              marginTop: 5,
              display: "inline-block"
            }}
          >
            {status}
          </div>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
 
export default TermPaymentChart;
 