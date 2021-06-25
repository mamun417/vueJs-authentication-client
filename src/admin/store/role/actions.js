export function getRoles(context, payload) {
    return new Promise((resolve, reject) => {
        axios.get("roles")
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createSkill(context, payload) {
    return new Promise((resolve, reject) => {
        axios.post("skills", payload.inputs)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function deleteSkill(context, payload) {
    return new Promise((resolve, reject) => {
        axios.delete("skills/" + payload.id)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
}

