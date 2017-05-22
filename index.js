(function () {
    // fonction req
    function req() {
        return new Promise(function (resolve, reject) {
            // création xmlhttpRequest
            const xhr = new XMLHttpRequest()
            // fonction appelé à chaque changement d'état
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    // DONE
                    if (xhr.status === 200) {
                        // OK
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        // ERROR
                        reject(xhr)
                    }
                }
            }
            xhr.open("GET", "/toto.json")
            xhr.send()
        })
    }

    // exemple PROMISE avec 1 then après 1 requetes
        req()
            .then(function (response) {
                console.log(response)
            }).catch(function (error) {
                console.error(error)
            })
    // --------------------------

    // exemple ASYNC/AWAIT avec 1 then après 1 requetes
        async function getResult() {
            let result = await req()
            return result
        }

        let result = getResult()
        console.log("async, await", result)
    // --------------------------

    // exemple avec 1 then après 10 requetes
        let i = 0
        const promises = []

        while (i < 10) {
            promises.push(req());
            ++i;
        }

        // toute les requetes sont executée en parallèle
        Promise.all(promises).then(function (result) {
            console.log("all", result)
        })

        // la requete la plus rapide sort dans le then
        Promise.race(promises).then(function (result) {
            console.log("race: la requete la plus rapide: ", result)
        })
    // --------------------------

})()