import React from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { PostRequest, UpdateRequest } from '../../../utils/HandleRequest'
import { ToastContainer, toast } from 'react-toastify';
import useToken from '../../useToken'
import 'react-toastify/dist/ReactToastify.css';

const ParticipantForm = ({ setShowForm, setParticipants, participants, notifySuccess, isEditing, editingParticipant }) => {
    const notifyError = (errMsg = "Nepavyko pridėti dalyvio") => toast.error(errMsg);
    const { token } = useToken();

    const onCreate = async (values) => {
        await PostRequest("/participants/", values, token)
            .then((response) => {
                if (response == null) {
                    notifyError()
                } else if (response.status !== 201) {
                    notifyError(response.data.message)
                }
                else {
                    notifySuccess()
                    setParticipants([...participants, response.data.result[0]]);
                    setShowForm(false)
                }
            })
    }

    const onUpdate = async (values) => {
        await UpdateRequest("/participants/" + editingParticipant.id, values, token)
            .then((response) => {
                if (response == null) {
                    notifyError()
                } else if (response.status !== 201) {
                    notifyError(response.data.message)
                }
                else {
                    notifySuccess()
                    let objIndex = participants.findIndex((obj => obj.id === response.data.updatedParticipant[0].id));
                    participants[objIndex] = response.data.updatedParticipant[0]
                    setParticipants(participants);
                    setShowForm(false)
                }
            })
    }

    return (
        <div className=" mx-16 mb-16 mt-8 px-6 rounded-md text-black">
            <Formik
                initialValues={isEditing ?
                    {
                        name: editingParticipant.name,
                        surname: editingParticipant.surname,
                        nickname: editingParticipant.nickname,
                        description: editingParticipant.description,
                        summoner_name: editingParticipant.summoner_name,
                        twitch_channel: editingParticipant.twitch_channel,
                        instagram: editingParticipant.instagram,
                        twitter: editingParticipant.twitter,
                        youtube: editingParticipant.youtube,
                    } :
                    {
                        name: '',
                        surname: '',
                        nickname: '',
                        description: '',
                        summoner_name: '',
                        twitch_channel: '',
                        instagram: '',
                        twitter: '',
                        youtube: '',
                    }}
                validationSchema={Yup.object({
                    name: Yup.string()
                        .required('Privalomas laukas'),
                    surname: Yup.string()
                        .required('Privalomas laukas'),
                    nickname: Yup.string()
                        .required('Privalomas laukas'),
                    summoner_name: Yup.string()
                        .required('Privalomas laukas'),
                    twitch_channel: Yup.string()
                        .required('Privalomas laukas'),
                })}
                onSubmit={async (values) => {
                    if (isEditing) {
                        onUpdate(values)
                    } else {
                        onCreate(values)
                    }

                }}
            >
                {({ errors, touched, isValid, dirty }) => (
                    <Form className="flex flex-col w-96">
                        <div className="flex text-white mb-1">
                        Vardas
                        </div>
                        <div className="mb-4">
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="Jonas"
                            />
                            {touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                        Pavardė
                        </div>
                        <div className="mb-4">
                            <Field
                                id="surname"
                                name="surname"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="Jonaitis"
                            />
                            {touched.surname && <p className="text-red-500 text-sm">{errors.surname}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Slapyvardis
                        </div>
                        <div className="mb-4">
                            <Field
                                id="nickname"
                                name="nickname"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="JoJo"
                            />
                            {touched.nickname && <p className="text-red-500 text-sm">{errors.nickname}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Apie dalyvį
                        </div>
                        <div className="mb-4">
                            <Field
                                id="description"
                                name="description"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="Profesionalus žaidėjas 3 metus. Žaidžia europos antroje lygoje."
                                component="textarea"
                            />
                            {touched.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            FillQ LoL paskyra
                        </div>
                        <div className="mb-4">
                            <Field
                                id="summoner_name"
                                name="summoner_name"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="reshis"
                            />
                            {touched.summoner_name && <p className="text-red-500 text-sm">{errors.summoner_name}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Twitch paskyra
                        </div>
                        <div className="mb-4">
                            <Field
                                id="twitch_channel"
                                name="twitch_channel"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="LEC"
                            />
                            {touched.twitch_channel && <p className="text-red-500 text-sm">{errors.twitch_channel}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Instagram
                        </div>
                        <div className="mb-4">
                            <Field
                                id="instagram"
                                name="instagram"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="JojoIg"
                            />
                            {touched.instagram && <p className="text-red-500 text-sm">{errors.instagram}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Twitter
                        </div>
                        <div className="mb-4">
                            <Field
                                id="twitter"
                                name="twitter"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="twtjojo"
                            />
                            {touched.twitter && <p className="text-red-500 text-sm">{errors.twitter}</p>}
                        </div>
                        <div className="flex text-white mb-1">
                            Youtube
                        </div>
                        <div className="mb-4">
                            <Field
                                id="youtube"
                                name="youtube"
                                type="text"
                                className="w-full border-2 border-purple-200 p-2 rounded-md"
                                placeHolder="ytjojo"
                            />
                            {touched.youtube && <p className="text-red-500 text-sm">{errors.youtube}</p>}
                        </div>
                        <button disabled={!isValid && !dirty} className={`mt-3 text-white p-2 rounded-md text ${(isValid && dirty) ? "bg-green-500" : "bg-gray-500 cursor-default"}`}
                            type="submit">{isEditing ? "Atnaujinti" : "Sukurti"}</button>
                    </Form>
                )}

            </Formik>
            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default ParticipantForm