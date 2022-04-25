//відповідає за генерацію ссилок
const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()
 
//опрацювання кількох запитів
router.post('/generate', auth, async (req, res) => {   //запит який генерує створену ссилку
    try {
    const baseUrl = config.get('baseUrl')
    const { from } = req.body
        
    const code = shortid.generate()

    const existing = await Link.findOne({ from })

    if (existing) {
      return res.json({ link: existing })
    }

    const to = baseUrl + '/t/' + code

    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    await link.save()

    res.status(201).json({ link })
    } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})
router.get('/', auth, async (req, res) => {   //запит для отримання всіх силок
     try {
         const links = await Link.find({ owner: req.user.userId }) //чекаємо поки знайде всі ссилки що відносяться до користувача
         res.json(links)
    } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    } 
})
router.get('/:id', auth, async (req, res) => {     //запит для отримання ссилки по ід
      try {
         const link = await Link.findById(req.params.id) // отримуємо окрему силку і вертаємо в json
         res.json(link)
    } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
})

module.exports = router
