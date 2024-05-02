import nodeMailer from 'nodemailer'
import fs from 'fs'
import { promisify } from 'util'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import handlebars from 'handlebars';

const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "aaaa@gmail.com",
        pass: "aaaa",
    },
});
const readFileAsync = promisify(fs.readFile);


const makeKeyCap = (obj) =>{
    let newObj = {}
    for (const key in obj) {
        newObj[String(key).toLocaleUpperCase()] = obj[key]
    }
    return newObj
}

export const sendmail = async (res, formEmail, responce) => {
    try {
        const html = await readFileAsync('./templates/email/welcome.hbs', 'utf-8');
  
        var template = await handlebars.compile(html);
        console.log(template({
            responce
        }))
   
        const info = await transporter.sendMail({
            from: 'panda5050e@gmail.com', 
            to: formEmail.email, 
            subject: "Hello ✔",
            html: template({
                responce: makeKeyCap(responce),
                user: `${formEmail.user.firstName} ${formEmail.user.lastName}`
            }), // html body
        });
        console.log(info);
        return;
    } catch (error) {
        console.log(error);
    }

}