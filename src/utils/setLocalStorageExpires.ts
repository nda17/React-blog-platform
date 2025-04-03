export const setLocalStorageExpires = (
	key: string,
	value: string,
	ttl: number
) => {
	const now = new Date();
	const item = {
		value: value,
		expiry: now.getTime() + ttl
	};
	localStorage.setItem(key, JSON.stringify(item));
};
