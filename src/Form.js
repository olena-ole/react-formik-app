import { useFormik } from "formik";

const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = 'Required';
    } else if (values.name.length < 2) {
        errors.name = 'The name is too short';
    }
  
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
  
    if (values.amount <= 0) {
        errors.amount = 'Enter the sum you want to donate'
    }

    if (!values.currency) {
        errors.currency = 'Please choose a currency'
    }

    if (!values.terms) {
        errors.terms = 'You have to accept our privacy terms'
    }
  
    return errors;
};

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
        validate,
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
            />
            {formik.errors.name && <div>{formik.errors.name}</div>}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
            />
            {formik.errors.email && <div>{formik.errors.email}</div>}
            <label htmlFor="amount">Sum</label>
            <input
                id="amount"
                name="amount"
                type="number"
                value={formik.values.amount}
                onChange={formik.handleChange}
            />
            {formik.errors.amount && <div>{formik.errors.amount}</div>}
            <label htmlFor="currency">Currency</label>
            <select
                id="currency"
                name="currency"
                value={formik.values.currency}
                onChange={formik.handleChange}
            >
                    <option value="">Choose currency</option>
                    <option value="USD">USD</option>
                    <option value="UAH">UAH</option>
                    <option value="EUR">EUR</option>
            </select>
            {formik.errors.currency && <div>{formik.errors.currency}</div>}
            <label htmlFor="text">Leave a message</label>
            <textarea 
                id="text"
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
            />
            <label className="checkbox">
                <input 
                    name="terms" 
                    type="checkbox" 
                    value={formik.values.terms}
                    onChange={formik.handleChange}
                />
                Accept our privacy policy terms
            </label>
            {formik.errors.terms && <div>{formik.errors.terms}</div>}
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;