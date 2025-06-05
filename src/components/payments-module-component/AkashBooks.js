import '../../styles/payment-module-styles/AkashBooks.css';
import { Button, Box } from '@mui/material';
import { RestoreOutlined } from '@mui/icons-material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  paymentStatus: Yup.string().required('Payment Status is required'),
  paidReceiptNo: Yup.string().required('Paid Receipt No is required'),
  prePrintReceiptNo: Yup.string().required('Pre Print Receipt No is required'),
  bookClass: Yup.string().required('Books for Class is required'),
  notes: Yup.string().max(500, 'Notes must be 500 characters or less'),
});

const AkashBooks = () => {
  const initialValues = {
    paymentStatus: '',
    paidReceiptNo: '',
    prePrintReceiptNo: '',
    bookClass: 'Sr Intermediate', // Default value
    notes: '',
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Form Values:', values);
    alert('Form submitted successfully!');
    setSubmitting(false);
    resetForm(); // Reset form after submission
  };

  return (
    <div className="akash-books-container">
      <div className="header-section">
        <h2 className="title">Akash Books</h2>
        <div className="top-buttons">
          <Button
            variant="contained"
            className="track-btn"
            endIcon={<img src="" alt="Tracking" width="20" height="20" />}
            sx={{
              textTransform: 'capitalize',
              backgroundColor: '#1976d2',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Tracking
          </Button>
          <Button
            variant="outlined"
            color="inherit"
            endIcon={<RestoreOutlined />}
            size="small"
            sx={{
              textTransform: 'capitalize',
              width: '120px',
              height: '36px',
              '& .MuiButton-endIcon': {
                marginLeft: '4px',
              },
            }}
            onClick={() => alert('History Clicked')}
          >
            History
          </Button>
        </div>
      </div>

      <p className="subtitle">
        Students can submit a fee cancellation request, which will be reviewed and processed by the department officer (DO) for approval.
      </p>
      <div className="cancellation_form_line"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="form-card">
            <div className="form-grid">
              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="paymentStatus">Payment Status</label>
                  <Field as="select" name="paymentStatus" id="paymentStatus">
                    <option value="">Select Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </Field>
                  <ErrorMessage
                    name="paymentStatus"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="paidReceiptNo">Paid Receipt No</label>
                  <Field
                    type="text"
                    name="paidReceiptNo"
                    id="paidReceiptNo"
                    placeholder="ENTER RECEIPT NO"
                  />
                  <ErrorMessage
                    name="paidReceiptNo"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="prePrintReceiptNo">Pre Print Receipt No</label>
                  <Field
                    type="text"
                    name="prePrintReceiptNo"
                    id="prePrintReceiptNo"
                    placeholder="ENTER RECEIPT NO"
                  />
                  <ErrorMessage
                    name="prePrintReceiptNo"
                    component="div"
                    className="error"
                  />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="bookClass">Books for Class</label>
                  <Field as="select" name="bookClass" id="bookClass">
                    <option value="Sr Intermediate">Sr Intermediate</option>
                    <option value="Jr Intermediate">Jr Intermediate</option>
                    <option value="High School">High School</option>
                  </Field>
                  <ErrorMessage
                    name="bookClass"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="notes">Notes</label>
                  <Field
                    as="textarea"
                    name="notes"
                    id="notes"
                    rows="4"
                    placeholder="ENTER YOUR TEXT HERE"
                  />
                  <ErrorMessage name="notes" component="div" className="error" />
                </div>
              </div>
            </div>

            <div className="print-button">
              <Button
                type="submit"
                className="print-blue"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  textTransform: 'none',
                  padding: '10px 40px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  width: '120px',
                  '&:hover': {
                    backgroundColor: '#1e40af',
                  },
                }}
              >
                Print
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AkashBooks;