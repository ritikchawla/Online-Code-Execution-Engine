import React, { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

import { Cell } from "../state/cellInterface";

import "../styles/TextEditor.css";
import { useActions } from "../hooks/useActions";

interface TextEditorProps {
	cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
	const [editing, setEditing] = useState(false);

	const { updateCell } = useActions();

	const markdownEditor = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (
				e.target &&
				markdownEditor.current &&
				markdownEditor.current.contains(e.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		document.addEventListener("click", listener, { capture: true });

		return () => {
			document.removeEventListener("click", listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div ref={markdownEditor} className="text-editor">
				<MDEditor
					value={cell.content || "# Click to Edit"}
					onChange={value => updateCell(cell.id, value || "")}
				/>
			</div>
		);
	}
	return (
		<div onClick={() => setEditing(true)} className="text-editor card">
			<div className="card-content">
				<MDEditor.Markdown source={cell.content || "# Click to Edit"} />
			</div>
		</div>
	);
};

export default TextEditor;
