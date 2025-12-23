import axios from "axios";

export const fetchLogs = (filters) =>
  axios.get("http://localhost:5000/logs", { params: filters })
       .then(res => res.data);
