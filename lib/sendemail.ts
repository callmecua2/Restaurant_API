import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendEmail = async (token : string) => {
//   const { data, error } = await resend.emails.send({
//     from: "noreply@mail.josuamiduk.web.id",
//     to: ["josuamiduk7@gmail.com"],
//     subject: "Hello World",
//     html: `<strong>Code : ${token}</strong>`,
//   });

//   if (error) {
//     throw new Error(error.message);
//   }

//   return data
// };


export const sendEmail = async (token: string) => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verifikasi Email</title>
      <style>
        /* Fallback untuk client yang tidak support style tag */
        body { margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f9f9f9; }
        .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .header { text-align: center; margin-bottom: 30px; }
        .header h1 { color: #333333; font-size: 24px; margin: 0; }
        .content { color: #555555; font-size: 16px; line-height: 1.6; }
        .code-box { 
          background-color: #f0f4ff; 
          border: 1px dashed #4a90d9; 
          border-radius: 6px; 
          padding: 20px; 
          text-align: center; 
          margin: 25px 0;
          font-size: 28px;
          font-weight: bold;
          color: #1a3c6e;
          letter-spacing: 4px;
        }
        .footer { 
          margin-top: 40px; 
          text-align: center; 
          font-size: 12px; 
          color: #aaaaaa; 
          border-top: 1px solid #eeeeee; 
          padding-top: 20px;
        }
        .footer a { color: #4a90d9; text-decoration: none; }
        .btn {
          display: inline-block;
          background-color: #4a90d9;
          color: #ffffff !important;
          padding: 12px 30px;
          border-radius: 4px;
          text-decoration: none;
          font-weight: bold;
          margin: 10px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <!-- Header -->
        <div class="header">
          <h1>🔐 Verifikasi Akun</h1>
        </div>

        <!-- Body -->
        <div class="content">
          <p>Halo,</p>
          <p>Anda menerima email ini karena permintaan verifikasi untuk akun Anda. Gunakan kode di bawah ini untuk menyelesaikan proses:</p>

          <!-- Kode Verifikasi -->
          <div class="code-box">${token}</div>

          <p>Kode ini hanya berlaku selama <strong>15 menit</strong>. Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini.</p>
          <p style="margin-top: 30px;">Terima kasih,<br/><strong>Tim Dukungan</strong></p>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>&copy; 2026 Nama Perusahaan. All rights reserved.</p>
          <p>
            <a href="mailto:support@perusahaan.com">Hubungi Kami</a> &bull; 
            <a href="#">Kebijakan Privasi</a>
          </p>
          <p>Email ini dikirim secara otomatis, harap tidak membalas.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const { data, error } = await resend.emails.send({
    from: "noreply@mail.josuamiduk.web.id",
    to: ["josuamiduk7@gmail.com"],
    subject: "Kode Verifikasi Akun Anda",
    html: htmlContent,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log(data)

  return data;
};

sendEmail("1321864")