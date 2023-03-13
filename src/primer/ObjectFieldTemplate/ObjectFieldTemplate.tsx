import {Box} from "@primer/react";
import {
  FormContextType,
  ObjectFieldTemplateProps,
  RJSFSchema,
  StrictRJSFSchema,
  canExpand,
  descriptionId,
  getTemplate,
  getUiOptions,
  titleId,
} from "@rjsf/utils";

/** The `ObjectFieldTemplate` is the template to use to render all the inner properties of an object along with the
 * title and description if available. If the object is expandable, then an `AddButton` is also rendered after all
 * the properties.
 *
 * @param props - The `ObjectFieldTemplateProps` for this component
 */
export default function ObjectFieldTemplate<
  T = any,
  S extends StrictRJSFSchema = RJSFSchema,
  F extends FormContextType = any
>(props: ObjectFieldTemplateProps<T, S, F>) {
  const {
    description,
    title,
    properties,
    required,
    disabled,
    readonly,
    uiSchema,
    idSchema,
    schema,
    formData,
    onAddClick,
    registry,
  } = props;
  const uiOptions = getUiOptions<T, S, F>(uiSchema);
  const TitleFieldTemplate = getTemplate<"TitleFieldTemplate", T, S, F>(
    "TitleFieldTemplate",
    registry,
    uiOptions
  );
  const DescriptionFieldTemplate = getTemplate<
    "DescriptionFieldTemplate",
    T,
    S,
    F
  >("DescriptionFieldTemplate", registry, uiOptions);
  // Button templates are not overridden in the uiSchema
  const {
    ButtonTemplates: { AddButton },
  } = registry.templates;
  return (
    <>
      {(uiOptions.title || title) && (
        <TitleFieldTemplate
          id={titleId<T>(idSchema)}
          title={title}
          required={required}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      {(uiOptions.description || description) && (
        <DescriptionFieldTemplate
          id={descriptionId<T>(idSchema)}
          description={uiOptions.description || description!}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
      <Box sx={{display: 'flex', width: '100%', flexDirection: 'column', flexFlow: 'row wrap'}} style={{ marginTop: "10px" }}>
        {properties.map((element, index) =>
          // Remove the <Grid> if the inner element is hidden as the <Grid>
          // itself would otherwise still take up space.
          element.hidden ? (
            element.content
          ) : (
            <Box sx={{flexBasis: '100%', flexGrow: 0, maxWidth: '100%'}}
              key={index}
              mb={1}
            >
              {element.content}
            </Box>
          )
        )}
        {canExpand<T, S, F>(schema, uiSchema, formData) && (
          <Box sx={{display: 'flex', width: '100%', flexFlow: 'row wrap'}} justifyContent="flex-end">
            <Box sx={{flexBasis: 0, flexGrow: 1, maxWidth: '100%'}}>
              <AddButton
                className="object-property-expand"
                onClick={(e:any) => {
                  e.preventDefault();
                  onAddClick(schema)();
                }}
                disabled={disabled || readonly}
                uiSchema={uiSchema}
                registry={registry}
              />
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
}
