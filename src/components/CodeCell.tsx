import React, { useCallback, useEffect, useRef } from "react";
import CodeEditor from "./CodeEditor";

import Preview from "./Preview";
import ResizableComponent from "./ResizableComponent";
import { Cell } from "../state/cellInterface";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

import "../styles/CodeCell.css";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const previousCumulativeCode = useRef([""]);

  const { updateCell, createBundle } = useActions();

  const bundle = useTypedSelector(state => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector(state => {
    // console.log(state);
    const { data, order } = state.cells;

    const orderedCells = order.map(cellId => data[cellId]);

    const cumulativeCode = [];

    for (let c of orderedCells) {
      // if (c.type === "code") {
      //   cumulativeCode.push(c.content);
      // }
      if (c.id === cell.id) {
        cumulativeCode.push(c.content);
        break;
      }
    }

    // previousCumulativeCode.current = cumulativeCode;

    return cumulativeCode;
  });

  const transpileCode = useCallback(async () => {
    createBundle(cell.id, cumulativeCode.join("\n"));
  }, [createBundle]);

  useEffect(() => {
    if (cumulativeCode.join("") === previousCumulativeCode.current.join("")) {
      if (timer.current) clearTimeout(timer.current);
      return;
    } else {
      previousCumulativeCode.current = cumulativeCode;
    }

    timer.current = setTimeout(transpileCode, 1500);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [cumulativeCode, transpileCode]);

  return (
    <ResizableComponent direction="vertical">
      <div style={{ height: "100%" }}>
        <div style={{ display: "flex", height: "100%" }}>
          <ResizableComponent direction="horzontal">
            <CodeEditor
              initialValue={cell.content}
              onChange={value => updateCell(cell.id, value)}
            />
          </ResizableComponent>

          {bundle?.loading ? (
            <div className="progress-cover">
              <progress className="progress is-small is-primary" max="100"></progress>
            </div>
          ) : (
            <Preview code={bundle?.code} error={bundle?.error} />
          )}
        </div>
      </div>
    </ResizableComponent>
  );
};

export default CodeCell;
