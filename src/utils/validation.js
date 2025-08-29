
export function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}   

export function isPasswordStrong(password) {
    // At least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
   
}


export function checkPasswordError(password) {

    const checklengthRegex = /^.{6,}$/; // At least 6 characters
    const checkUppercaseRegex = /^(?=.*[A-Z]).+$/; // At least one uppercase letter
    const checkLowercaseRegex = /^(?=.*[a-z]).+$/; //
    const checkNumberRegex = /^(?=.*\d).+$/; // At least one number
    const checkSpecialCharRegex = /^(?=.*[@$!%*?&]).+$/; // At least one special character

    if (!checklengthRegex.test(password)) {
        return 'Password should be at least 6 characters long.';
    }else if (!checkUppercaseRegex.test(password)) {
        return 'Password should contain at least one uppercase letter.';
    }else if (!checkLowercaseRegex.test(password)) {
        return 'Password should contain at least one lowercase letter.';
    }else if (!checkNumberRegex.test(password)) {
        return 'Password should contain at least one number.';
    }else if (!checkSpecialCharRegex.test(password)) {
        return 'Password should contain at least one special character.';
    }
    

}