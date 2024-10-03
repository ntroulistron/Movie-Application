<?php
$apiKey = 'a1dbb95aa8f4698fb5dc70f3c95e4d6a';
$baseUrl = 'https://api.themoviedb.org/3';

if (isset($_GET['details'])) {
    $movieId = $_GET['details'];
    $url = "{$baseUrl}/movie/{$movieId}?api_key={$apiKey}&language=en-US";
} else if (isset($_GET['query'])) {
    $searchTerm = $_GET['query'];
    $url = "{$baseUrl}/search/movie?api_key={$apiKey}&query=" . urlencode($searchTerm) . "&language=en-US&page=1&include_adult=false";
} else {
    $url = "{$baseUrl}/movie/popular?api_key={$apiKey}&language=en-US&page=1";
}

$response = file_get_contents($url);
echo $response;

?>
