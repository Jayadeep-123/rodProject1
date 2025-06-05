
    import React from 'react';
    import { Formik, Form, Field } from 'formik';
    import '../../styles/payment-module-styles/Concession.css';
    import { Button, Stack, Box } from '@mui/material';
    import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
    import { RestoreOutlined } from "@mui/icons-material";

    const Concession = () => {
        const initialValues = {
            joinInfo: '',
            srIntermediate: '',
            receiptNo: '',
            approvedBy: '',
            reason: '',
        };

        const handleSubmit = (values) => {
            const printContent = `
        Concession Request
        -----------------
        Join Info: ${values.joinInfo || 'Not provided'}
        Sr Intermediate: ${values.srIntermediate || 'Not provided'}
        Receipt No: ${values.receiptNo || 'Not provided'}
        Approved By: ${values.approvedBy || 'Not provided'}
        Reason: ${values.reason || 'Not provided'}
        `;
            const printWindow = window.open('', '_blank');
            printWindow.document.write('<pre>' + printContent + '</pre>');
            printWindow.document.close();
            printWindow.print();
        };

        return (
            <div className="concession-page">
                <div className='text-buttons'>
                    <div className='text'>
                        <h1>Concession</h1>
                        <p>Students can submit a fee cancellation request, which will be reviewed and processed by the Department Officer (DO) for approval.</p>
                    </div>
                    <div className="button-group">
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<FormatListBulletedIcon />}
                            size="small"
                            sx={{
                                textTransform: "capitalize",
                                width: "100%", // Set desired width
                                height: "36px", // Set desired height
                                '& .MuiButton-startIcon': {
                                    marginRight: '4px', // Increase space between icon and text
                                },
                            }}
                            onClick={() => alert('Add Item')}
                        >
                            Request
                        </Button>
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
                <div className="cancellation_form_line" ></div>
                <div className="concession-card">
                    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                        {() => (
                            <Form className="concession-form">
                                <div className="column">
                                    <div className="form-group">
                               
                                        <label htmlFor="JoinInfo">Join Info</label>
                                        <Field as="select" name="joinInfo" className="form-input">
                                            <option value="">Select</option>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                        </Field>
                                    </div>
                              

                                    
                                    <div className="form-group">
                                        <label htmlFor="approvedBy">Reason</label>
                                        <Field
                                            type="text"
                                            name="approvedBy"
                                            className="form-input"
                                            placeholder="Enter Approved By"
                                        />
                                        </div>
                                 

                                    <div className="form-group">
                                     
                                        <label htmlFor="Reason">Approved By</label>
                                        <Field
                                            type="text"
                                            name="receiptNo"
                                            className="form-input"
                                            placeholder="Enter Receipt no"
                                        />
                                        </div>
                                    </div>
                             

                                <div className="column">
                                    <div className="form-group">
                                     
                                        <label htmlFor="concession amount">Concession Amount</label>
                                        <Field as="select" name="concession amount" className="form-input">
                                            <option value="">Select</option>
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                        </Field>
                                    </div>
                                        
                                    

                                    <div className="form-group">
                                        
                                        <label htmlFor="reason">Reason Description</label>
                                        <Field
                                            as="textarea"
                                            name="reason"
                                            className="form-input textarea"
                                            placeholder="Enter your text here"
                                        />
                                        </div>
                                    </div>
                               

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        mt: 4,
                                        width: '100%',
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => alert('Clicked Primary Button')}
                                        sx={{
                                            textTransform: 'capitalize',
                                        }}
                                    >
                                        <span style={{ padding: '0 40px' }}>Print</span>
                                    </Button>
                                </Box>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        );
    };

    export default Concession;
