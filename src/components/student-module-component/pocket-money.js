import "../../styles/student-component-styles/pocket-money.css";
import srichai from "../../assets/srichai.png";
import srichai2 from "../../assets/srichai2.png";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function PocketMoney() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access pocketMoney with fallback
  const pocketMoney = studentData.pocketMoney || {};
  // Handle array response, extract first object if available
  const pocketMoneyData = Array.isArray(pocketMoney.data) && pocketMoney.data.length > 0 ? pocketMoney.data[0] : {};

  // Calculate balance
  const balance = pocketMoneyData.depositedAmount && pocketMoneyData.takenAmount
    ? pocketMoneyData.depositedAmount - pocketMoneyData.takenAmount
    : null;

  // Debug log
  console.log('Pocket Money Data Debug:', {
    studentId,
    endpoint: 'pocket-money',
    rawData: pocketMoney.data,
    processedData: pocketMoneyData,
    fullPocketMoney: pocketMoney,
    displayData: {
      pocketRefund: pocketMoneyData.pocketRefund,
      depositedAmount: pocketMoneyData.depositedAmount,
      takenAmount: pocketMoneyData.takenAmount,
      balance,
    },
    states: {
      isLoading: isLoading || pocketMoney.isLoading,
      isError: isError || pocketMoney.isError,
      hasData: !!pocketMoney.data && Array.isArray(pocketMoney.data) && pocketMoney.data.length > 0,
      status: pocketMoney.status,
      error: pocketMoney.error?.message,
    },
  });

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || pocketMoney.isLoading) {
    return <div>Loading pocket money details...</div>;
  }

  if (isError || pocketMoney.isError) {
    return (
      <div>
        Error loading pocket money details:{" "}
        {pocketMoney.error?.message || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="pocketmoney-container">
      <div className="pocketmoney-info-section">
        <div className="pocketmoney-info">
          <p>Pocket Refund</p>
          <span>{pocketMoneyData.pocketRefund?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="pocketmoney-info">
          <p>Deposited Amount</p>
          <span>{pocketMoneyData.depositedAmount?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="pocketmoney-info">
          <p>Taken Amount</p>
          <span>{pocketMoneyData.takenAmount?.toLocaleString() ?? 'N/A'}</span>
        </div>
      </div>

      <button className="pocketmoney-add-money">+ Add Money</button>

      <div className="pocketmoney-card">
        <div className="pocketmoney-card-content">
          <div>
            <p className="pocketmoney-admission">
              Admission No<br />
              <strong>{pocketMoneyData.admissionNo ?? 'N/A'}</strong>
            </p>
            <p className="pocketmoney-name">
              {pocketMoneyData.studentName ?? 'N/A'}<br />
              <span className="label">Student Name</span>
            </p>
          </div>
          <div className="pocketmoney-balance-container">
            <p className="pocketmoney-balance-label">Balance</p>
            <p className="pocketmoney-balance">{balance?.toLocaleString() ?? 'N/A'}</p>
          </div>
        </div>
        <div className="pocketmoney-card-footer">
          <img src={srichai} alt="student" className="pocketmoney-emoji" />
          <img src={srichai2} alt="student" className="pocketmoney-emoji" />
        </div>
      </div>
    </div>
  );
}

export default PocketMoney;