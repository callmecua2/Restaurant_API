// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async (token : string, mail : string) => {
//   const { data, error } = await resend.emails.send({
//     from: "noreply@mail.josuamiduk.web.id",
//     to: [mail],
//     subject: "Hello World",
//     html: `<strong>Code : ${token}</strong>`,
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   console.log({data})

//   return data
// };

// sendEmail("dunia ini kacau", "josuamiduk7@gmail.com")

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("cwd:", process.cwd());
console.log("env:", process.env.RESEND_API_KEY);

export const sendEmail = async (token : string) => {
  const { data, error } = await resend.emails.send({
    from: "noreply@mail.josuamiduk.web.id",
    to: ["josuamiduk7@gmail.com"],
    subject: "Hello World",
    html: `<strong>Code : ${token}</strong>`,
  });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data)
  return data

};


sendEmail("123456")