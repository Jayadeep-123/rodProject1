import "../../styles/student-component-styles/fee-details.css";
import TermPaymentChart from "./unpaid-chart";
import { useStudentContext } from "../../customHooks/StudentContext";
import useStudentData from "../../customHooks/useStudentData";

function FeeDetails() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access feeDetails specifically
  const feeDetails = studentData.feeDetails || {};

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || feeDetails.isLoading) {
    return <div>Loading fee details...</div>;
  }

  if (isError || feeDetails.isError || feeDetails.data === null) {
    return (
      <div>
        Student not found or error loading fee details:{" "}
        {feeDetails.error?.message || "Unknown error"}
      </div>
    );
  }

  if (feeDetails.isEmpty) {
    return <div>No fee details available for this student.</div>;
  }

  return (
    <div>
      <div className="fee-details-container">
        <div className="fee-details">
          <div className="fee-row">
            <span>Course Fee</span>
            <span>{feeDetails.data?.courseFee?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Add’l Amount</span>
            <span>
              {feeDetails.data?.additionalAmount?.toLocaleString() ?? "N/A"}
            </span>
          </div>
          <div className="fee-row">
            <span>Concession</span>
            <span>{feeDetails.data?.concession?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Net Fee</span>
            <span>{feeDetails.data?.netFee?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Service Tax Paid</span>
            <span>
              {feeDetails.data?.serviceTaxPaid?.toLocaleString() ?? "N/A"}
            </span>
          </div>
        </div>

        <div className="fee-details">
          <div className="fee-row">
            <span>Fee Paid</span>
            <span>{feeDetails.data?.feePaid?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Fee Deduction</span>
            <span>
              {feeDetails.data?.feeDeduction?.toLocaleString() ?? "N/A"}
            </span>
          </div>
          <div className="fee-row">
            <span>Fee Refund</span>
            <span>{feeDetails.data?.feeRefund?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Over All Due</span>
            <span>{feeDetails.data?.overallDue?.toLocaleString() ?? "N/A"}</span>
          </div>
          <div className="fee-row">
            <span>Service Tax To Be Paid</span>
            <span>
              {feeDetails.data?.serviceTaxToBePaid?.toLocaleString() ?? "N/A"}
            </span>
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