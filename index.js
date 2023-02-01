const {
  input,
  div,
  text,
  script,
  domReady,
  text_attr,
} = require("@saltcorn/markup/tags");
const range_filter = require("./date-range-filter");
const base_headers = `/plugins/public/flatpickr-date@${
  require("./package.json").version
}`;
const headers = [
  {
    script: `${base_headers}/flatpickr.min.js`,
  },
  {
    script: `${base_headers}/l10n/es.min.js`,
  },
  {
    script: `${base_headers}/l10n/pt.min.js`,
  },
  {
    script: `${base_headers}/l10n/fr.min.js`,
  },
  {
    script: `${base_headers}/l10n/it.min.js`,
  },
  {
    script: `${base_headers}/l10n/de.min.js`,
  },
  {
    script: `${base_headers}/l10n/ru.min.js`,
  },
  {
    css: `${base_headers}/flatpickr.min.css`,
  },
];

const flatpickr = {
  type: "Date",
  isEdit: true,
  configFields: [
    {
      name: "allow_input",
      label: "Allow input",
      type: "Bool",
    },
    {
      name: "day_only",
      label: "Only day",
      type: "Bool",
      //sublabel: "Do not pick time",
    },
    {
      name: "minDate",
      label: "Min date (Ex: 2022-10-1 or today)",
      type: "String",
    },
    // { Lo dejo comentado para mejoras a futuro
    //   name: "maxDate",
    //   label: "Max date (Ex: 2022-10-1 or today)",
    //   type: "String"
    // },
    {
      name: "default_now",
      label: "Default to now",
      type: "Bool",
    },
    {
      name: "locale",
      label: "Language (locale) available: es, pt, fr, it, ru, de",
      type: "String",
    },
    {
      name: "dateFormat",
      label: "Date format",
      required: true,
      type: "String",
      default: "Y-m-d H:i",
      sublabel: `<a href="https://flatpickr.js.org/formatting/">Formatting options</a>`,
    },
  ],
  run: (nm, v, attrs, cls) => {
    const rndid = Math.floor(Math.random() * 16777215).toString(16);
    const opts = {
      enableTime: !attrs.day_only,
      allowInput: attrs.allow_input,
      dateFormat: "Z",
      altInput: true,
      altFormat: attrs.dateFormat || (attrs.day_only ? "Y-m-d" : "Y-m-d H:i"),
      minDate: attrs.minDate,
      //maxDate: attrs.maxDate,
      locale: attrs.locale,
      defaultDate: attrs.default_now && !v ? new Date() : undefined,
    };
    return (
      input({
        type: "text",
        class: ["form-control", cls],
        name: text_attr(nm),
        disabled: attrs.disabled,
        id: `input${text_attr(nm)}${rndid}`,
        ...(typeof v !== "undefined" &&
          v !== null && {
            value: text_attr(
              typeof v === "string" ? v : v ? v.toISOString() : undefined
            ),
          }),
      }) +
      script(
        domReady(
          `$('#input${text(nm)}${rndid}').flatpickr(${JSON.stringify(opts)});`
        )
      )
    );
  },
};

module.exports = {
  sc_plugin_api_version: 1,
  fieldviews: { flatpickr },
  plugin_name: "flatpickr-date",
  headers,
  viewtemplates: [range_filter],
};
