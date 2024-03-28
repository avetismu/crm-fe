export const formatWebsiteURL = (website: string): string => {
    if (!website.startsWith("https://") && !website.startsWith("www.")) {
        website = `https://www.${website}`;
    } else if (!website.startsWith("https://")) {
        website = `https://${website}`;
    }
    return website;
}