const netAPI = (()=>{
    const BASE_URL = "https://study.duyiedu.com";
    const TOKEN_KEY = "token";

    function get(path){
        const headers = {};
        const token = localStorage.getItem("token");
        if(token){
            headers["Authorization"] = `Bearer ${token}`;
        }
        return fetch(BASE_URL + path, {
            method: "GET",
            headers: headers,
        });

    }
    function post(path, bodyObj){
        const headers = {};
        const token = localStorage.getItem("token");
        if(token){
            headers["Authorization"] = `Bearer ${token}`;
        }
        headers["Content-Type"] = "application/json";
        return fetch(BASE_URL + path, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(bodyObj),
        });

    }

    async function reg(userIfo) {
    const resp = await post("/api/user/reg", userIfo);
    return await resp.json();
    }

    async function login(loginIfo) {
    const resp = await post("/api/user/login", loginIfo);
    const result = await resp.json();
    // 将令牌保存起来 (localStorage)
    if(result.code === 0){
        const token = resp.headers.get('authorization');
        localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
    }

    async function profile(){
        const resp = await get("/api/user/profile");
        return await resp.json();
    }
    async function exists(loginId){
        const resp = await get("/api/user/exists?loginId=" + loginId);
        return await resp.json();
    }

    async function sendMsg(contents){
        const resp = await post("/api/chat", {content: contents});
        return await resp.json();
    }

    async function getHistory(){
        const resp = await get("/api/chat/history");
        return await resp.json();
    }

    function loginOut(){
        localStorage.removeItem("token");
    }
    return {
        reg,
        login,
        loginOut,
        sendMsg,
        exists,
        profile,
        getHistory,
    }
})();