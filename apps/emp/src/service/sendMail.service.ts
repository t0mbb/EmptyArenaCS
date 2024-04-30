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
        from: "EmptyArena@gmail.com",
        to: email,
        subject: "Your Membership are going to expire   ",
        text: "You need to resign soon!!!!!!",
      };
    await transporter.sendMail(mailOptions)
}