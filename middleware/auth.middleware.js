// функція що дозволяє перехоплювати деякі дані та виконувати деяку логіку з ними


const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {   //OPTIONS метод перевіряє доступність сервера
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]  // "Bearer TOKEN"
        if (!token) {
            return res.status(401).json({message: 'Нет авторизации'})
        }
    
    const decoded = jwt.verify(token, config.get('jwtSecret')) //верифікація токіна розкодувати токін
    req.user = decoded                                         //занести розкод токін до юзера
    next()
   
    } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' })
    }
}