const urlParams = new URLSearchParams(location.search);
const identifier = urlParams.get("identifier");

console.log(atob(identifier));

if (atob(identifier) == "undefined") {
    console.log(true)
} else {
    widget(atob(identifier));
}
