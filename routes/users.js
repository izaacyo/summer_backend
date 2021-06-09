const router = require('express').Router();
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require('../Utils/Auth');

//User Registeration Route

router.post('/register-user', async (req, res) => {
    await userRegister(req.body, "user", res)
})

//Admin Registeration Route

router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, "admin", res)
})


// Super Admin Registeration Route

router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, "super-admin", res)
})



//User Login Route

router.post("/login-user", async (req, res) => {
    await userLogin(req.body, "user", res)
})



//Admin Login Route

router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, "admin", res)
})


// Super Admin Login Route

router.post('/login-super-admin', async (req, res) => {
    await userLogin(req.body, "super-admin", res)
})


// Profile route

router.get('/profile', userAuth, async (req, res) => {

    return res.json(serializeUser(req.user))
})


//User Protected Route

router.get('/user-profile', userAuth, checkRole(['user']), async (req, res) => {
    return res.json("Hello")

})


//Admin Protected Route

router.get('/admin-profile', userAuth, checkRole(['admin']), async (req, res) => {
    return res.json("Hello Admin")

})


// Super Admin Protected Route

router.get('/super-admin-profile', userAuth, checkRole(['super-admin']), async (req, res) => {
    return res.json("hei super-admin")

})

// Super Admin and Admin Protected Route

router.get('/admin-and-super-admin-profile', userAuth, checkRole(['superadmin', 'admin']), async (req, res) => {
    return res.json("Hello Super Admin and Admin")

})




module.exports = router