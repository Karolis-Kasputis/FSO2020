
import axios from 'axios'

const url = '/api/persons/'
const getAll = () => {
    return axios
            .get(`${url}`)
            .then(r=> r.data)
}

const create = (newPerson) => {
    return axios
            .post(`${url}`, newPerson)
            .then(r => r.data)
}

const remove = (id) => {
    return axios
           .delete(`${url}/${id}`)     
}
const update = (id, newPerson) => {
    return axios
            .put(`${url}/${id}`, newPerson)
}
export default { getAll, create, remove, update }