import React, { useRef } from "react";
import MonacoEditor, { EditorDidMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";

import "../styles/CodeEditor.css";

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditorRef) => {
    editorRef.current = monacoEditorRef;
    // only invoked when the editor is first displayed on screen
    monacoEditorRef.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  const formatCode = (e: React.MouseEvent) => {
    // get current editor value
    const unformattedCode = editorRef.current.getModel().getValue();

    // format the value
    const formattedCode = prettier.format(unformattedCode, {
      parser: "babel",
      plugins: [parser],
      semi: true,
      singleQuote: false
    });

    // set formatted value
    editorRef.current.setValue(formattedCode.replace(/\n$/, ""));
  };

  return (
    <div className="editor-wrapper">
      <button onClick={formatCode} className="button button-format is-primary is-small">
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        height="100%"
        language="javascript"
        theme="dark"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />
    </div>
  );
};

export default CodeEditor;
