import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { DatePickerField } from "../../DatePickerField";
import { PostRequest, UpdateRequest } from "../../../utils/HandleRequest";
import { ToastContainer, toast } from "react-toastify";
import useToken from "../../useToken";
import "react-toastify/dist/ReactToastify.css";

const QuestionForm = ({
  setShowForm,
  setQuestions,
  questions,
  notifySuccess,
  isEditing,
  editingQuestion,
}) => {
  const notifyError = (errMsg = "Nepavyko sukurti klausimo") =>
    toast.error(errMsg);
  const { token } = useToken();

  const onCreate = async (values) => {
    await PostRequest("/questions/", values, token).then((response) => {
      if (response == null) {
        notifyError();
      } else if (response.status !== 201) {
        notifyError(response.data.message);
      } else {
        notifySuccess();
        setQuestions([...questions, response.data.result[0]]);
        setShowForm(false);
      }
    });
  };

  const onUpdate = async (values) => {
    await UpdateRequest("/questions/" + editingQuestion.id, values, token).then(
      (response) => {
        if (response == null) {
          notifyError();
        } else if (response.status !== 201) {
          notifyError(response.data.message);
        } else {
          notifySuccess();
          let objIndex = questions.findIndex(
            (obj) => obj.id === response.data[0].id
          );
          questions[objIndex] = response.data[0];
          setQuestions(questions);
          setShowForm(false);
        }
      }
    );
  };

  return (
    <div className=" mx-16 mb-16 mt-8 px-6 rounded-md text-black">
      <Formik
        initialValues={
          isEditing
            ? {
                question: editingQuestion.question,
              }
            : {
                question: "",
              }
        }
        validationSchema={Yup.object({
          question: Yup.string().required("Privalomas laukas"),
        })}
        onSubmit={async (values) => {
          if (isEditing) {
            onUpdate(values);
          } else {
            onCreate(values);
          }
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="flex flex-col w-96">
            <div className="flex text-white mb-1">Klausimas</div>
            <div className="mb-4">
              <Field
                id="question"
                name="question"
                type="text"
                className="w-full border-2 border-purple-200 p-2 rounded-md"
                placeHolder="Labiausiai patinkantis LoL veikėjas?"
                component="textarea"
              />
              {touched.question && (
                <p className="text-red-500 text-sm">{errors.question}</p>
              )}
            </div>
            <button
              disabled={!isValid && !dirty}
              className={`mt-3 text-white p-2 rounded-md text ${
                isValid && dirty ? "bg-green-500" : "bg-gray-500 cursor-default"
              }`}
              type="submit"
            >
              {isEditing ? "Atnaujinti" : "Sukurti"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer
        className="text-xl text-purple-600"
        position="bottom-right"
      />
    </div>
  );
};

export default QuestionForm;
