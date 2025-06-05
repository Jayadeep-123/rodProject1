// PocketMoney.js
import "../../styles/student-component-styles/pocket-money.css";
import srichai from "../../assets/srichai.png";
import srichai2 from "../../assets/srichai2.png";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function PocketMoney() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'pocket-money');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading pocket money details...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading pocket money details: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <div className="pocketmoney-container">
      <div className="pocketmoney-info-section">
        <div className="pocketmoney-info">
          <p>Pocket Refund</p>
          <span>{studentData.data?.pocketRefund?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="pocketmoney-info">
          <p>Deposited Amount</p>
          <span>{studentData.data?.depositedAmount?.toLocaleString() ?? 'N/A'}</span>
        </div>
        <div className="pocketmoney-info">
          <p>Taken Amount</p>
          <span>{studentData.data?.takenAmount?.toLocaleString() ?? 'N/A'}</span>
        </div>
      </div>

      <button className="pocketmoney-add-money">+ Add Money</button>

      <div className="pocketmoney-card">
        <div className="pocketmoney-card-content">
          <div>
            <p className="pocketmoney-admission">
              Admission No<br />
              <strong>{studentData.data?.admissionNo ?? 'N/A'}</strong>
            </p>
            <p className="pocketmoney-name">
              {studentData.data?.studentName ?? 'N/A'}<br />
              <span className="label">Student Name</span>
            </p>
          </div>
          <div className="pocketmoney-balance-container">
            <p className="pocketmoney-balance-label">Balance</p>
            <p className="pocketmoney-balance">{studentData.data?.balance?.toLocaleString() ?? 'N/A'}</p>
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