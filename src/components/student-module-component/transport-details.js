import "../../styles/student-component-styles/transport-details.css";
import { useStudentContext } from '../../customHooks/StudentContext';
import useStudentData from '../../customHooks/useStudentData';

function TransportDetails() {
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId);

  // Access transport specifically
  const transport = studentData.transport || {};

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading || transport.isLoading) {
    return <div>Loading transport details...</div>;
  }

  if (isError || transport.isError || transport.data === null) {
    return (
      <div>
        Student not found or error loading transport details:{" "}
        {transport.error?.message || "Unknown error"}
      </div>
    );
  }

  if (transport.isEmpty || !transport.data?.length) {
    return <div>No transport details available for this student.</div>;
  }

  // Access the first object in the array
  const transportData = transport.data[0] || {};

  // Map API field names to component field names
  const mappedData = {
    academicYear: transportData.acadamicYear ?? 'N/A',
    transportType: transportData.transportType ?? 'N/A', // Note: Not in Swagger response, may need backend update
    transportStatus: transportData.transportStatus ?? 'N/A',
    stage: transportData.stage ?? 'N/A',
    routeNumber: transportData.transportRouteNo ?? 'N/A',
    routeStart: transportData.startFrom ?? 'N/A',
    routeEnd: transportData.toDestination ?? 'N/A',
  };

  // Debug log to verify data
  console.log('Transport Data:', { studentId, transportData, mappedData });

  return (
    <div>
      <div className="transport-container">
        <div className="transport-info">
          <div className="transport-row">
            <p>Academic Year</p>
            <span>{mappedData.academicYear}</span>
          </div>
          <div className="transport-row">
            <p>Transport Type</p>
            <span>{mappedData.transportType}</span>
          </div>
          <div className="transport-row">
            <p>Transport Status</p>
            <span>{mappedData.transportStatus}</span>
          </div>
          <div className="transport-row">
            <p>Stage</p>
            <span>{mappedData.stage}</span>
          </div>
        </div>

        <div className="transport-visual">
          <div className="route-circle">
            <span className="route-icon">🚍</span>
            <p className="route-number">
              Route No<br />
              <strong>{mappedData.routeNumber}</strong>
            </p>
          </div>
          <div className="route-path">
            <p className="stop">{mappedData.routeStart}</p>
            <div className="line"></div>
            <p className="stop">{mappedData.routeEnd}</p>
          </div>
        </div>
      </div>

      <div className="manage-button-container">
        <button className="manage-button">+ Manage Transport</button>
      </div>
    </div>
  );
}

export default TransportDetails;