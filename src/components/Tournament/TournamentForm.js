import React, { useContext } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { DatePickerField } from '../DatePickerField'
import { PostRequest } from '../../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../useToken'
import UserContext from '../UserContext';

const TournamentForm = ({ setShowForm, setTournaments, tournaments, notifySuccess }) => {
    const notifyError = () => toast.error("Couldn't create tournament");
    const { token } = useToken();
    const user = useContext(UserContext);

    const onCreate = async (values) => {
        var pair1 = { created_by_user: user.id }
        values = { ...values, ...pair1 }
        var pair2 = { minimum_players: 1 }
        values = { ...values, ...pair2 }

        var response = await PostRequest("/tournaments/", values, token)
        if (response == null) {
            notifyError()
        } else {
            notifySuccess()
            console.log(response.result[0])
            setTournaments([...tournaments, response.result[0]]);
            setShowForm(false)
        }
    }

    return (
        <div className=" mx-16 mb-16 mt-8 px-6 rounded-md">
            <Formik
                initialValues={{
                    name: '',
                    type: '',
                    maximum_players: '',
                    region: 'euw',
                    starting_date: '',
                    registration_until: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Required'),
                    type: Yup.string().required().oneOf(["Brackets", "Leaderboard"], 'One is required to select'),
                    maximum_players: Yup.number().required('Required'),
                    starting_date: Yup.date().required('Please select date'),
                    registration_until: Yup.date().max(Yup.ref('starting_date'), 'Must be earlier than starting date').required('Please select date'),
                })}
                onSubmit={async (values) => {
                    onCreate(values)
                }}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="flex flex-col w-96">
                        <div className="mb-2">
                            Tournament Name
                        </div>
                        <div className="mb-4">
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Best Of One Tournament"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                            />
                            {touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="w-full" role="group" aria-labelledby="my-radio-group">
                            <div className="my-2">
                                Tournament Type
                            </div>
                            <div className="flex justify-around">
                                <label>
                                    <Field className="mx-2" type="radio" name="type" value="Brackets" />
                                    Brackets
                                </label>
                                <label>
                                    <Field className="mx-2" type="radio" name="type" value="Leaderboard" />
                                    Leaderboard
                                </label>
                            </div>

                            {touched.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                        </div>

                        <div className="flex justify-between my-4">
                            <div className="w-5/12">
                                <div className="my-2">
                                    Maximum Players
                                </div>
                                <Field
                                    id="maximum_players"
                                    name="maximum_players"
                                    type="number"
                                    placeholder="Min-2 Max-300"
                                    min="2"
                                    max="300"
                                    className="w-full border-2 border-purple-200 p-2 rounded-md text-right"
                                />
                                {touched.maximum_players && <p className="text-red-500 text-sm">{errors.maximum_players}</p>}
                            </div>
                            <div className="w-5/12">
                                <div className="my-2">
                                    Tournament Region
                                </div>
                                <Field as="select" name="region" className="w-full border-2 border-purple-200 p-2 rounded-md text-right">
                                    <option value="euw">EUW</option>
                                    <option value="eune">EUNE</option>
                                    <option value="na">NA</option>
                                </Field>
                            </div>
                        </div>



                        <div className="flex justify-between mb-4">
                            <div className="w-5/12">
                                <div className="my-2">
                                    Registration until
                                </div>
                                <DatePickerField name="registration_until" className="w-full border-2 border-purple-200 p-2 rounded-md text-right" />
                                {touched.registration_until && <p className="text-red-500 text-sm">{errors.registration_until}</p>}
                            </div>
                            <div className="w-5/12">
                                <div className="my-2">
                                    Starting Date
                                </div>
                                <DatePickerField name="starting_date" className="w-full border-2 border-purple-200 p-2 rounded-md text-right" />
                                {touched.starting_date && <p className="text-red-500 text-sm">{errors.starting_date}</p>}
                            </div>
                        </div>

                        <button disabled={!isValid && !dirty} className={`mt-3 text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-purple-500" : "bg-gray-500 cursor-default"}`} type="submit">CREATE</button>
                    </Form>
                )}

            </Formik>
            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default TournamentForm