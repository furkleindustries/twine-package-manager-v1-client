import * as get from './get';
import * as post from './post';
import * as _delete from './delete';

const database = {
	get,
	post,
	delete: _delete,
};

export default database;