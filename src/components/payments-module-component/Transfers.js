import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/payment-module-styles/Transfers.css";
import { Button, Box } from "@mui/material";
import { RestoreOutlined } from "@mui/icons-material";

const Transfers = () => {
    const formik = useFormik({
        initialValues: {
            transferType: "",
            receiptNo: "",
            notes: "",
        },
        validationSchema: Yup.object({
            transferType: Yup.string().required("Transfer Type is required"),
            receiptNo: Yup.string()
                .required("Receipt Number is required")
                .matches(/^\d+$/, "Must be only digits"),
            notes: Yup.string().max(500, "Notes must be 500 characters or less"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="transfers-container">
            <div className="transfers-header">
                <div className="transfers-header-left">
                    <h4>Transfers</h4>
                    <p>
                        Students can submit a fee cancellation request, which will be reviewed
                        and processed by the department officer (DO) for approval.
                    </p>
                </div>
                <div className="transfers-header-buttons">
                    <Button
                        variant="outlined"
                        color="inherit"
                        endIcon={<RestoreOutlined />}
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            width: "120px",
                            height: "36px",
                            "& .MuiButton-startIcon": {
                                marginRight: "4px",
                                marginLeft: "8px",
                            },
                        }}
                        onClick={() => alert("History Clicked")}
                    >
                        History
                    </Button>
                </div>
            </div>

            <div className="transfers_form_line"></div>

            <form onSubmit={formik.handleSubmit} className="transfers-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="transferType">Transfer Type</label>
                        <select
                            name="transferType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.transferType}
                            aria-label="Select Transfer Type"
                        >
                            <option value="">Select</option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                        </select>
                        {formik.touched.transferType && formik.errors.transferType && (
                            <div className="error">{formik.errors.transferType}</div>
                        )}
                    </div>

                   
                     <div className="form-group full-width">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            rows="3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.notes}
                            placeholder="Enter Your Text Here"
                        />
                        {formik.touched.notes && formik.errors.notes && (
                            <div className="error">{formik.errors.notes}</div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                     <div className="form-group">
                        <label htmlFor="receiptNo">Pre Print Receipt No</label>
                        <input
                            type="text"
                            name="receiptNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.receiptNo}
                            placeholder="Enter Receipt No"
                        />
                        {formik.touched.receiptNo && formik.errors.receiptNo && (
                            <div className="error">{formik.errors.receiptNo}</div>
                        )}
                    </div>
                </div>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
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

export default Transfers;