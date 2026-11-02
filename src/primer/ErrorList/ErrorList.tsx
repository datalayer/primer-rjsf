import {Box, Flash} from '@primer/react'
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
        {/* A Box drawn as Primer's heading: Primer 37 types no `sx` on Heading. */}
        <Box as="h3" sx={{fontSize: 3, fontWeight: 'semibold', m: 0}}>
          {translateString(TranslatableString.ErrorsLabel)}
        </Box>
        <>
          {errors.map((error, i: number) => {
            return (
              <Flash variant="danger" sx={{marginTop: 2}} key={i}>{error.stack}</Flash>
            );
          })}
        </>
      </Box>
    </Box>
  );
}
