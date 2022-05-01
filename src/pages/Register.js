import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Register = ({ setToken }) => {
  const notifyError = (errMsg) => toast.error(errMsg);
  const notifySuccess = () => toast.success("Prisiregistravote!");
  let navigate = useNavigate();

  const onRegister = async (values) => {
    var response = await PostRequest("/auth/register", {
      username: values.username,
      email: values.email,
      password: values.password
    })
    if (response == null || response.data.message != null && response.data.message !== "Registered successfully") {
        let errMsg = "Nepavyko prisiregistruoti, bandykite vėliau..."
        console.log(response.data.message)
        if (response.data.message === "email exists") {
          errMsg = "El. paštas užimtas"
        } else if (response.data.message === "username exists") {
          errMsg = "Slapyvardis užimtas"
        }
        notifyError(errMsg)
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
            .required('Privaloma'),
          email: Yup.string()
            .email('Neteisingas el. paštas')
            .required('Privaloma'),
          password: Yup.string()
            .required('Privaloma')
            .min(8, 'Mažiausiai 8 simboliai')
            .max(25, 'Daugiausiai 25 simboliai'),
          passwordConfirmation: Yup.string()
            .required('Privaloma')
            .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti')
        })}
        onSubmit={async (values) => {
          onRegister(values)
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col items-center">
            <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Registracijos forma</h1>
            <div className="mb-4">
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Slapyvardis"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.username && <p className="text-red-500 mt-1 text-sm">{errors.username}</p>}
            </div>
            <div className="mb-4">
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="El. paštas"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.email && <p className="text-red-500 mt-1 text-xs">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Slaptažodis"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.password && <p className="text-red-500 mt-1 text-xs">{errors.password}</p>}
            </div>

            <div className="mb-4">
              <Field
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Slaptažodžio patvirtinimas"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.passwordConfirmation && <p className="text-red-500 mt-1 text-xs">{errors.passwordConfirmation}</p>}
            </div>
            <button disabled={!isValid && !dirty } className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">Registruotis</button>
          </Form>
        )}

      </Formik>
      <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
    </div>
  )
}

export default Register