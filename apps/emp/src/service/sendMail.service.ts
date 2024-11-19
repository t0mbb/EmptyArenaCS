import nodemailer from "nodemailer"; 

const transporter = nodemailer.createTransport({
    host: process.env.NAMEGMAIL,
    port: 465,
    secure: true, 
    auth: {
      user: process.env.authUSER,
      pass: process.env.authPASS,
    },
  });


export const sendMail = async (email : string ) => {
    const mailOptions = {
        from: '"EmptyArenaCorps" <no-reply@gmail.com>',
        to: email,
        subject: " Co Lich Hen Danh Sap Toi   ",
        text: "Vao emptyarena.corps de check",
      };
    await transporter.sendMail(mailOptions)
}