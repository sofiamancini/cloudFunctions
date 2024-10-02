const functions = require("firebase-functions");
const sgMail = require("@sendgrid/mail");

let SENDGRID_API_KEY = "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";
sgMail.setApiKey(SENDGRID_API_KEY);

exports.sendEmailToUser = functions.https.onRequest((request, response) => {
    const msg = {
        to: request.body.to,
        from: "sofia.mancini@uri.edu",
        subject: request.body.subject,
        text: request.body.text,
    };
    sgMail
        .send(msg)
        .then((sendGridResponse) => {
            console.log(sendGridResponse[0].statusCode);
            console.log(sendGridResponse[0].headers);
            response.send("Cloud Function: Email successfully sent using Sendgrid!");
    })
    .catch((error) => {
        console.error("Unable to sed email. Error: " + error);
        throw new functions.https.HttpsError("aborted", "Unable to send email.");
    });
}); 