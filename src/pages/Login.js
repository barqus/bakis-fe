import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { FaTwitch } from 'react-icons/fa';
const Login = ({ setToken }) => {
  const notifyError = () => toast.error("Nepavyko prisijungti");
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

  const onTwitchLogin = () => {
    const REACT_APP_TWITCH_CLIENT_ID = "035jbf60z40fm7t1mohvsma7ry8x0d"
    const REACT_APP_TWITCH_REDIRECT_URI = "http://localhost:3000/twitchRedirect"
    var twitchLoginURI = `https://id.twitch.tv/oauth2/authorize?client_id=${REACT_APP_TWITCH_CLIENT_ID}&response_type=code&scope=user:read:email&redirect_uri=${REACT_APP_TWITCH_REDIRECT_URI}`
    window.location.href = twitchLoginURI
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
            .email('Netinkamas el. paštas')
            .required('Privaloma'),
          password: Yup.string()
            .required('Privaloma')
            .min(8, 'Mažiausiai 8 raidės')
        })}
        onSubmit={async (values) => {
          onLogin(values)
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col items-center">
            <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Prisijunkite!</h1>
            <div className="mb-4">
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="El. paštas"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.email && <p className="text-red-500 mt-1 text-sm">{errors.email}</p>}
            </div>

            <div>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Slaptažodis"
                className=" w-64 border-2 border-purple-200 p-2 rounded-md"
              />
              {touched.password && <p className="text-red-500 mt-1 text-xs">{errors.password}</p>}
            </div>
            <div onClick={() => {navigate("/signup");}} className="cursor-pointer text-blue-500 underline text-sm mt-1">
              Neturi paskyros? Susikurk !
            </div>
            <div onClick={() => {navigate("/password/request");}} className="cursor-pointer text-blue-500 underline text-sm mt-2">
              Pamiršai salptažodį? Atsinaujink!
            </div>
            <button disabled={!isValid && !dirty} className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">Prisijungti</button>

            <div onClick={() => onTwitchLogin()} className=" w-64 cursor-pointer mt-4 bg-transparent text-center hover:bg-purple-400 text-purple-400 font-semibold hover:text-white py-1 px-2 border border-purple-400 hover:border-transparent rounded" >
            PRISIJUNGTI SU TWITCH <FaTwitch className="inline" />
            </div>
          </Form>
        )}
      </Formik>

      <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
    </div>
  )
}

export default Login