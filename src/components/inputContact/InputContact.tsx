import { Field, ErrorMessage } from "formik";

/* Props interface for InputContact component */
interface InputContactProps {
  title: string;
  type: string;
  name: string;
  placeHolder: string;
  parentClassName?: string;
}

/* InputContact component wraps a Formik Field with label and error message */
const InputContact: React.FC<InputContactProps> = ({
  title,
  type,
  name,
  placeHolder,
  parentClassName,
}) => {
  return (
    <div className={parentClassName}>
      <h3 className="text-caption text-primary mb-1.5">{title}</h3>

      {/* Formik Field binds input to form state */}
      <Field
        className="w-full h-12 border border-secondary rounded-md p-2 indent-2 bg-secondary text-primary placeholder:text-body"
        type={type}
        name={name}
        placeholder={placeHolder}
      />

      {/* Displays validation error for this field */}
      <ErrorMessage
        name={name}
        component="div"
        className="mt-2 text-error text-overline"
      />
    </div>
  );
};

export default InputContact;
