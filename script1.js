window.onload = function() {
    var ipAddressElement = document.getElementById("ipAddress");
    var locationElement = document.getElementById("location");

    // Function to get IP address
    function getIPAddress() {
        var ipPromise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://api.ipify.org?format=json", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var ipAddress = JSON.parse(xhr.responseText).ip;
                    resolve(ipAddress);
                }
            };
            xhr.onerror = function() {
                reject(new Error("Failed to fetch IP address"));
            };
            xhr.send();
        });
        return ipPromise;
    }

    // Function to get location based on IP address
    function getLocation(ip) {
        var locationPromise = new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://ipapi.co/" + ip + "/json/", true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    var locationData = JSON.parse(xhr.responseText);
                    var location = locationData.city + ", " + locationData.region + ", " + locationData.country_name;
                    resolve(location);
                }
            };
            xhr.onerror = function() {
                reject(new Error("Failed to fetch location"));
            };
            xhr.send();
        });
        return locationPromise;
    }

    // Display IP address and location
    getIPAddress()
        .then(function(ip) {
            ipAddressElement.textContent = "Your IP Address: " + ip;
            return getLocation(ip);
        })
        .then(function(location) {
            locationElement.textContent = "Your Location: " + location;
        })
        .catch(function(error) {
            console.error(error);
            ipAddressElement.textContent = "Failed to fetch IP address";
            locationElement.textContent = "Failed to fetch location";
        });
};
