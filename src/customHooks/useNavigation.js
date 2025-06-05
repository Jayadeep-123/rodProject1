// useNavigation.js
import { useState } from 'react';

const useNavigation = () => {
  
  

  // Main tabs configuration
  const mainTabs = [
    { name: 'Student Profile', path: '/student-profile' },
    { name: 'Payments', path: '/payments' },
    { name: 'Transport', path: '/transport' },
    { name: 'Academics', path: '/academics' },
    { name: 'Alerts', path: '/alerts' },
    { name: 'History', path: '/history' },
    { name: 'Room Allotment', path: '/room-allotment' },
  ];

  // Sub-tabs configuration
  const subTabs = [
    { name: 'Payments', path: '/payments/payments-sub' },
    { name: 'Cancellation', path: '/payments/cancellation' },
    { name: 'Concession', path: '/payments/concession' },
    { name: 'PM Issue', path: '/payments/pm-issue' },
    { name: 'Fee Installments', path: '/payments/fee-installments' },
    { name: 'Akash Books', path: '/payments/akash-books' },
    { name: 'Uniform', path: '/payments/uniform' },
    { name: 'Transfers', path: '/payments/transfers' },
  ];

  return {
    mainTabs,
    subTabs,
  };
};

export default useNavigation;