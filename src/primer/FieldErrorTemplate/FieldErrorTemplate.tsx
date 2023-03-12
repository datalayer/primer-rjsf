import {Text} from "@primer/react";

import {
  errorId,
  FieldErrorProps,
  FormContextType,
  RJSFSchema,
  StrictRJSFSchema,
} from "@rjsf/utils";

/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: FieldErrorProps<T, S, F>) {
  const { errors = [], idSchema } = props;
  if (errors.length === 0) {
    return null;
  }
  const id = errorId<T>(idSchema);

  return (
    <div id={id}>
      {errors.map((error, i: number) => (
        <Text as="p" mb={1} sx={{fontSize: '12px', display: 'block', color: 'danger.fg'}} key={i}>&#x2022;{" " + error}</Text>
      ))}
    </div>
  );
}
