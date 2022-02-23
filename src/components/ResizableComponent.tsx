import React from "react";

import { ResizableBox, ResizableBoxProps } from "react-resizable";
import useWindowResize from "../hooks/useWindowResize";

import "../styles/Resizable.css";

interface ResizableComponentProps {
	direction: "horzontal" | "vertical";
}

const ResizableComponent: React.FC<ResizableComponentProps> = ({
	direction,
	children
}) => {
	const [windowWidth, windowHeight] = useWindowResize();

	let rProps: ResizableBoxProps = {
		height: 300,
		width: Infinity,
		resizeHandles: ["s"],
		maxConstraints: [Infinity, windowHeight * 0.9],
		minConstraints: [Infinity, 24]
	};

	if (direction === "horzontal") {
		rProps["className"] = "resize-horizontal";
		rProps.height = Infinity;
		rProps.width = windowWidth;
		rProps.resizeHandles = ["e"];
		rProps.maxConstraints = [windowWidth * 0.75, Infinity];
		rProps.minConstraints = [windowWidth * 0.2, Infinity];
	}

	return <ResizableBox {...rProps}>{children}</ResizableBox>;
};

export default ResizableComponent;
