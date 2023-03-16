import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const MyForm = () => (
    <Formik
        initialValues={{ name: '', email: '', amount: 0, currency: '', text: '', terms: false }}
        validationSchema={Yup.object({
            name: Yup.string()
                .min(2, 'The name is too short')
                .required('Required'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Required'),
            amount: Yup.number()
                .moreThan(0, 'Enter valid sum')
                .required('Enter the sum you want to donate'),
            currency: Yup.string()
                .required('Please choose a currency'),
            text: Yup.string()
                .min(10, 'The message is too short'),
            terms: Yup.boolean()
                .oneOf([true], "The terms and conditions must be accepted.")
                .required('You have to accept our privacy terms')
        })} 
        onSubmit={values => console.log(JSON.stringify(values, null, 2))}
    >
        {({ isSubmitting }) => (
            <Form className="form">
                <h2>Donate</h2>

                <label htmlFor="name">Your name</label>
                <Field type="text" name="name" id="name" />
                <ErrorMessage name="name" component="div" className="error" />

                <label htmlFor="email">Email</label>
                <Field type="email" name="email" id="email" />
                <ErrorMessage name="email" component="div" className="error" />

                <label htmlFor="amount">Sum</label>
                <Field type="number" name="amount" id="amount" />
                <ErrorMessage name="amount" component="div" className="error" />  

                <label htmlFor="currency">Currency</label>
                <Field as="select" name="currency" id="currency">
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
                </Field>
                <ErrorMessage name="currency" component="div" className="error" />

                <label htmlFor="text">Leave a message</label>
                <Field as="textarea" name="text" id="text" />
                <ErrorMessage name="text" component="div" className="error" />

                <label className="checkbox">
                    <Field type="checkbox" name="terms" id="terms" />
                    Accept our privacy policy terms
                </label>
                <ErrorMessage name="terms" component="div" className="error" />

                <button type="submit" disabled={isSubmitting}>
                    Send
                </button>
            </Form>
        )}
    </Formik>
)

export default MyForm;
