import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PaymentTable } from "../../components/payments-module-component/paymentTable";
import "../../styles/payment-module-styles/payments.css";
import Cash from '../../assets/Cash.png';
import DD from '../../assets/DD.png';
import Cheque from '../../assets/Cheque.png';
import debitCard from '../../assets/Debit Card.png';

const validationSchema = Yup.object().shape({
  currentAmount: Yup.string().required("Amount is required"),
  payDate: Yup.date().required("Pay Date is required"),
  hostSegmentYear: Yup.string().required("Select a year"),
  payHead: Yup.string().required("Pay Head is required"),
  fundsAmount: Yup.string().required("Enter Funds Amount"),
  medicalReserve: Yup.string().required("Enter Medical Reserve"),
  smartDescription: Yup.string().required("Description is required"),
  receiptNo: Yup.string().required("Receipt number required"),
  salesOrganization: Yup.string().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("Select Sales Organization"),
  }),
  chequeDate: Yup.date().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("Cheque/DD Date required"),
  }),
  chequeNo: Yup.string().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("Cheque/DD Size required"),
  }),
  bank: Yup.string().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("Bank name is required"),
  }),
  branch: Yup.string().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("Branch is required"),
  }),
  city: Yup.string().when("paymentMode", {
    is: (val) => val === "cheque" || val === "dd",
    then: (schema) => schema.required("City is required"),
  }),
  ifsc: Yup.string()
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .when("paymentMode", {
      is: (val) => val === "cheque" || val === "dd",
      then: (schema) => schema.required("IFSC code is required"),
    }),
});

const initialValues = {
  paymentMode: "cash",
  currentAmount: "",
  payDate: "",
  hostSegmentYear: "",
  payHead: "",
  totalDue: "90,900",
  fundsAmount: "",
  medicalReserve: "",
  bookFee: "FEE",
  smartDescription: "",
  receiptNo: "",
  salesOrganization: "",
  chequeNo: "",
  bank: "",
  branch: "",
  city: "",
  ifsc: "",
};

const FeePaymentForm = () => {
  const [payments, setPayments] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    setPayments((prev) => [...prev, values]);
    setShowTable(true);
    console.log("Submitted Values:", values);
    alert("Form Submitted Successfully");
    resetForm();
  };

  return (
    <div className="paymentContainer">
      {showTable ? (
        <PaymentTable payments={payments} onBackToForm={() => setShowTable(false)} />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form className="form-container">
              <div className="form_container_header">
                <div className="paymentTypes">
                  {[
                    { mode: "cash", label: "Cash", icon: Cash },
                    { mode: "dd", label: "DD", icon: DD },
                    { mode: "cheque", label: "Cheque", icon: Cheque },
                    { mode: "card", label: "Credit/Debit Card", icon: debitCard },
                  ].map(({ mode, label, icon }) => (
                    <button
                      key={mode}
                      type="button"
                      className={`paymentModeBtn ${values.paymentMode === mode ? "active" : ""}`}
                      onClick={() => setFieldValue("paymentMode", mode)}
                    >
                      <span className="icon">
                        <img src={icon} alt={label} className="payment-icon" />
                      </span>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="MainForms">
                <div className="form_section1">
                  <div className="input-group">
                    <label>Cheque/DD Amount</label>
                    <Field name="currentAmount" placeholder="Enter Amount" />
                    <ErrorMessage name="currentAmount" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Pay Date</label>
                    <Field name="payDate" type="date" />
                    <ErrorMessage name="payDate" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>fee Payment Year</label>
                    <Field as="select" name="hostSegmentYear">
                      <option value="">Select</option>
                      <option value="Jr Intermediate">Jr Intermediate</option>
                      <option value="Sr Intermediate">Sr Intermediate</option>
                    </Field>
                    <ErrorMessage name="hostSegmentYear" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Fee Head</label>
                    <Field as="select" name="payHead">
                      <option value="">Select</option>
                      <option value="FEE">FEE</option>
                      <option value="TUITION">TUITION</option>
                    </Field>
                    <ErrorMessage name="payHead" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Total Due</label>
                    <Field name="totalDue" disabled />
                  </div>

                  <div className="input-group">
                    <label>Amount In</label>
                    <Field name="fundsAmount" placeholder="Immediate 18 Return PUMP 1000 Cost" />
                    <ErrorMessage name="fundsAmount" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Pocket Money</label>
                    <Field name="medicalReserve" placeholder="Enter Amount" />
                    <ErrorMessage name="medicalReserve" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Akash Books</label>
                    <Field name="bookFee" disabled placeholder="FEE"/>
                  </div>

                  <div className="input-group full-width">
                    <label>Description</label>
                    <Field name="smartDescription" placeholder="Enter Description" />
                    <ErrorMessage name="smartDescription" component="div" className="error" />
                  </div>

                  <div className="input-group">
                    <label>Pre Print Receipt No</label>
                    <Field name="receiptNo" placeholder="Enter Amount" />
                    <ErrorMessage name="receiptNo" component="div" className="error" />
                  </div>
                </div>

                {(values.paymentMode === "cheque" || values.paymentMode === "dd") && (
                  <div className="form_section2">
                    <div className="heading">
                      <h3>Bank Details</h3>
                    </div>
                    <div className="input-group full-width">
                      <label>Organization</label>
                      <Field as="select" name="Select Organization">
                        <option value="">Select Organization</option>
                        <option value="Org A">Org A</option>
                        <option value="Org B">Org B</option>
                      </Field>
                      <ErrorMessage name="salesOrganization" component="div" className="error" />
                    </div>

                    <div className="input-group">
                      <label>Cheque/DD no</label>
                      <Field name="chequeNo" placeholder="Enter Amount" />
                      <ErrorMessage name="chequeNo" component="div" className="error" />
                    </div>
                    <div className="input-group">
                      <label>Cheque/DD Date</label>
                      <Field name="chequeDate" placeholder="Enter Cheque/DD Date" type="date" />
                      <ErrorMessage name="chequeDate" component="div" className="error" />
                    </div>
                    <div className="input-group">
                      <label>Bank</label>
                      <Field name="bank" placeholder="Enter Bank" />
                      <ErrorMessage name="bank" component="div" className="error" />
                    </div>

                    <div className="input-group">
                      <label>Branch</label>
                      <Field name="branch" placeholder="Enter Branch" />
                      <ErrorMessage name="branch" component="div" className="error" />
                    </div>

                    <div className="input-group">
                      <label>City</label>
                      <Field name="city" placeholder="Enter City" />
                      <ErrorMessage name="city" component="div" className="error" />
                    </div>

                    <div className="input-group">
                      <label>IFSC Code</label>
                      <Field name="ifsc" placeholder="Enter IFSC" />
                      <ErrorMessage name="ifsc" component="div" className="error" />
                    </div>
                  </div>
                )}
              </div>
              <div className="submit-btn">
                <button type="submit">Add Payment</button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default FeePaymentForm;