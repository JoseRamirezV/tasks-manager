export default function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9._+-]*@[a-zA-Z]*\.[a-zA-Z]{2,3}$/;
    return pattern.test(email);
}