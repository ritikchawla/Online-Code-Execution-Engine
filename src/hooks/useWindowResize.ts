import { useState, useEffect } from "react";

const useWindowResize = () => {
	const [windowDims, setWindowDims] = useState<Array<number>>([
		window.innerWidth,
		window.innerHeight
	]);

	let timer: any;

	const windowResize = () => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			setWindowDims([window.innerWidth, window.innerHeight]);
		}, 200);
	};

	useEffect(() => {
		window.addEventListener("resize", windowResize);

		return () => {
			window.removeEventListener("resize", windowResize);
		};
	}, []);

	return windowDims;
};

export default useWindowResize;
