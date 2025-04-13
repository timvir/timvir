import { css } from "@linaria/core";

export default css`
  color: #393a34;
  background-color: #f6f8fa;

  & :is(.comment, .prolog, .doctype, .cdata) {
    color: #999988;
    font-style: italic;
  }
  & :is(.namespace) {
    opacity: 0.7;
  }
  & :is(.string, .attr-value) {
    color: #e3116c;
  }
  & :is(.punctuation, .operator) {
    color: #6cb6ff;
  }
  & :is(.function, .delete, .tag) {
    color: #d73a49;
  }
  & :is(.tag, .selector, .keyword) {
    color: #00009f;
  }
  & :is(.function-variable) {
    color: #6f42c1;
  }
  & :is(.atrule, .keyword, .attr-name, .selector) {
    color: #00a4db;
  }
  & :is(.entity, .url, .symbol, .number, .boolean, .variable, .constant, .property, .regex, .inserted) {
    color: #36acaa;
  }

  :global(:root[data-timvir-theme="dark"]) & {
    color: #adbac7;
    background-color: #2d333b;

    & :is(.comment, .prolog, .doctype, .cdata) {
      color: #999988;
      font-style: italic;
    }
    & :is(.namespace) {
      opacity: 0.7;
    }
    & :is(.string, .attr-value) {
      color: #96d0ff;
    }
    & :is(.punctuation, .operator) {
      color: #6cb6ff;
    }
    & :is(.function, .delete, .tag) {
      color: #d73a49;
    }
    & :is(.tag, .selector, .keyword) {
      color: #8ddb8c;
    }
    & :is(.function-variable) {
      color: #6f42c1;
    }
    & :is(.atrule, .keyword, .attr-name, .selector) {
      color: #f47067;
    }
    & :is(.entity, .url, .symbol, .number, .boolean, .variable, .constant, .property, .regex, .inserted) {
      color: #dcbdfb;
    }
  }
` as string;
