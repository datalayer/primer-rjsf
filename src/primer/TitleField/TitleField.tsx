import {Box} from "@primer/react";
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
      <Box as="h5" sx={{fontSize: 1, fontWeight: 'semibold', m: 0, borderBottom: '1px solid', borderColor: 'border.default', paddingBottom: 1}}>{title}</Box>
    </Box>
  );
}
