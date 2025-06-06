import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

const TermPaymentChart = ({ term = "Term 1" }) => {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access feeDetails data with fallback
  const feeDetails = studentData.feeDetails || {};
  const feeData = feeDetails.data || {};

  // Extract relevant fields
  const feePaid = parseFloat(feeData.feePaid) || 0;
  const overAlldue = parseFloat(feeData.overAlldue) || 0;
  const totalAmount = feePaid + overAlldue;
  const percentage = totalAmount > 0 ? (feePaid / totalAmount) * 100 : 0;
  const status = overAlldue > 0 ? "Unpaid" : "Paid";

  // Debug log
  console.log('Term Payment Chart Data Debug:', {
    studentId,
    endpoint: 'fee-details',
    rawData: feeData,
    calculated: {
      feePaid,
      overAlldue,
      totalAmount,
      percentage: percentage.toFixed(2),
      status,
    },
  });

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || feeDetails.isLoading) {
    return <div>Loading payment details...</div>;
  }

  if (isError || feeDetails.isError || !feeData) {
    return (
      <div>
        Error loading payment details: {feeDetails.error?.message || 'Unknown error'}
      </div>
    );
  }

  return (
    <div
      style={{
        width: 150,
        height: 150,
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "7vh",
      }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={12}
        styles={buildStyles({
          trailColor: "#ffdada",
          pathColor: "#5d0e0e", // dark red
          strokeLinecap: "round",
        })}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 12 }}>{term}</div>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>
            {overAlldue.toLocaleString()}
          </div>
          <div
            style={{
              backgroundColor: "#ffcccc",
              color: "#7a0000",
              padding: "2px 8px",
              borderRadius: "8px",
              fontSize: 12,
              marginTop: 5,
              display: "inline-block",
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