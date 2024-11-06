import { prettyPrintJson } from "pretty-print-json";

const elem = document.getElementById("json-viewer");

fetch("http://localhost:3000/api/info/105778").then(async (response) => {
  const data = await response.json();

  if (elem)
    elem.innerHTML = prettyPrintJson.toHtml({
      ...data,
      recommendations: [],
    });
});
