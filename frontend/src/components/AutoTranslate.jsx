
import React from "react";
import { useLanguage } from "../context/LanguageContext";

const TEXT_ATTRIBUTES = [
  "placeholder",
  "title",
  "aria-label",
  "alt",
];

function AutoTranslate({ children }) {
  const { t, language } = useLanguage();

  const translateText = (value) => {
    if (typeof value !== "string" || language !== "HI") {
      return value;
    }

    const trimmed = value.trim();

    if (!trimmed) return value;

    const translated = t(trimmed);

    if (translated === trimmed) return value;

    const leading = value.match(/^\s*/)?.[0] || "";
    const trailing = value.match(/\s*$/)?.[0] || "";

    return leading + translated + trailing;
  };

  const translateNode = (node) => {
    if (typeof node === "string") {
      return translateText(node);
    }

    if (typeof node === "number" || node == null) {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map((child, index) => (
        <React.Fragment key={index}>
          {translateNode(child)}
        </React.Fragment>
      ));
    }

    if (!React.isValidElement(node)) {
      return node;
    }

    const translatedChildren = translateNode(
      node.props.children
    );

    const isNativeElement = typeof node.type === "string";

    if (!isNativeElement) {
      return React.cloneElement(
        node,
        undefined,
        translatedChildren
      );
    }

    const updatedProps = {};

    TEXT_ATTRIBUTES.forEach((attribute) => {
      const value = node.props[attribute];

      if (typeof value === "string") {
        updatedProps[attribute] = translateText(value);
      }
    });

    return React.cloneElement(
      node,
      updatedProps,
      translatedChildren
    );
  };

  return <>{translateNode(children)}</>;
}

export default AutoTranslate;
