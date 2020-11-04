const db = require("../data/db-config");

module.exports = {
    find,
}

function find(){
    return db('schemes');
}

function findById() {
    return db('schemes').where({id});
}

function findSteps(id){
    return db('schemes as sc').join('steps as st', 'sc.id', 'st.scheme_id')
    .select('st.id', 'sc.scheme_name as name', 'st.step_number as step_number', 'st.instructions')
    
}

function findSteps(id) {
    return db('schemes as sc')
        .join('steps as st', 'sc.id', 'st.scheme_id')
        .select(
            'st.step_number',
            'sc.scheme_name as scheme',
            'st.instructions',
            'st.id as id'
        )
        .where({'sc.id': id})
        .orderBy('st.step_number', 'asc')
}

function add(scheme){
    return db('schemes').insert(scheme)
        .then(response => {
            return findById(id)
        })
}

function update(changes, id){
    return db("schemes").update(changes).where({id})
        .then(count => {
            if(count){
                return findById(id);
            } else {
                return Promise.resolve(null);
            }
        });
}

function remove(id){
    return db('schemes').where({id}).delete();
}