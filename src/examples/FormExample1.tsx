import Form from "./../index";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";

const schema: RJSFSchema = {
  title: "Todo",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    hello: {type: "string", title: "Hello", default: "How are you?"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const FormExample1 = () => {
  return (
    <Form
      schema={schema}
      validator={validator}
      onSubmit={({ formData }, e) => {
        console.log("submitted formData", formData);
        console.log("submit event", e);
        window.alert("Form submitted");
      }}
    />
  )
}

export default FormExample1;
