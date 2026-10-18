<?php
header('Content-Type: application/json; charset=UTF-8');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
    exit;
}

// 1. Sanitize input fields
$name             = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS));
$phone            = trim(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS));
$email            = trim(filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL));
$product_interest = trim(filter_input(INPUT_POST, 'product_interest', FILTER_SANITIZE_SPECIAL_CHARS));
$message          = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_SPECIAL_CHARS));

// 2. Validate required fields
if (empty($name) || empty($phone) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'Please provide a valid email address.']);
    exit;
}

// 3. Email Recipients and Config
$to_email = "support@8rest.com"; // Replace with your receiving email address
$subject  = "New Mattress Inquiry: " . $name . " [" . $product_interest . "]";

// Email Body
$email_body  = "You have received a new consultation inquiry from the 8rest website:\n\n";
$email_body .= "--------------------------------------------------\n";
$email_body .= "Client Name:      " . $name . "\n";
$email_body .= "Phone Number:     " . $phone . "\n";
$email_body .= "Email Address:    " . $email . "\n";
$email_body .= "Selected Matrix:  " . $product_interest . "\n";
$email_body .= "--------------------------------------------------\n\n";
$email_body .= "Sleep Requirements / Message:\n" . $message . "\n\n";
$email_body .= "Submitted on: " . date('Y-m-d H:i:s') . "\n";

// Email Headers
$headers   = [];
$headers[] = 'From: 8rest Inquiries <noreply@8rest.com>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

// 4. Send Email
if (mail($to_email, $subject, $email_body, implode("\r\n", $headers))) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Thank you! Your sleep consultation inquiry has been received. Our team will contact you shortly.'
    ]);
} else {
    echo json_encode([
        'status'  => 'error',
        'message' => 'Failed to send message via server mailer. Please reach out via WhatsApp or call us directly.'
    ]);
}
exit;