export function AdoptionRequestHTML(ownerFirstName,adopterName, adopterEmail, message, petName) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pet Adoption Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background-color: #4CAF50;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
        }
        .content p {
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            font-size: 12px;
            color: #777777;
            border-top: 1px solid #eeeeee;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Pet Adoption Notification</h1>
        </div>
        <div class="content">
            <p>Dear ${ownerFirstName},</p>
            <p>We are pleased to inform you that someone has expressed interest in adopting your pet <b>${petName}</b>. Below are the details of the potential adopter:</p>
            <p><strong>Adopter Name:</strong> ${adopterName}</p>
            <p><strong>Adopter Email:</strong> ${adopterEmail}</p>
            <p><strong>Adopter Message:</strong> ${message}</p>
            <p>Please review the adopter's information and let us know how you would like to proceed. You can contact the adopter directly or reach out to us for further assistance.</p>
            <p><a href="mailto:${adopterEmail}" class="button">Contact Adopter</a></p>
            <p>Thank you for choosing our platform to find a loving home for your pet!</p>
            <p>Best regards,<br>The Pet Adoption Team</p>
        </div>
        <div class="footer">
            <p>© 2025 Pet Adoption Platform. All rights reserved.</p>
            <p>Contact us at <a href="mailto:support@petadoption.com">support@petadoption.com</a></p>
        </div>
    </div>
</body>
</html>
    `;
}