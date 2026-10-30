const nodemailer = require('nodemailer');

// 1. Configurar el "transporter" (el cartero digital)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Proveedor de correo
    auth: {
        user: 'rappidinidelivirini@gmail.com',         // Tu correo real de Gmail
        pass: 'dimrbwrpbdsbbqbj'   // Contraseña de aplicación de 16 dígitos de Google
    }
});

// 2. Función exportable para enviar el correo de recuperación
const enviarCorreoRecuperacion = async (emailDestino, codigoVerificacion) => {
    try {
        const mailOptions = {
            from: '"Rapidini Delivirini" <tucorreo@gmail.com>', // Quién lo envía
            to: emailDestino,                                   // A quién le llega
            subject: 'Código de recuperación de contraseña',    // Asunto
            html: `
                <div style="font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px; border-radius: 8px;">
                    <div style="max-width: 500px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h2 style="color: #2c3e50; text-align: center;">Rapidini Delivirini</h2>
                        <p style="color: #555; font-size: 16px;">Has solicitado restablecer tu contraseña. Utiliza el siguiente código de verificación para continuar:</p>
                        
                        <div style="background-color: #f4f6f9; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0;">
                            <span style="font-size: 24px; font-weight: bold; color: #e74c3c; letter-spacing: 4px;">${codigoVerificacion}</span>
                        </div>
                        
                        <p style="color: #7f8c8d; font-size: 14px;">Si no solicitaste este cambio, puedes ignorar este mensaje de forma segura.</p>
                    </div>
                </div>
            `
        };

        
        const info = await transporter.sendMail(mailOptions);
        console.log("Correo enviado con éxito. ID: %s", info.messageId);
        return true;

    } catch (error) {
        console.error("Error al intentar enviar el correo con Nodemailer:", error);
        return false;
    }
};

module.exports = { enviarCorreoRecuperacion };