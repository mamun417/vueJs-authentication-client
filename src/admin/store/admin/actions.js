export function getAdmins(context, payload) {
    return new Promise((resolve, reject) => {
        axios
            .get("admins", {
                params: {
                    page: payload.paginationMeta.current_page,
                    per_page: payload.pipeline.per_page,
                    search: payload.pipeline.search,
                    filter: payload.pipeline.filter
                }
            })
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function createSkill(context, payload) {
    return new Promise((resolve, reject) => {
        axios
            .post("skills", payload.inputs)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

export function deleteSkill(context, payload) {
    return new Promise((resolve, reject) => {
        axios
            .delete("skills/" + payload.id)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
