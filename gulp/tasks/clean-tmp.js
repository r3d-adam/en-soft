import { deleteAsync as del } from 'del';
/* global app */

export const cleanTmp = () => {
	return del(['tmp']);
};
