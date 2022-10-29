const register = (req,res) => {
    res.send('register user');
} 

const login = (req,res) => {
    res.send('login user');
} 

module.exports = {
    register, login
}
