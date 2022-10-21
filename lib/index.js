export const withPreventDefault =
	(fn) =>
	(e, ...args) => {
		e.preventDefault();
		fn(...args);
	};
