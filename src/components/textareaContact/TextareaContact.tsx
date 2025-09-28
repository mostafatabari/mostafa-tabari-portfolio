import { Field, ErrorMessage } from "formik";

interface TextareaContactProps {
  title: string;    
  name: string;    
  placeHolder: string; 
}

function TextareaContact({
  title,
  name,
  placeHolder,
}: TextareaContactProps) {
  return (
    <div className="w-full mt-2">

      <h3 className="text-caption text-primary mb-1.5">{title}</h3>

      {/* Formik textarea field: binds the form state using 'name' */}
      <Field
        as="textarea"
        name={name}
        placeholder={placeHolder}
        className="w-full min-h-40 border border-secondary rounded-md p-2 indent-2 bg-secondary text-primary placeholder:text-body"
      />

      {/* Displays validation error messages for this field */}
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 text-error text-overline"
      />
    </div>
  );
}

export default TextareaContact;
