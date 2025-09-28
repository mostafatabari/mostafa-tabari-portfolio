import React from "react";
import Uploady from "@rpldy/uploady";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useContactForm } from "../../hooks/contactForm/useContactForm";
import type { CommentFormValues } from "../../hooks/contactForm/useContactForm";
import InputContact from "../inputContact/InputContact.tsx";
import TextareaContact from "../textareaContact/TextareaContact.tsx";
import AttachmentsContact from "../attachmentContact/AttachmentsContact.tsx";
import MessagePopupList from "../messagePopup/MessagePopupList.tsx";
import Icon from "../iconsSvg/IconsSvg.tsx";

/* Validation schema using Yup */
const validationSchema = yup.object().shape({
  name: yup.string().trim().required("Please fill out this field."),
  email: yup
    .string()
    .trim()
    .email("Invalid email")
    .required("Please fill out this field."),
  subject: yup.string().trim().required("Please fill out this field."),
  message: yup.string().trim().required("Please fill out this field."),
});

/* Wrapper providing Uploady context */
const ContactMe: React.FC = () => {
  return (
    <Uploady>
      <ContactMeForm />
    </Uploady>
  );
};

/* Main contact form component */
const ContactMeForm: React.FC = () => {
  /* Destructure hook values */
  const {
    files,
    popupErrors,
    setPopupErrors,
    ref,
    removeFile,
    handleCreateComment,
  } = useContactForm(10, 25);

  /* Initial form values */
  const initialValues: CommentFormValues = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };

  return (
    <div className="w-full max-w-7xl px-4 py-12 flex flex-col justify-center items-center">
      <h2 className="text-h1 text-black font-bold">Contact Me</h2>

      <p className="max-w-2xl mx-auto my-4 text-body text-center text-secondary">
        Have a question, want to collaborate, or just want to say hello?
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleCreateComment}
      >
        {() => (
          <Form className="w-full max-w-4xl px-8 py-4 mt-8 bg-light-sec border border-secondary-sec rounded-md flex flex-wrap gap-4">
            <InputContact
              title="Name *"
              type="text"
              name="name"
              placeHolder="Your full name"
              parentClassName="mt-2 w-full sm:flex-1"
            />{" "}

            <InputContact
              title="Email *"
              type="email"
              name="email"
              placeHolder="Your.email@example.com"
              parentClassName="mt-2 w-full sm:flex-1"
            />{" "}

            <InputContact
              title="Subject *"
              type="text"
              name="subject"
              placeHolder="What's this about?"
              parentClassName="w-full mt-2"
            />{" "}

            <TextareaContact
              title="Message *"
              name="message"
              placeHolder="Tell me about your project or question..."
            />{" "}

            <AttachmentsContact reft={ref} />
            
            <MessagePopupList
              messages={popupErrors}
              setMessages={setPopupErrors}
            />

            <ul className="w-full flex flex-col justify-center gap-2">
              {files.map((f) => (
                <li
                  key={f.id}
                  className="w-full pl-4 pr-2 py-4 rounded-sm bg-gray-100/50 dark:bg-gray-800/50 text-caption text-secondary flex items-center gap-5"
                >
                  <Icon
                    type="paperclip"
                    className="text-success text-caption"
                  />
                  {f.name} ({f.size} KB)
                  <button
                    className="text-error text-body pr-4 ml-auto"
                    title="Remove"
                    onClick={() => removeFile(f.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              className="w-full h-14 rounded-md mb-4 text-white bg-primary text-body cursor-pointer hover:bg-blue-600 duration-300"
            >
              Send Message
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactMe;
