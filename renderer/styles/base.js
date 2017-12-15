import css from "styled-jsx/css";

export default css`
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    line-height: 1.6;
  }

  a {
    color: var(--brand-color);
    text-decoration: none;
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  a:active,
  a:hover {
    outline-width: 0;
  }

  small {
    font-size: 80%;
    color: rgba(0, 0, 0, 0.6);
  }

  img {
    border-style: none;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    font: inherit;
    margin: 0;
  }

  button,
  input {
    overflow: visible;
  }

  button,
  select {
    text-transform: none;
  }

  [type="reset"],
  [type="submit"],
  button,
  html [type="button"] {
    -webkit-appearance: button;
  }

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }

  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  html {
    font: 112.5%/1.45em sans-serif;
    box-sizing: border-box;
  }

  * {
    box-sizing: inherit;
  }

  *:before {
    box-sizing: inherit;
  }

  *:after {
    box-sizing: inherit;
  }

  body {
    color: hsla(0, 0%, 0%, 0.8);
    font-family: sans-serif;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
  }

  img {
    max-width: 100%;
    margin: 0 0 1.45rem 0;
    padding: 0;
  }

  ul {
    padding: 0;
    margin: 0 0 1.45rem 0;
    list-style-position: outside;
    list-style-image: none;
  }

  ol {
    padding: 0;
    margin: 0 0 1.45rem 0;
    list-style-position: outside;
    list-style-image: none;
  }

  p {
    padding: 0;
    margin: 0 0 1.45rem 0;
  }

  strong {
    color: #000;
    font-weight: bold;
  }

  li {
    margin-bottom: calc(1.45rem / 2);
  }

  ol li {
    padding-left: 0;
  }

  ul li {
    padding-left: 0;
  }

  li > ol {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }

  li > ul {
    margin-left: 1.45rem;
    margin-bottom: calc(1.45rem / 2);
    margin-top: calc(1.45rem / 2);
  }

  li *:last-child {
    margin-bottom: 0;
  }

  p *:last-child {
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: calc(1.45rem / 2);
  }
`;
