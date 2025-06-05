import "../../styles/student-component-styles/other-fee-hands.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function OtherFeeHeads() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'other-fee-heads');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading fee head details...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading fee head details: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <div className="fee-head-container">
      <div className="fee-head-column">
        {studentData.data?.feeHeads?.map((feeHead, index) => (
          <div className="fee-head-row" key={index}>
            <span>{feeHead.item ?? 'N/A'}</span>
            <span>{feeHead.amount?.toLocaleString() ?? 'N/A'}</span>
          </div>
        )) ?? <div>No fee head data available</div>}
      </div>
    </div>
  );
}

export default OtherFeeHeads;