<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "group1";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $Name = $_POST['Name'];
    $age = $_POST['age'];
    $birthdate = $_POST['birthdate'];
    $email = $_POST['email'];
    $gender = $_POST['gender'];
    $Address = $_POST['Address'];
    $number = $_POST['number'];

    $sql = "INSERT INTO students (name, age, birthdate, email_add, gender, address, mobile_number) 
            VALUES ('$Name', '$age', '$birthdate', '$email', '$gender', '$Address', '$number')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
