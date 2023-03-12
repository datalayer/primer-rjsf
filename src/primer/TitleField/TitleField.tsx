import {Box, Heading} from "@primer/react";
import Divider from "@mui/material/Divider";
import {
  FormContextType,
  TitleFieldProps,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/** The `TitleField` is the template to use to render the title of a field
 *
 * @param props - The `TitleFieldProps` for this component
 */
export default function TitleField<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ id, title }: TitleFieldProps<T, S, F>) {
  return (
    <Box id={id} my={2}>
      <Heading as="h5" sx={{fontSize: 1, borderBottom: '1px solid', borderColor: 'border.default', paddingBottom: 1}}>{title}</Heading>
    </Box>
  );
}
