import v8Validator, { customizeValidator } from "@rjsf/validator-ajv8";
import v6Validator from "@rjsf/validator-ajv6";
import localize_es from "ajv-i18n/localize/es";
import Ajv2019 from "ajv/dist/2019.js";
import Ajv2020 from "ajv/dist/2020.js";
import { Theme as PrimerTheme } from "./primer";
import Playground from "./playground/Playground";

const esV8Validator = customizeValidator({}, localize_es);
const AJV8_2019 = customizeValidator({ AjvClass: Ajv2019 });
const AJV8_2020 = customizeValidator({ AjvClass: Ajv2020 });

const validators = {
  AJV8: v8Validator,
  AJV8_es: esV8Validator,
  AJV8_2019,
  AJV8_2020,
  'AJV6 (deprecated)': v6Validator,
};

const themes = {
  default: {
    stylesheet:
      "//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css",
    theme: {}
  },
  primer: {
    stylesheet: "",
    theme: PrimerTheme,
    subthemes: {
      "light": {},
      "light_high_contrast": {},
      "light_colorblind": {},
      "light_tritanopia": {},
      "dark": {},
      "dark_dimmed": {},
      "dark_high_contrast": {},
      "dark_colorblind": {},
      "dark_tritanopia": {},
    }
  },
};

function App() {
  return (
    <>
      <Playground themes={themes} validators={validators} />
    </>
  )
}

export default App
