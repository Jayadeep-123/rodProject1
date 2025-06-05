
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import '../../styles/payment-module-styles/payment-screen.css';
import dollar from '../../assets/dollor.png';
import Payment from '../../components/payments-module-component/payments';
import Cancellation from '../../components/payments-module-component/Cancellation';
import Concession from '../../components/payments-module-component/Concession';
import PMIssue from '../../components/payments-module-component/PMIssue';
import FeeInstallments from '../../components/payments-module-component/FeeInstallments';
import AkashBooks from '../../components/payments-module-component/AkashBooks';
import Transfers from '../../components/payments-module-component/Transfers';
import Uniform from '../../components/payments-module-component/Uniform';
import useNavigation from '../../customHooks/useNavigation';

const MainScreen = () => {
    const {  mainTabs, subTabs } = useNavigation();

    return (
        <div className="container">
            <div className="left_side_container">


                <Routes>
                    <Route
                        path="/payments/*"
                        element={
                            <>
                                <div className="Payments">
                                    <img src={dollar} alt="img"  />
                                    <div>
                                        <h1>Payments</h1>
                                        <p>Get all student details regarding fee payment, transport, pocket money, other fee heads</p>
                                    </div>
                                </div>

                                <div className="sub-tabs">
                                    {subTabs.map((tab, index) => (
                                        <NavLink
                                            key={index}
                                            to={tab.path}
                                            className={({ isActive }) => (isActive ? 'sub-tab active' : 'sub-tab')}
                                            end={tab.path === '/payments'}
                                        >
                                            {tab.name}
                                        </NavLink>
                                    ))}
                                </div>

                                <div className="sub-tab-content">
                                    <Routes>
                                        <Route path="/payments-sub" element={<Payment />} />
                                        <Route path="/cancellation" element={<Cancellation />} />
                                        <Route path="/concession" element={<Concession />} />
                                        <Route path="/pm-issue" element={<PMIssue />} />
                                        <Route path="/fee-installments" element={<FeeInstallments />} />
                                        <Route path="/akash-books" element={<AkashBooks />} />
                                        <Route path="/uniform" element={<Uniform />} />
                                        <Route path="/transfers" element={<Transfers />} />
                                    </Routes>
                                </div>
                            </>
                        }
                    />
                    <Route path="*" element={<div>Select a tab to view content</div>} />
                </Routes>
            </div>

            
        </div>
    );
};

export default MainScreen;
