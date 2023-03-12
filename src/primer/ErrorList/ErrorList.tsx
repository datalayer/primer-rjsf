import {Box, Flash, Heading} from '@primer/react'
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import {
  ErrorListProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";

/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ errors, registry }: ErrorListProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Box mb={3} sx={{borderWidth: 1, borderStyle: 'solid', borderColor: 'border.default', borderRadius: 2}}>
      <Box p={3}>
        <Heading as="h3" sx={{fontSize: 3}}>
          {translateString(TranslatableString.ErrorsLabel)}
        </Heading>
        <>
          {errors.map((error, i: number) => {
            return (
              <Flash variant="danger" sx={{marginTop: 2}}>{error.stack}</Flash>
            );
          })}
        </>
      </Box>
    </Box>
  );
}
