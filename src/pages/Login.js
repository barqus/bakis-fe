import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const notifyError = () => toast.error("Couldn't login");
  let navigate = useNavigate();

  const onLogin = async (values) => {
    var response = await PostRequest("/auth/login", {
      email: values.email,
      password: values.password
    }, false)

    if (response.data.message != null) {
      notifyError()
    } else {
      setToken(response.data.token);
      window.location.replace("/");
    }
  }

  return (
    <div className="bg-white m-16 px-6 py-6 w-80 rounded-md block ml-auto mr-auto">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('No password provided.')
            .min(8, 'Should be 8 chars minimum.')
            .max(25, 'Should be 25 chars maximum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
        })}
        onSubmit={async (values) => {
          onLogin(values)
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col items-center">
            <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Please login!</h1>
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

            <div>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.password && <p className="text-red-500 mt-1 text-xs">{errors.password}</p>}
            </div>
            <button disabled={!isValid && !dirty} className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">LOGIN</button>
            <div onClick={() => {navigate("/signup");}} className="cursor-pointer text-blue-500 underline text-sm mt-1">
              Don't have an account? Create one!
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
    </div>
  )
}

export default Login