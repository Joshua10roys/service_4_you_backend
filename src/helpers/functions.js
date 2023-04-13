import bcrypt from "bcrypt";


export async function genHashPassword(password) {
    const salt = await bcrypt.genSalt(5);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
}


export const getOnlyDate = async (date) => {
    let d = new Date(date);
    let dd = d.getDate();
    let mm = d.getMonth();
    let yy = d.getFullYear();
    return new Date(yy, mm, dd);
}
