const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
}

function find() {
    return db('schemes');
};

function findById(id) {
    return db('schemes')
        .where({id})
        .first();
};

function findSteps(scheme_id) {
    return db('schemes')
        .join('steps', 'schemes.id', 'steps.scheme_id')
        .select('schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({scheme_id});
};

function add(scheme) {
    return db('schemes')
        .insert(scheme)
        .then(ids => ({ id: ids[0] }));
};

function update( id, changes) {
    return db('schemes')
        .where({id})
        .update(changes);
};

function remove(id) {
    return db('schemes')
        .where('id', Number(id))
        .del();
};