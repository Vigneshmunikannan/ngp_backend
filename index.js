const express = require('express')
const cors = require('cors')
const app = express();
const nodemailer = require('nodemailer');
const connectDb = require('./Mongo')
app.use(express.json())
app.use(cors())
connectDb()
const Pro = require('./model')
const port = 4000;
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'vigneshmunaruna@gmail.com',
    pass: 'pgczocodzluizddo',
  },
});
app.post('/send-email', (req, res) => {
    const {ph}=req.body;
  const mailOptions = {
    from: 'vigneshmunaruna@gmail.com',
    to: 'vigneshmunikannan@gmail.com',
    subject: 'Cilent',
    text: `Phone Number of cilent${ph}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent');
    }
  });
});

app.post('/add', async (req, res) => {
    const { title,
        cost,
        img,
        description,
        category,
        categoryimg } = req.body
    const pro = await Pro.create({
        title,
        cost,
        img,
        description,
        category,
        categoryimg
    })
    if (pro) {
        res.status(200).json({
            msg: "success"
        })
    }
    console.log(req.body)
})
// Assuming you have a Product model and router set up
app.get('/cate/:category', async (req, res) => {
    const {category} = req.params;
     console.log(category)
     try {
        const productsInCategory = await Pro.find({ category: category });
    
        if (productsInCategory.length === 0) {
          return res.status(404).json({ message: 'No products found in the selected category.' });
        }
        res.json(productsInCategory);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching products.', error: error.message });
      }
  });

  
app.get('/cate', async (req, res) => {
    Pro.aggregate([
        {
            $group: {
                _id: '$category',
                categoryimg: { $first: '$categoryimg' },
            },
        },
    ])
        .then(categories => {
            res.status(200).json({
                categories
            })
        })
        .catch(error => {
            res.json({
                mag:"failed",
                error:error
            })
        });
})



app.listen(port, () => {
    console.log(`app is listening on port....${port}`)
})