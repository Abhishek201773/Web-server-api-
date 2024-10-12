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
        let img;
        let male=["Nolan","Kingston","Adrian","Jade","Brooklynn","Ryan","Liliana","Avery"];
        let female=["Sawyer","Leo","Jocelyn","Wyatt","Easton","Christopher","Eliza","Amaya","Leah","Liam","Chase","Katherine"];
        let random = Math.floor(Math.random() *7) + 1;
        let ran = Math.floor(Math.random() *11) + 1;
    
        if(response.data.gender=="male"){
            img=`https://api.dicebear.com/9.x/pixel-art/svg?seed=${male[random]}`;
        }
        else{
            img=`https://api.dicebear.com/9.x/pixel-art/svg?seed=${female[ran]}`
        }
        const data = {
            name: response.data.name,
            gender: response.data.gender,
            probability:response.data.probability,
            count:response.data.count,
            img:img,
        };
        res.render('name.ejs', data);
    } 
    catch (error) {
        console.error('Error fetching data from API:', error);
        res.status(500).send('Something went wrong!');
    }
});
