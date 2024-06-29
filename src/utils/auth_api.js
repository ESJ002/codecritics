import axios from "axios";
export async function login(userInfo) {
    let res = await axios.post("/api/login", userInfo);
    return res.data.token
}
