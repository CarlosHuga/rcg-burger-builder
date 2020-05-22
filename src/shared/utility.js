export const updateObject = (object, updatedProperties) => {
    return {
        ...object,
        ...updatedProperties
    }
}

export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const checkValidity = (value, rules) => {
    let isValid = true;
    const cleanValue = value.trim() 
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = cleanValue !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = cleanValue.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = cleanValue.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(cleanValue) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(cleanValue) && isValid
    }

    return isValid;
}