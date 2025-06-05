// StudentContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const StudentContext = createContext();

// Create a provider component
export const StudentProvider = ({ children }) => {
  const [studentId, setStudentId] = useState('1'); // Default to '1' or empty string

  return (
    <StudentContext.Provider value={{ studentId, setStudentId }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook to use the context
export const useStudentContext = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudentContext must be used within a StudentProvider');
  }
  return context;
};