import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetRequest } from '../../utils/HandleRequest'
import { UpdateRequest } from '../../utils/HandleRequest'
import useToken from '../useToken'

const ManageUsers = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const notifySuccess = () => toast.success("Pavyko!");
    const notifyError = () => toast.error("Sistemos klaida...");
    const { token } = useToken();

    useEffect(() => {
        const fetchQuestions = async () => {
            var results = await GetRequest("/users/all", token)
            if (results.message != null) {
                setUsers([])
            } else {
                setUsers(results.data)
            }
            setLoading(false)
            console.log(users)
        };
        fetchQuestions()
        console.log()
    }, [])

    const handleChange = async (id, role) => {
        let newRole = ""
        if (role === "admin") {
            newRole = "member"
        } else {
            newRole = "admin"
        }
        await UpdateRequest("/users/role/" + id, {role: newRole}, token)
        .then((response) => {
            if (response == null) {
                notifyError()
            } else if (response.status !== 201) {
                notifyError(response.data.message)
            }
            else {
                notifySuccess()
                const usersModified = users.map((element) => {
                    if (element.id === id) {
                        if (element.role === "admin") {
                            element.role = "member"
                        } else {
                            element.role = "admin"
                        }
                    }
                    return element;
                });
                console.log(users,usersModified)
                setUsers(usersModified)
            }
        })
    };

    return (
        <div>

            <div className="mt-6 shadow overflow-hidden border-2 border-purple-500 bg-opacity-10 sm:rounded-lg"
                style={{
                    background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                }}>
                <table className="divide-y divide-purple-500 text-white">
                    <thead className="font-bold bg-gradient-to-r from-purple-800 to-green-500 ">
                        <tr >
                            <th scope="col" className="px-6 py-3 text-center text-base  uppercase tracking-wider">
                                Slapyvardis
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-base  uppercase tracking-wider">
                                El. paštas
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-base  uppercase tracking-wider">
                                Aktyvuotas?
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-base  uppercase tracking-wider">
                                Administratorius?
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{
                        background: "linear-gradient(120deg,#722f818a 0%, rgba(3, 71, 57, 0.2) 100%)",
                    }} className="bg-white bg-opacity-10   text-base font-semibold divide-y divide-purple-500">
                        {!loading ?
                            <>
                                {users.map((item) => (
                                    <tr>
                                        <td className="px-6 py-4 whitespace-nowrap text-left">
                                            {item.username}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            {item.activated ? "Taip" : "Ne"}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div class="block">
                                                <div class="mt-2">
                                                    <label class="inline-flex items-center">
                                                        <input type="checkbox" class="w-6 h-6 text-green-600 border-0 rounded-md focus:ring-0"
                                                            onChange={() => {
                                                                if (window.confirm(`Ar tikrai norite pakeisti ${item.username} teises į ${item.role === "admin" ?
                                                                        "paprasto naudotojo" :
                                                                        "administartoriaus"
                                                                    }?`))
                                                                    handleChange(item.id, item.role)
                                                            }}
                                                            checked={
                                                                item.role === "admin" ?
                                                                    true :
                                                                    false
                                                            } />
                                                    </label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </>
                            : <div>Kraunama...</div>
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer className="text-xl text-purple-600" position="bottom-right" />
        </div>
    )
}

export default ManageUsers