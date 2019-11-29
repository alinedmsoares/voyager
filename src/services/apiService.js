import axios from 'axios';

export default{
    call(endpoint){
        let urlApi = `http://192.168.4.49:5000/api/${endpoint}`;

        return{
            getOne: ({id}) => axios.get(`${urlApi}/${id}`),
            getAll: () => axios.get(`${urlApi}`),
            update: (toUpdate) => axios.put(urlApi,toUpdate),
            create: (toCreate) => axios.post(urlApi,toCreate),
            delete: ({id}) => axios.delete(`${urlApi}/${id}`)
        }
    }
}