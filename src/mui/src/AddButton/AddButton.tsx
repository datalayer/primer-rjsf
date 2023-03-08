import {
  FormContextType,
  IconButtonProps,
  RJSFSchema,
  StrictRJSFSchema,
  TranslatableString,
} from "@rjsf/utils";
import { Button } from "@primer/react";
import { PlusIcon } from '@primer/octicons-react';

export default function AddButton<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>({ uiSchema, registry, ...props }: IconButtonProps<T, S, F>) {
  const { translateString } = registry;
  return (
    <Button variant="primary" leadingIcon={PlusIcon} {...props}>
      {translateString(TranslatableString.AddItemButton)}
    </Button>
  );
}
