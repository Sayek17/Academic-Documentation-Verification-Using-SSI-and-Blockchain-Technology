const fs = require('fs');
const path = require('path');

function getFaberEndPoint(){
    const configFilePath = path.join(__dirname, "../../../common-config.json");

    try {
        const configFileData = fs.readFileSync(configFilePath, 'utf8');
        const config = JSON.parse(configFileData);

        const faberEndpoint = config.faberEndpoint;

        return faberEndpoint || "False";
    } catch (error) {
        console.error('Error reading common-config.json:', error);
        return "False"; // Return "false" in case of an error
    }
}

module.exports = { getFaberEndPoint };
