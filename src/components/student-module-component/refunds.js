import "../../styles/student-component-styles/refunds.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function Refunds() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'refunds');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading refund details...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading refund details: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <>
      <div className="refund-container">
        {studentData.data?.refunds?.map((refund, index) => (
          <div className="refund-item" key={index}>
            <span>{refund.item ?? 'N/A'}</span>
            <span>{refund.amount?.toLocaleString() ?? 'N/A'}</span>
          </div>
        )) ?? <div>No refund data available</div>}
      </div>
    </>
  );
}

export default Refunds;