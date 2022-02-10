export const fetchIt = (url, method = "GET", body = null) => {
    let options = {
        "method": method,
        "headers": {}
    }

    switch (method) {
        case "POST":
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("ftf__token")}`
            }
            break;
        case "PUT":
            options.headers = {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("ftf__token")}`
            }
            break;
        default:
            options.headers = {
                "Authorization": `Token ${localStorage.getItem("ftf__token")}`
            }
            break;
    }

    if (body !== null) {
        options.body = body
    }

    return fetch(url, options).then(r => r.json())
}

// export const request = {
//     init(url) {
//         this.options = {}
//         this.options.headers = {
//             "Authorization": `Token ${localStorage.getItem("ftf__token")}`
//         }
//         this.url = url
//     },

//     get(url) {
//         this.init(url)
//         this.options.method = "GET"
//         this.options.headers = {
//             "Authorization": `Token ${localStorage.getItem("ftf__token")}`
//         }
//         return this.send()
//     },

//     post(url) {
//         this.init(url)
//         this.options.method = "POST"
//         this.options.headers["Content-Type"] = "application/json"
//         this.options.headers["Accept"] = "application/json"
//         this.options.headers['Authorization'] = `Token ${localStorage.getItem("ftf__token")}`
//         return this
//     },

//     put(url) {
//         this.init(url)
//         this.options.method = "PUT"
//         this.options.headers = {
//             "Content-Type": "application/json",
//             "Authorization": `Token ${localStorage.getItem("ftf__token")}`
//         }
//         return this
//     },

//     delete(url) {
//         this.init(url)
//         this.options.method = "DELETE"
//         this.options.headers['Authorization'] = `Token ${localStorage.getItem("ftf__token")}`
//         return this.send()
//     },

//     withBody(body) {
//         if (this.options.method === "POST" || this.options.method === "PUT") {
//             this.options.body = JSON.stringify(body)
//             this.options.headers['Authorization'] = `Token ${localStorage.getItem("ftf__token")}`
//         }
//         return this
//     },

//     async send() {
//         const req = await fetch(this.url, this.options)
//         const parsed = await req.json()
//         return parsed
//     }
// }