export const isEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const isWeChatID = (wechatID: string): boolean => {
    const wechatIDRegex = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/;
    return wechatIDRegex.test(wechatID);
}

export const isPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\d{6,14}$/;
    return phoneRegex.test(phoneNumber);
}

export const isWebsite = (website: string): boolean => {
    if(website === '')
        return true;

    const websiteRegex = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
    return websiteRegex.test(website);
}
