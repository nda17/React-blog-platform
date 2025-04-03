export const getLocalStorageExpires = (key: string) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) return null;

	const item = JSON.parse(itemStr);
	const now = new Date();

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key);
		return null;
	}

	return item.value;
};
