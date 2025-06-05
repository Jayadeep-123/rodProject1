// FeeDetails.js
import "../../styles/student-component-styles/fee-details.css";
import TermPaymentChart from "./unpaid-chart";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData'; // Update import

function FeeDetails() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'fee-details');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading fee details...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading fee details: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <div>
      <div className="fee-details-container">
        <div className="fee-details">
          <div className="fee-row">
            <span>Course Fee</span>
            <span>{studentData.data?.courseFee?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Add’l Amount</span>
            <span>{studentData.data?.additionalAmount?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Concession</span>
            <span>{studentData.data?.concession?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Net Fee</span>
            <span>{studentData.data?.netFee?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Service Tax Paid</span>
            <span>{studentData.data?.serviceTaxPaid?.toLocaleString() ?? 'N/A'}</span>
          </div>
        </div>

        <div className="fee-details">
          <div className="fee-row">
            <span>Fee Paid</span>
            <span>{studentData.data?.feePaid?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Fee Deduction</span>
            <span>{studentData.data?.feeDeduction?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Fee Refund</span>
            <span>{studentData.data?.feeRefund?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Over All Due</span>
            <span>{studentData.data?.overallDue?.toLocaleString() ?? 'N/A'}</span>
          </div>
          <div className="fee-row">
            <span>Service Tax To Be Paid</span>
            <span>{studentData.data?.serviceTaxToBePaid?.toLocaleString() ?? 'N/A'}</span>
          </div>
        </div>
        <div className="payment-chart">
          <TermPaymentChart />
        </div>
      </div>

      <div className="payment-button-container">
        <button className="pay-button">+ Proceed to Payment</button>
      </div>
    </div>
  );
}

export default FeeDetails;