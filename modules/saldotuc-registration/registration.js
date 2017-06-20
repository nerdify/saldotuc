const querystring = require('querystring');
const {json, send} = require('micro');
const SparkPost = require('sparkpost');
const uid = require('uid-promise');

const client = new SparkPost(process.env.TUC_SPARKPOST_API_KEY);

const User = require('./models/user');
const Verification = require('./models/verification');

function buildOptions(email, securityCode, token) {
	const link = `https://saldotuc.com/api/registration/confirm?email=${querystring.escape(email)}&token=${token}`;
	const body = `
    <html>
      <body>
        <p>Hola!</p>
        <p>
          Comprueba que el código de seguridad proporcionado
          coincida con <strong>${securityCode}</strong>
          antes de continuar.
        </p>
        <p>
          A continuación, sigue
          <a href="${link}">este enlace</a>
          para verificar tu dirección de correo electrónico.
        </p>
      </body>
    </html>
  `;

	return {
		content: {
			from: 'tuc@saldotuc.com',
			html: body,
			subject: 'Verifica tu correo para usar saldotuc.com'
		},
		recipients: [{
			address: email
		}]
	};
}

module.exports = async (req, res) => {
	const {email} = await json(req);
	const requestToken = await uid(20);
	const securityCode = await uid(6);
	const verificationToken = await uid(20);

	try {
		let user = await User.findOne({email});

		if (!user) {
			user = await new User({email}).save();
		}

		await new Verification({
			requestToken,
			user,
			verificationToken
		}).save();

		await client.transmissions.send(
			buildOptions(email, securityCode, verificationToken)
		);

		return {
			securityCode,
			token: requestToken
		};
	} catch (err) {
		send(res, 400, {
			email,
			code: 'invalid_email',
			message: `Email inválido "${email}"`
		});
	}
};
