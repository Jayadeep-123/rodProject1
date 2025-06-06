import "../../styles/student-component-styles/other-fee-hands.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function OtherFeeHeads() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access otherFeeHeads specifically
  const otherFeeHeads = studentData.otherFeeHeads || {};

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || otherFeeHeads.isLoading) {
    return <div>Loading fee head details...</div>;
  }

  if (isError || otherFeeHeads.isError || otherFeeHeads.data === null) {
    return (
      <div>
        Student not found or error loading fee head details:{" "}
        {otherFeeHeads.error?.message || "Unknown error"}
      </div>
    );
  }

  if (otherFeeHeads.isEmpty || !otherFeeHeads.data) {
    return <div>No fee head data available</div>;
  }

  // Transform API response into an array of fee head items (adjust based on actual response structure)
  const feeHeadItems = Object.entries(otherFeeHeads.data)
    .filter(([key, value]) => key !== 'studentId' && value !== null && value !== undefined)
    .map(([key, value]) => ({
      item: key
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()), // Convert snake_case to Title Case
      amount: value,
    }));

  // Debug log to verify data
  console.log('Other Fee Heads Data:', { studentId, rawData: otherFeeHeads.data, feeHeadItems });

  return (
    <div className="fee-head-container">
      <div className="fee-head-column">
        {feeHeadItems.length > 0 ? (
          feeHeadItems.map((feeHead, index) => (
            <div className="fee-head-row" key={index}>
              <span>{feeHead.item}</span>
              <span>{feeHead.amount?.toLocaleString() ?? 'N/A'}</span>
            </div>
          ))
        ) : (
          <div>No fee head data available</div>
        )}
      </div>
    </div>
  );
}

export default OtherFeeHeads;