export function regionName(countryCode: string) {
    const regionNames = new Intl.DisplayNames(['ko'], {type: 'region'});
    return regionNames.of(countryCode.toUpperCase())
}