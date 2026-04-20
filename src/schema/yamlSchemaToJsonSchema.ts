import { RJSFSchema } from "@rjsf/utils";

type JsonObject = Record<string, unknown>;

const PRIMITIVE_TYPES = new Set([
  "string",
  "number",
  "integer",
  "boolean",
  "null",
]);

const LITERAL_ARRAY_KEYS = new Set(["required", "enum", "type", "examples"]);

function isJsonObject(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function inferEnumType(values: unknown[]): string | undefined {
  const first = values[0];
  if (typeof first === "string") return "string";
  if (typeof first === "boolean") return "boolean";
  if (typeof first === "number") return Number.isInteger(first) ? "integer" : "number";
  return undefined;
}

function convertSchemaNode(node: unknown, parentKey?: string): unknown {
  if (typeof node === "string") {
    if (PRIMITIVE_TYPES.has(node)) {
      return { type: node };
    }
    return { type: "string", default: node };
  }

  if (Array.isArray(node)) {
    if (
      (parentKey && LITERAL_ARRAY_KEYS.has(parentKey)) ||
      node.every(item => !isJsonObject(item) && !Array.isArray(item))
    ) {
      return node;
    }
    return node.map(item => convertSchemaNode(item, parentKey));
  }

  if (!isJsonObject(node)) {
    return node;
  }

  const converted: JsonObject = {};

  for (const [key, value] of Object.entries(node)) {
    if (key === "properties" && isJsonObject(value)) {
      const convertedProperties: JsonObject = {};
      const requiredFromProperties: string[] = [];

      for (const [propName, propSchema] of Object.entries(value)) {
        const convertedProperty = convertSchemaNode(propSchema, propName);
        if (isJsonObject(convertedProperty)) {
          if (convertedProperty.required === true) {
            requiredFromProperties.push(propName);
            const { required, ...rest } = convertedProperty;
            convertedProperties[propName] = rest;
          } else {
            convertedProperties[propName] = convertedProperty;
          }
        } else {
          convertedProperties[propName] = convertedProperty;
        }
      }

      converted.properties = convertedProperties;
      if (requiredFromProperties.length > 0) {
        const existingRequired = Array.isArray(node.required)
          ? (node.required as unknown[])
              .filter(item => typeof item === "string")
              .map(item => item as string)
          : [];
        converted.required = Array.from(
          new Set([...existingRequired, ...requiredFromProperties]),
        );
      }
      continue;
    }

    if (key === "items") {
      converted.items = convertSchemaNode(value, key);
      continue;
    }

    converted[key] = convertSchemaNode(value, key);
  }

  if (
    !converted.type &&
    Array.isArray(converted.enum) &&
    converted.enum.length > 0
  ) {
    const enumType = inferEnumType(converted.enum as unknown[]);
    if (enumType) {
      converted.type = enumType;
    }
  }

  if (converted.properties && !converted.type) {
    converted.type = "object";
  }

  return converted;
}

/**
 * Convert a YAML-friendly schema object into a JSON Schema object.
 *
 * The converter is intentionally permissive:
 * - supports primitive shorthand values for properties (`name: string`)
 * - supports property-level `required: true`
 * - preserves standard JSON Schema keys as-is
 */
export function yamlSchemaToJsonSchema(schema: unknown): RJSFSchema {
  const converted = convertSchemaNode(schema);
  if (!isJsonObject(converted)) {
    return {
      type: "object",
      properties: {},
    };
  }

  return converted as RJSFSchema;
}
