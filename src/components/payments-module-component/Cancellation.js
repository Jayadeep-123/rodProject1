import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/payment-module-styles/Cancellation.css";
import { Button, Box } from "@mui/material";
import { LocalPrintshopOutlined, RestoreOutlined } from "@mui/icons-material";

const Cancellation = () => {
    const formik = useFormik({
        initialValues: {
            receiptNo: "",
            prePrintReceiptNo: "",
            paidAmount: "",
            notes: "",
        },
        validationSchema: Yup.object({
            receiptNo: Yup.string()
                .required("Receipt No is required")
                .matches(/^\d+$/, "Must be only digits"),
            prePrintReceiptNo: Yup.string()
                .required("Pre Print Receipt No is required")
                .matches(/^\d+$/, "Must be only digits"),
            paidAmount: Yup.number()
                .typeError("Must be a number")
                .positive("Must be a positive amount")
                .required("Paid Amount is required"),
            notes: Yup.string().required("Notes are required"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="cancellation-container">
            <div className="cancellation-header">
                <div className="cancellation-header-left">
                    <h4>Request Cancellation</h4>
                    <p>
                        Students can submit a fee cancellation request, which will be
                        reviewed and processed by the department officer (DO) for approval.
                    </p>
                </div>
                <div className="cancellation-header-buttons">
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<LocalPrintshopOutlined />}
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "36px",
                            "& .MuiButton-startIcon": {
                                marginRight: "4px",
                            },
                        }}
                        onClick={() => alert("Add Item")}
                    >
                        ReceiptPrint
                    </Button>
                    <Button
                        variant="outlined"
                        color="inherit"
                        endIcon={<RestoreOutlined />}
                        size="small"
                        sx={{
                            textTransform: "capitalize",
                            width: "100%",
                            height: "36px",
                            "& .MuiButton-endIcon": {
                                marginRight: "4px",
                                marginLeft: "8px",
                            },
                        }}
                        onClick={() => alert("Add Item")}
                    >
                        History
                    </Button>
                </div>
            </div>
            <div className="cancellation_form_line"></div>
            <form onSubmit={formik.handleSubmit} className="cancellation-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="receiptNo">Receipt No</label>
                        <input
                            type="text"
                            name="receiptNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.receiptNo}
                            placeholder="Enter receipt no"
                            aria-label="Receipt Number"
                        />
                        {formik.touched.receiptNo && formik.errors.receiptNo && (
                            <div className="error">{formik.errors.receiptNo}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="prePrintReceiptNo">Pre Print Receipt No</label>
                        <input
                            type="text"
                            name="prePrintReceiptNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.prePrintReceiptNo}
                            placeholder="Enter pre print receipt no"
                            aria-label="Pre Print Receipt Number"
                        />
                        {formik.touched.prePrintReceiptNo && formik.errors.prePrintReceiptNo && (
                            <div className="error">{formik.errors.prePrintReceiptNo}</div>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="paidAmount">Paid Amount</label>
                        <input
                            type="text"
                            name="paidAmount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paidAmount}
                            placeholder="Enter Amount"
                            aria-label="Paid Amount"
                        />
                        {formik.touched.paidAmount && formik.errors.paidAmount && (
                            <div className="error">{formik.errors.paidAmount}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                            name="notes"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.notes}
                            rows="3"
                            placeholder="Enter your text here"
                            aria-label="Notes"
                        />
                        {formik.touched.notes && formik.errors.notes && (
                            <div className="error">{formik.errors.notes}</div>
                        )}
                    </div>
                </div>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                            textTransform: "capitalize",
                            "& .text-content": {
                                px: 5,
                            },
                        }}
                    >
                        <span className="text-content">Request Cancel</span>
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Cancellation;