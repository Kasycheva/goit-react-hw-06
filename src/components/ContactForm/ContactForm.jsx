import s from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact, selectContacts } from "../../redux/contactsSlice";
import { nanoid } from "nanoid";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: "",
    number: "",
  };

  const nameFieldId = useId();
  const numberFieldId = useId();

  const validationForm = yup.object({
    name: yup
      .string()
      .min(3, "Too Short!")
      .max(50, "So Long!")
      .required("Please, enter your name!"),
    number: yup
      .string()
      .matches(
        /^(\+?\d{1,4}[-.\s]?|(\(\d{1,4}\)\s?)?)?((\d{1,4}[-.\s]?){1,3}\d{1,4})$/,
        "Please enter a valid phone number"
      )
      .required("Please, enter your phone number!"),
  });

  const handleSubmit = (values, actions) => {
    if (contacts.some(c => c.name.toLowerCase() === values.name.toLowerCase())) {
      alert(`Contact with name ${values.name} already exists`);
      return;
    }
    dispatch(addContact({ ...values, id: nanoid(5) })); 
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationForm}
    >
      <Form className={s.form}>
        <div className={s.box}>
          <label className={s.label} htmlFor={nameFieldId}>
            Name
          </label>
          <Field className={s.input} type="text" name="name" id={nameFieldId} />
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={s.box}>
          <label className={s.label} htmlFor={numberFieldId}>
            Number
          </label>
          <Field
            className={s.input}
            type="tel"
            name="number"
            id={numberFieldId}
          />
          <ErrorMessage name="number" component="span" />
        </div>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
