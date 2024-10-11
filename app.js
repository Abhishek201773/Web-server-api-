import express from 'express';
import ejs from 'ejs';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/post', async (req, res) => {
    const firstName = req.body.name;
    try {
        const response = await axios.get(`https://api.genderize.io/?name=${firstName}`);
        const data = {
            name: response.data.name,
            gender: response.data.gender,
            probability:response.data.probability,
            count:response.data.count,
        };
        res.render('name.ejs', data);
    } 
    catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Something went wrong!');
    }
});
