import countries from "i18n-iso-countries"

export function regionName(countryCode: string) {
    const regionNames = new Intl.DisplayNames(['ko'], {type: 'region'});

    let alpha2CountryCode = countryCode.toUpperCase();

    if (alpha2CountryCode === "UNK") {
        alpha2CountryCode = "XK"
    }

    if (alpha2CountryCode.length > 3) {
        countries.alpha3ToAlpha2(alpha2CountryCode)
    }

    try {
        return regionNames.of(alpha2CountryCode)
    } catch {
        return alpha2CountryCode
    }
}