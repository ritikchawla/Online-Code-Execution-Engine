import React, { useRef, useEffect } from "react";

import htmlTemplate from "../template/IframeTemplate";
import "../styles/Preview.css";

interface PreviewProps {
  code?: string;
  error?: string;
}

const Preview: React.FC<PreviewProps> = ({ code, error }) => {
  const iFrameRef = useRef<null | HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iFrameRef.current || !code || error === undefined) return;

    iFrameRef.current.srcdoc = htmlTemplate(error);

    setTimeout(() => {
      iFrameRef?.current?.contentWindow?.postMessage(code, "*");
    }, 100);
  }, [code, error]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iFrameRef}
        sandbox="allow-scripts"
        srcDoc={htmlTemplate(error || "")}
      />
    </div>
  );
};

export default Preview;
