import "../../styles/student-component-styles/refunds.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function Refunds() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access refunds specifically
  const refunds = studentData.refunds || {};

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || refunds.isLoading) {
    return <div>Loading refund details...</div>;
  }

  if (isError || refunds.isError || refunds.data === null) {
    return (
      <div>
        Student not found or error loading refund details:{" "}
        {refunds.error?.message || "Unknown error"}
      </div>
    );
  }

  if (refunds.isEmpty || !refunds.data) {
    return <div>No refund data available</div>;
  }

  // Transform API response into an array of refund items
  const refundItems = [
    { item: "Akash Books", amount: refunds.data.akash_books },
    { item: "Bus Pass", amount: refunds.data.bus_pss },
    { item: "Caution Deposit", amount: refunds.data.caution_deposit },
    { item: "Material", amount: refunds.data.material },
  ].filter((refund) => refund.amount !== undefined && refund.amount !== null); // Filter out undefined/null amounts

  // Debug log to verify data
  console.log('Refund Data:', { studentId, rawData: refunds.data, refundItems });

  return (
    <>
      <div className="refund-container">
        {refundItems.length > 0 ? (
          refundItems.map((refund, index) => (
            <div className="refund-item" key={index}>
              <span>{refund.item}</span>
              <span>{refund.amount?.toLocaleString() ?? 'N/A'}</span>
            </div>
          ))
        ) : (
          <div>No refund data available</div>
        )}
      </div>
    </>
  );
}

export default Refunds;