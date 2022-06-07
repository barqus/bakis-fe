import React, { useEffect } from 'react'

import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest } from '../utils/HandleRequest'
import { ToastContainer } from 'react-toastify';

// const server = "https://fillq-backend-test.azurewebsites.net"

const PasswordRedirect = ({ setToken }) => {

    useEffect(() => {
        const fetchActivate = async () => {
            // try {
            //     const twitchCode = new URLSearchParams(location.search).get("code")
            //     await GetRequest("/auth/confirm/" + twitchCode)
            //     // setToken(results.data.token);
            //     window.location.replace("/");
            // } catch {
            //     // clearToken()
            //     window.location.replace("/");
            // }
        };

        fetchActivate()
    }, []);
    const onReset = async (values) => {
        await PostRequest("/auth/reset", {
            email: values.email
        }, false)

        window.location.replace("/");
        // navigate("/")
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
                })}
                onSubmit={async (values) => {
                    onReset(values)
                }}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="flex flex-col items-center">
                        <h1 className="mb-2 p-2 font-bold text-purple-700 text-xl">Įveskite paskyros el. paštą</h1>
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

                        <button disabled={!isValid && !dirty} className={`mt-3 w-64  text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">Atnaujinti slaptažodį</button>

                    </Form>
                )}
            </Formik>

            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default PasswordRedirect