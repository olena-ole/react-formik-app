import { useFormik } from "formik";
import * as Yup from 'yup';

const Form = () => {
    const formik = useFormik({
        initialValues: {
          name: '',
          email: '',
          amount: 0,
          currency: '',
          text: '',
          terms: false
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: values => console.log(JSON.stringify(values, null, 2)),
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <h2>Donate</h2>
            <label htmlFor="name">Your name</label>
            <input
                id="name"
                name="name"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name && <div className="error">{formik.errors.name}</div>}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
            <label htmlFor="amount">Sum</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />
            {formik.errors.amount && formik.touched.amount && <div className="error">{formik.errors.amount}</div>}
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
            </select>
            {formik.errors.currency && formik.touched.currency && <div className="error">{formik.errors.currency}</div>}
            <label htmlFor="text">Leave a message</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
            />
            {formik.errors.text && formik.touched.text && <div className="error">{formik.errors.text}</div>}
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                Accept our privacy policy terms
            </label>
            {formik.errors.terms && formik.touched.terms && <div className="error">{formik.errors.terms}</div>}
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;