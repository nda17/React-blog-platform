export const validateEmailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validatePasswordRegex = /^.{6,40}$/;
export const validateUsernameRegex = /^\w{3,20}$/;
export const validateAvatarUrlRegex =
	/^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;
export const validateArticleTitleRegex = /^\w{3,19}$/;
export const validateArticleDescriptionRegex = /^\w{10,30}$/;
export const validateArticleTextareaRegex = /\S{10,}/;
export const validateArticleTagRegex = /^\w{3,8}$/;
