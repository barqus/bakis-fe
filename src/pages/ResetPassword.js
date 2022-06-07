import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import { FaTwitch } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';

const ResetPassword = ({ setToken }) => {
    const notifyError = () => toast.error("Nepavyko prisijungti");
    let navigate = useNavigate();
    const location = useLocation();

    const onReset = async (values) => {
        const twitchCode = new URLSearchParams(location.search).get("code")
        
        let decodedToken = jwt_decode(twitchCode);  
            // return decodedToken.user_id;
        console.log("decodedToken",decodedToken)
        var response = await PostRequest("/auth/new_password", {
            password: values.password,
            id: decodedToken.user_id,
        }, false)
        console.log(response)
        // if (response.data.message != null) {
        //   notifyError()
        // } else {
        //   setToken(response.data.token);
        //   window.location.replace("/");
        // }
        navigate("/")
    }

    return (
        <div className="bg-white m-16 px-6 py-6 w-80 rounded-md block ml-auto mr-auto">
            <Formik
                initialValues={{
                    password: '',
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .required('Privaloma')
                        .min(8, 'Mažiausiai 8 simboliai')
                        .max(25, 'Daugiausiai 25 simboliai'),
                    passwordConfirmation: Yup.string()
                        .required('Privaloma')
                        .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti')
                })}
                onSubmit={async (values) => {
                    onReset(values)
                }}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="flex flex-col items-center">
                        <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Atnaujinkite salptažodį</h1>

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
                        <button disabled={!isValid && !dirty} className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">Atnaujinti</button>

                    </Form>
                )}
            </Formik>

            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default ResetPassword