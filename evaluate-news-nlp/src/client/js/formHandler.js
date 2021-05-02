//ref: https://knowledge.udacity.com/questions/539331

function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)
    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        //data type should be defined
        body: JSON.stringify({
            formText: formText
        }),
    })
        // reference from: https://www.meaningcloud.com/developer/sentiment-analysis/doc/2.1/response
        .then(res => {
            return res.json()
        })
        .then(function (res) {
            console.log('res ======> ', res)
            document.getElementById('results').innerHTML = res.agreement;
            document.getElementById('polarity').innerHTML = res.irony;
            document.getElementById("score_tag").innerHTML = res.score_tag;
            document.getElementById("confidence").innerHTML = res.confidence;
        })
    Client.validationUrl(formText)
    console.log("::: Url Validation :::")
    fetch('http://localhost:8081/test', {
        method: "POST",
        credentials: 'same-origin',
        headers: {
           "Content-Type": "application/json"
        },
        //data type should be defined
        body: JSON.stringify({
            formText: formText
        }),
    })    
}

export { handleSubmit }
