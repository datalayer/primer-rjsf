import { useState } from "react";
import { ThemeProvider, Box, BaseStyles } from "@primer/react";
import { RJSFSchema } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import Form from "./../index";

type Todo = {
  title: string;
  type: string;
  required: [string];
  properties: Record<string, any>;
}

const schema: RJSFSchema & Todo = {
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

const FormExample = () => {
  const [formData, setFormData] = useState<Partial<typeof schema>>({
    title: "Todo Example 2"
  });
  return (
    <ThemeProvider>
      <BaseStyles>
        <Box m={5}>
          <Form
            formData={formData}
            schema={schema}
            uiSchema={uiSchema}
            validator={validator}
            onChange={({ formData }, e) => {
              setFormData(formData);
            }}
            onSubmit={({ formData }, e) => {
              console.log("submitted formData", formData);
              console.log("submit event", e);
              window.alert("Form submitted");
            }}
          />
        </Box>
        {JSON.stringify(formData)}
      </BaseStyles>
    </ThemeProvider>
  )
}

export default FormExample;
