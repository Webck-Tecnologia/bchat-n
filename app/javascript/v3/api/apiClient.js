import axios from 'axios';

const { apiHost = '' } = window.bchatConfig || {};
const wootAPI = axios.create({ baseURL: `${apiHost}/` });

export default wootAPI;
