<?php
declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    exit('Method not allowed.');
}

// Honeypot field: bots commonly fill hidden inputs, people do not.
if (!empty($_POST['website'] ?? '')) {
    header('Location: index.html?contact=sent#contact');
    exit;
}

$name = trim(strip_tags((string) ($_POST['name'] ?? '')));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim(strip_tags((string) ($_POST['message'] ?? '')));

if (
    $name === '' || strlen($name) > 100 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 160 ||
    $message === '' || strlen($message) > 3000
) {
    http_response_code(422);
    exit('Please provide a valid name, email address, and message.');
}

$safeName = str_replace(["\r", "\n"], ' ', $name);
$recipient = 'ramraj122004@gmail.com';
$subject = 'Portfolio enquiry from ' . $safeName;
$body = "Name: {$safeName}\nEmail: {$email}\n\nMessage:\n{$message}\n";
$headers = implode("\r\n", [
    'Content-Type: text/plain; charset=UTF-8',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (mail($recipient, $subject, $body, $headers)) {
    header('Location: index.html?contact=sent#contact');
    exit;
}

http_response_code(500);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Message not sent</title>
</head>
<body>
  <main>
    <h1>Your message could not be sent.</h1>
    <p>Please email <a href="mailto:ramraj122004@gmail.com">ramraj122004@gmail.com</a> directly.</p>
    <p><a href="index.html#contact">Return to the portfolio</a></p>
  </main>
</body>
</html>
