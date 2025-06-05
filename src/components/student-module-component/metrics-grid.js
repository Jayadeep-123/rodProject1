// MetricsGrid.js
import "../../styles/student-component-styles/metrics-grid.css";
import { useLocation } from 'react-router-dom';
import useStudentData from '../../customHooks/useStudentData';
import { useStudentContext } from '../../customHooks/StudentContext';

function MetricsGrid() {
  const location = useLocation();
  const hideMetrics = /other-fee-heads/.test(location.pathname);
  const { studentId } = useStudentContext();
  const { studentData, isLoading, isError } = useStudentData(studentId, 'cards');

  if (!studentId) {
    return <div>Please enter a student ID</div>;
  }

  if (isLoading) {
    return <div>Loading metrics...</div>;
  }

  if (isError || studentData.data === null) {
    return <div>Student not found or error loading metrics: {studentData.error?.message || 'Unknown error'}</div>;
  }

  return (
    <div>
      {!hideMetrics && (
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-header">
              <h3>JEE Marks</h3>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" d="M20.9668 0C28.1648 7.02229e-05 33.9999 5.8352 34 13.0332V20.9668C33.9999 28.1648 28.1648 33.9999 20.9668 34H13.0332C5.8352 33.9999 7.07727e-05 28.1648 0 20.9668V13.0332C7.0225e-05 5.8352 5.8352 7.0675e-05 13.0332 0H20.9668Z" fill="#8280FF"/>
                <path opacity="0.587821" d="M21.5334 13.9785C22.7851 13.9786 23.8 14.9933 23.8 16.2451C23.7998 17.4967 22.785 18.5116 21.5334 18.5117C20.2816 18.5117 19.2669 17.4968 19.2668 16.2451C19.2668 14.9932 20.2815 13.9785 21.5334 13.9785ZM14.7336 10.2001C16.4026 10.2003 17.756 11.5536 17.756 13.2226C17.7559 14.8915 16.4025 16.2449 14.7336 16.2451C13.0645 16.2451 11.7112 14.8916 11.7111 13.2226C11.7111 11.5535 13.0644 10.2001 14.7336 10.2001Z" fill="#8280FF"/>
                <path d="M14.7205 17.7558C18.338 17.7558 21.3106 19.4888 21.532 23.1962C21.5408 23.3443 21.5313 23.8005 20.9647 23.8007H8.48322C8.29374 23.8007 7.91846 23.3916 7.93439 23.1952C8.22724 19.5893 11.1534 17.7559 14.7205 17.7558ZM21.2322 19.2675C23.8058 19.2957 25.907 20.5968 26.0653 23.3466C26.0716 23.4574 26.0653 23.8004 25.6561 23.8007H22.742V23.7997C22.7419 22.0993 22.1803 20.53 21.2322 19.2675Z" fill="#8280FF"/>
              </svg>
            </div>
            <p className="metric-value">{studentData.data?.ipeMarks ?? 'N/A'}</p>
            <p className="metric-change positive">+8.6% Up from Section</p>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Recent Marks</h3>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" d="M20.9668 0C28.1648 7.02229e-05 33.9999 5.8352 34 13.0332V20.9668C33.9999 28.1648 28.1648 33.9999 20.9668 34H13.0332C5.8352 33.9999 7.07727e-05 28.1648 0 20.9668V13.0332C7.0225e-05 5.8352 5.8352 7.0675e-05 13.0332 0H20.9668Z" fill="#FEC53D"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.5 13.7794L15.8103 18C15.889 18.0455 15.9715 18.0783 16.0556 18.0991V26.2848L9.02137 22.1219C8.69821 21.9307 8.5 21.583 8.5 21.2075V13.7794ZM25.5001 13.6671V21.2074C25.5001 21.5829 25.3019 21.9305 24.9787 22.1218L17.9445 26.2846V18.0273C17.9616 18.0187 17.9786 18.0096 17.9954 17.9999L25.5001 13.6671Z" fill="#FEC53D"/>
                <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M8.72974 11.731C8.81903 11.6182 8.93173 11.5229 9.06313 11.4529L16.5006 7.49154C16.8129 7.32525 17.1874 7.32525 17.4996 7.49154L24.9371 11.4529C25.0384 11.5069 25.1286 11.5759 25.2055 11.6563L17.051 16.3643C16.9974 16.3952 16.948 16.4306 16.9029 16.4698C16.8579 16.4306 16.8085 16.3952 16.7548 16.3643L8.72974 11.731Z" fill="#FEC53D"/>
              </svg>
            </div>
            <p className="metric-value">{studentData.data?.recentMarks ?? 'N/A'}</p>
            <p className="metric-change positive">+8.6% Up from Section</p>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>EMCET Mock Test</h3>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" d="M20.9668 0C28.1648 7.02229e-05 33.9999 5.8352 34 13.0332V20.9668C33.9999 28.1648 28.1648 33.9999 20.9668 34H13.0332C5.8352 33.9999 7.07727e-05 28.1648 0 20.9668V13.0332C7.0225e-05 5.8352 5.8352 7.0675e-05 13.0332 0H20.9668Z" fill="#4AD991"/>
                <path d="M10.8297 23.1704H24.0519C24.5387 23.1704 24.9334 23.565 24.9334 24.0519C24.9334 24.5387 24.5387 24.9333 24.0519 24.9333H9.94819C9.46136 24.9333 9.06671 24.5387 9.06671 24.0519V9.94816C9.06671 9.46133 9.46136 9.06668 9.94819 9.06668C10.435 9.06668 10.8297 9.46133 10.8297 9.94816V23.1704Z" fill="#4AD991"/>
                <path opacity="0.5" d="M14.117 19.366C13.784 19.7212 13.2262 19.7392 12.871 19.4062C12.5159 19.0733 12.4979 18.5154 12.8308 18.1603L16.1364 14.6343C16.4584 14.2909 16.9935 14.2611 17.3516 14.5667L19.9606 16.793L23.3598 12.4873C23.6615 12.1052 24.2158 12.04 24.5979 12.3417C24.98 12.6433 25.0452 13.1976 24.7435 13.5797L20.7769 18.6042C20.467 18.9966 19.8932 19.0531 19.5128 18.7285L16.8472 16.4538L14.117 19.366Z" fill="#4AD991"/>
              </svg>
            </div>
            <p className="metric-value">{studentData.data?.emcetMockTest ?? 'N/A'}</p>
            <p className="metric-change negative">-4.3% Down from Section</p>
          </div>

          <div className="metric-card">
            <div className="metric-header">
              <h3>Attendance</h3>
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.21" d="M20.9668 0C28.1648 7.02229e-05 33.9999 5.8352 34 13.0332V20.9668C33.9999 28.1648 28.1648 33.9999 20.9668 34H13.0332C5.8352 33.9999 7.07727e-05 28.1648 0 20.9668V13.0332C7.0225e-05 5.8352 5.8352 7.0675e-05 13.0332 0H20.9668Z" fill="#FEC53D"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8.5 13.7794L15.8103 18C15.889 18.0455 15.9715 18.0783 16.0556 18.0991V26.2848L9.02137 22.1219C8.69821 21.9307 8.5 21.583 8.5 21.2075V13.7794ZM25.5001 13.6671V21.2074C25.5001 21.5829 25.3019 21.9305 24.9787 22.1218L17.9445 26.2846V18.0273C17.9616 18.0187 17.9786 18.0096 17.9954 17.9999L25.5001 13.6671Z" fill="#FEC53D"/>
                <path opacity="0.499209" fillRule="evenodd" clipRule="evenodd" d="M8.72974 11.731C8.81903 11.6182 8.93173 11.5229 9.06313 11.4529L16.5006 7.49154C16.8129 7.32525 17.1874 7.32525 17.4996 7.49154L24.9371 11.4529C25.0384 11.5069 25.1286 11.5759 25.2055 11.6563L17.051 16.3643C16.9974 16.3952 16.948 16.4306 16.9029 16.4698C16.8579 16.4306 16.8085 16.3952 16.7548 16.3643L8.72974 11.731Z" fill="#FEC53D"/>
              </svg>
            </div>
            <p className="metric-value">{studentData.data?.attendance ?? 'N/A'}</p>
            <p className="metric-change negative">-4.3% Down from Section</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MetricsGrid;