import axios from 'axios'

export async function findAll() {
    let res = await axios.get("/api/reviews");
    return res.data
}

export async function deleteOne(id) {
    let res = await axios.delete(`/api/reviews/${id}`);
    return res.data
}

export async function addOne(newReview) {
    let res = await axios.post("/api/reviews", newReview)
    return res.data
}

export async function findByUserId(id) {
    let res = await axios.get(`/api/reviews/${id}`)
    return res.data
}