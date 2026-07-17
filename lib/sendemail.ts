import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (token : string) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["josua6144@gmail.com"],
    subject: "Hello World",
    html: `<strong>Code : ${token}</strong>`,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data
};
