import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import { ThemeProvider, Box } from "@primer/react";
import Form from "./../index";

const schema: RJSFSchema = {
  title: "Todo Example",
  type: "object",
  required: [
    "title"
  ],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    hello: {type: "string", title: "Hello", default: "How are you?"},
    details: {type: "string", title: "Details", default: "Roundhouse kicking asses since 1940"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const uiSchema: RJSFSchema = {
  bio: {
    "ui:widget": "textarea"
  }
};

const FormExample1 = () => {
  return (
    <ThemeProvider>
      <Box m={5}>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={({ formData }, e) => {
            console.log("submitted formData", formData);
            console.log("submit event", e);
            window.alert("Form submitted");
          }}
        />
      </Box>
    </ThemeProvider>
  )
}

export default FormExample1;
