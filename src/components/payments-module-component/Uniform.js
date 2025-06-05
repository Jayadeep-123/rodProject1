import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/payment-module-styles/Uniform.css";
import { Button, Box } from "@mui/material";
import { RestoreOutlined } from "@mui/icons-material";

const Uniform = () => {
    const formik = useFormik({
        initialValues: {
            paidReceiptNo: "",
            prePrintReceiptNo: "",
            notes: "",
        },
        validationSchema: Yup.object({
            paidReceiptNo: Yup.string()
                .required("Paid Receipt No is required")
                .matches(/^\d+$/, "Must be only digits"),
            prePrintReceiptNo: Yup.string()
                .required("Pre Print Receipt No is required")
                .matches(/^\d+$/, "Must be only digits"),
            notes: Yup.string().max(500, "Notes must be 500 characters or less"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div className="uniform-container">
            <div className="uniform-header">
                <div className="uniform-header-left">
                    <h4>Uniform Print</h4>
                    <p>
                        Students can submit a fee cancellation request, which will be reviewed
                        and processed by the department officer (DO) for approval.
                    </p>
                </div>
                <div className="uniform-header-buttons">
                    <Button
                        variant="contained"
                        className="track-btn"
                        endIcon={<img src="" alt="Tracking" width="20" height="20" />}
                        sx={{
                            textTransform: "capitalize",
                            backgroundColor: "#1976d2",
                            "&:hover": {
                                backgroundColor: "#115293",
                            },
                        }}
                    >
                        Tracking
                    </Button>
                    <Button
                        variant="outlined"
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

            <div className="cancellation_form_line"></div>

            <form onSubmit={formik.handleSubmit} className="uniform-form">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="paidReceiptNo">Paid Receipt No</label>
                        <input
                            type="text"
                            name="paidReceiptNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paidReceiptNo}
                            placeholder="Enter Receipt No"
                            aria-label="Paid Receipt Number"
                        />
                        {formik.touched.paidReceiptNo && formik.errors.paidReceiptNo && (
                            <div className="error">{formik.errors.paidReceiptNo}</div>
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
                            aria-label="Notes"
                        />
                        {formik.touched.notes && formik.errors.notes && (
                            <div className="error">{formik.errors.notes}</div>
                        )}
                    </div>
                </div>

                <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="prePrintReceiptNo">Pre Print Receipt No</label>
                        <input
                            type="text"
                            name="prePrintReceiptNo"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.prePrintReceiptNo}
                            placeholder="Enter Receipt No"
                            aria-label="Pre Print Receipt Number"
                        />
                        {formik.touched.prePrintReceiptNo && formik.errors.prePrintReceiptNo && (
                            <div className="error">{formik.errors.prePrintReceiptNo}</div>
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
                        <span style={{ padding: "0 40px" }}>Print</span>
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Uniform;