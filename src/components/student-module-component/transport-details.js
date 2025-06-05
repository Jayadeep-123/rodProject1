import "../../styles/student-component-styles/transport-details.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function TransportDetails() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'transport-details');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading transport details...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading transport details: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <div>
      <div className="transport-container">
        <div className="transport-info">
          <div className="transport-row">
            <p>Academic Year</p>
            <span>{studentData.data?.academicYear ?? 'N/A'}</span>
          </div>
          <div className="transport-row">
            <p>Transport Type</p>
            <span>{studentData.data?.transportType ?? 'N/A'}</span>
          </div>
          <div className="transport-row">
            <p>Transport Status</p>
            <span>{studentData.data?.transportStatus ?? 'N/A'}</span>
          </div>
          <div className="transport-row">
            <p>Stage</p>
            <span>{studentData.data?.stage ?? 'N/A'}</span>
          </div>
        </div>

        <div className="transport-visual">
          {/* <div className="route-circle">
            <span className="route-icon">🚍</span>
            <p className="route-number">
              Route No<br />
              <strong>{studentData.data?.routeNumber ?? 'N/A'}</strong>
            </p>
          </div>
          <div className="route-path">
            <p className="stop">{studentData.data?.routeStart ?? 'N/A'}</p>
            <div className="line"></div>
            <p className="stop">{studentData.data?.routeEnd ?? 'N/A'}</p>
          </div> */}
        </div>
      </div>

      <div className="manage-button-container">
        <button className="manage-button">+ Manage Transport</button>
      </div>
    </div>
  );
}

export default TransportDetails;