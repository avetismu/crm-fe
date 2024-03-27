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