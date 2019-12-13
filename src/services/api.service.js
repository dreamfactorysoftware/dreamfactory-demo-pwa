import axios from 'axios';

const API_KEY = '36fda24fe5588fa4285ac6c6c2fdfbdb6b6bc9834699774c9bf777f706d05a88';
const SESSION_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4ZWIxYjUyMmY2MGQxMWZhODk3ZGUxZGM2MzUxYjdlOCIsImlzcyI6Imh0dHA6Ly9leGNlbC5zdGFnaW5nLXNwZy5kcmVhbWZhY3RvcnkuY29tL2FwaS92Mi9zeXN0ZW0vYWRtaW4vc2Vzc2lvbiIsImlhdCI6MTU3NjIyNTg5NywiZXhwIjoxNTc5ODI1ODk3LCJuYmYiOjE1NzYyMjU4OTcsImp0aSI6ImhGVU83aW9TVlhkakFERGgiLCJ1c2VyX2lkIjoxLCJmb3JldmVyIjpmYWxzZX0.6aMMemEMvwmLlwdoiyu6fY9FnNznME358DJTgvtVSc0';
const API_URL = 'http://excel.staging-spg.dreamfactory.com/api/v2/mysql/';

const ApiService = {
    getDepartments() {
        return axios.get(`${API_URL}_table/departments`, {
            dataType: 'json',
            headers: {
                'X-DreamFactory-API-Key': API_KEY,
                'X-DreamFactory-Session-Token': SESSION_TOKEN
            }
        })
            .then(response => response.data.resource)
            .catch(e => {
                console.error(e)
            })
    }
};

export default ApiService;
