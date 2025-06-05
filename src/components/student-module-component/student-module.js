import { Link } from 'react-router-dom';
import "../../styles/student-component-styles/student-module.css";
import { Route, Routes } from 'react-router-dom';
import PocketMoney from './pocket-money';
import FeeDetails from './fee-details';
import TransportDetails from './transport-details';
import Refunds from './refunds';
import OtherFeeHeads from './other-fee-hands';
import sudentinfo from "../../assets/srichaiinfo.png"
import NavButtons from './nav-buttons';
import MetricsGrid from './metrics-grid';
import Headerpart from '../header';

function StudentModule() {
    return (
        <div className="student-container">

            

            
            <MetricsGrid/>

            {/* <!-- student-info --> */}
            <div class="student-info-container">
                <div class="student-header">
                    <div class="header-left">
                        <img src={sudentinfo} className="student-info-img"/>
                        <div>
                            <h2 className="stu-info">Student Information</h2>
                            <p className="stu-info-sub-para">Get All Student Details Regarding Fee Payment, Transport, Pocket Money, Other Fee Heads</p>
                        </div>
                    </div>
                    <select class="year-dropdown">
                        <option>Inter 2</option>
                        <option>Inter 1</option>
                    </select>
                </div>
                <nav class="tab-nav">
                    <Link to="/student/fee-details" className="tab" active-class="active-tab">Fee Details</Link>
                    <Link to="/student/pocket-money" className="tab" active-class="active-tab">Pocket Money</Link>
                    <Link to="/student/transport-details" className="tab" active-class="active-tab">Transport Details</Link>
                    <Link to="/student/refunds" className="tab" active-class="active-tab">Refunds</Link>
                    <Link to="/student/other-fee-heads" className="tab" active-class="active-tab">Other Fee Heads</Link>
                </nav>

                <Routes>
                    <Route path="/fee-details" element={<FeeDetails />} />
                    <Route path="/pocket-money" element={<PocketMoney />} />
                    <Route path="/transport-details" element={<TransportDetails />} />
                    <Route path="/refunds" element={<Refunds />} />
                    <Route path="/other-fee-heads" element={<OtherFeeHeads />} />
                    {/* <Route path="*" element={<FeeDetails />} /> */}
                </Routes>

            </div>

        </div>
    );
}

export default StudentModule;