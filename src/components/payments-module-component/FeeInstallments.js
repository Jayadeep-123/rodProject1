import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/payment-module-styles/FeeInstallments.css";
import { Button, Box } from "@mui/material";
import { RestoreOutlined } from "@mui/icons-material";

const FeeInstallments = () => {
  const formik = useFormik({
    initialValues: {
      CardNo: "",
      DepositAmount: "",
      issueAmount: "",
      PocketMoneyBalance: "",
      PayAmount: "",
      Description: "",
      IssueDate: "",
      PaymentMode: "",
      Remarks: "",
    },
    validationSchema: Yup.object({
      CardNo: Yup.string()
        .required("Card No is required")
        .matches(/^\d+$/, "Must be only digits"),
      DepositAmount: Yup.string()
        .required("Deposit Amount is required")
        .matches(/^\d+$/, "Must be only digits"),
      issueAmount: Yup.number()
        .typeError("Must be a number")
        .positive("Must be a positive amount")
        .required("Issue Amount is required"),
      PocketMoneyBalance: Yup.string().required("Pocket Money Balance is required"),
      PayAmount: Yup.string().required("Pay Amount is required"),
      Description: Yup.string().required("Description is required"),
      IssueDate: Yup.string().required("Issue Date is required"),
      PaymentMode: Yup.string().required("Payment Mode is required"),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="feeinstallment-container">
      <div className="feeinstallment_header">
        <div className="feeinstallment_header_left">
          <h4>Fee Installment</h4>
          <p>
            Students can submit a fee cancellation request, which will be reviewed and processed by the Department Officer (DO) for approval.
          </p>
        </div>
        <div className="feeinstallment_header_buttons">
          <Button
            variant="outlined"
            color="gray"
            endIcon={<RestoreOutlined />}
            size="small"
            sx={{
              textTransform: "capitalize",
              width: "120px",
              height: "36px",
              '& .MuiButton-startIcon': {
                marginRight: '4px',
                marginLeft: '8px',
              },
            }}
            onClick={() => alert("History Clicked")}
          >
            History
          </Button>
        </div>
      </div>

      <div className="feeinstallment_form_line"></div>

      <form onSubmit={formik.handleSubmit} className="fee-cancel-form">
        <div className="form-row">
          <div className="form-group">
            <label>Card No</label>
            <input
              type="text"
              name="CardNo"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.CardNo}
            />
            {formik.touched.CardNo && formik.errors.CardNo && (
              <div className="error">{formik.errors.CardNo}</div>
            )}
          </div>

          <div className="form-group">
            <label>Deposit Amount</label>
            <input
              type="text"
              name="DepositAmount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.DepositAmount}
            />
            {formik.touched.DepositAmount && formik.errors.DepositAmount && (
              <div className="error">{formik.errors.DepositAmount}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Issue Amount</label>
            <input
              type="text"
              name="issueAmount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.issueAmount}
            />
            {formik.touched.issueAmount && formik.errors.issueAmount && (
              <div className="error">{formik.errors.issueAmount}</div>
            )}
          </div>

          <div className="form-group">
            <label>Pocket Money Balance</label>
            <select
              name="PocketMoneyBalance"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PocketMoneyBalance}
            >
              <option value="">Select Balance</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
            </select>
            {formik.touched.PocketMoneyBalance && formik.errors.PocketMoneyBalance && (
              <div className="error">{formik.errors.PocketMoneyBalance}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Pay Amount</label>
            <select
              name="PayAmount"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PayAmount}
            >
              <option value="">Select Amount</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="150">150</option>
            </select>
            {formik.touched.PayAmount && formik.errors.PayAmount && (
              <div className="error">{formik.errors.PayAmount}</div>
            )}
          </div>

          <div className="form-group">
            <label>Description</label>
            <select
              name="Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Description}
            >
              <option value="">Select Reason</option>
              <option value="Stationery">Stationery</option>
              <option value="Snacks">Snacks</option>
              <option value="Books">Books</option>
            </select>
            {formik.touched.Description && formik.errors.Description && (
              <div className="error">{formik.errors.Description}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Issue Date</label>
            <input
              type="date"
              name="IssueDate"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.IssueDate}
            />
            {formik.touched.IssueDate && formik.errors.IssueDate && (
              <div className="error">{formik.errors.IssueDate}</div>
            )}
          </div>

          <div className="form-group">
            <label>Payment Mode</label>
            <select
              name="PaymentMode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.PaymentMode}
            >
              <option value="">Select Mode</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Online">Online</option>
            </select>
            {formik.touched.PaymentMode && formik.errors.PaymentMode && (
              <div className="error">{formik.errors.PaymentMode}</div>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Remarks</label>
            <textarea
              name="Remarks"
              rows="1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.Remarks}
            />
          </div>
        </div>

        <Box sx={{ display: "flex", justifyContent: "center",}}>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={{ textTransform: "capitalize", px: 5 }}
          >
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default FeeInstallments;