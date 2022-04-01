import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const notifyError = () => toast.error("Couldn't register");
  let navigate = useNavigate();

  const onRegister = async (values) => {
    var response = await PostRequest("/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password
    })
    if (response == null) {
        notifyError()
    } else {
      return navigate("/login");
    }
  }

  return (
    <div className="bg-white m-16 px-6 py-6 w-80 rounded-md block ml-auto mr-auto">
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('No password provided.')
            .min(8, 'Should be 8 chars minimum.')
            .max(25, 'Should be 25 chars maximum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
          passwordConfirmation: Yup.string()
            .required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
        })}
        onSubmit={async (values) => {
          onRegister(values)
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col items-center">
            <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Please register!</h1>
            <div className="mb-4">
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.username && <p className="text-red-500 mt-1 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.password && <p className="text-red-500 mt-1 text-xs">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <Field
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Password Confirmation"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.passwordConfirmation && <p className="text-red-500 mt-1 text-xs">{errors.passwordConfirmation}</p>}
            </div>
            <button disabled={!isValid && !dirty } className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">REGISTER</button>
          </Form>
        )}

      </Formik>
      <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
    </div>
  )
}

export default Register