async function getInputData(url) {
    let response = await fetch(url);
    console.log(response)
    //let commits = await response.json(); // read response body and parse as JSON

    //alert(commits[0].author.login);
}

cURL = "https://adventofcode.com/2022/day/3/input"

getInputData(cURL)


//export { getInputData };