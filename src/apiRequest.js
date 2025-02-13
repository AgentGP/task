const DB_URL = (process.env.REACT_APP_DB_SERVER || "http://localhost:5000") + "/tasks"

// apiRequest is responsible for easy and neat way to save 
// the tasks in the frontend, all the way to the backend 

const apiRequest = async (method, endpoint="", data = null) => {
    try {
        const url = `${DB_URL}/${endpoint}`
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : null,
        });
        const responseData = await response.json()
        return responseData;
    } catch (err) {
        console.error("Error in API request:", err)
    }
}

export default apiRequest
