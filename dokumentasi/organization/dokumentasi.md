Organization dibuat untuk highest user/pemilik data masing masing, dan dipisah dari scope inti bisnis

Endpoint flow pembuatan organization

POST : /createOrganization
Untuk mulai menggunakan API, user harus mendaftarkan akun organization sebagai user root, namun terpisah dari scope inti bisnis API

POST : /verify
Setelah akun berhasil dibuat, kode OTP diperlukan untuk memverifikasi kalau akun sudah aktif

POST : /resendOTP
Jika kode OTP yang digunakan sudah tidak valid atau salah dan sudah maksimum percobaan gagal untuk satu kode otp dan perlu diganti

POST : /loginOrganization
Jika, akun sudah berhasil diverifikasi, user kemudian baru bisa login

POST : /logout
Untuk logout user organization

POST : /changePassword
Untuk mengganti password user organization


