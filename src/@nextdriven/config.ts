export enum buildModeConfig {
    Local,
    Test,
    Prod,
}

var baseUrl = "";

export const buildMode: buildModeConfig =
    buildModeConfig.Test as buildModeConfig;

if (buildMode == buildModeConfig.Local) {
    baseUrl = "http://localhost:5204";
} else if (buildMode == buildModeConfig.Test) {
    baseUrl = "http://apis.betahubs.net";
} else {
    baseUrl = "https://apicorev2.mcshippers.com";
}

export const BaseURL = baseUrl;