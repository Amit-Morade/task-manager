export const users = [
    {
        userName: 'Amit',
        email: 'a@gmail.com'
    },
]

export function authenticateUser(useremail) {
    for(let user of users) {
        if(user.email===useremail) return true;
    }

    return false;
}