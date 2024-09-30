import { deleteAsync as del } from 'del';
/* global app */

export const reset = () => {
	return del(app.path.clean);
};
