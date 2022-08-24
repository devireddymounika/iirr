<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" isErrorPage="true"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Error Page</title>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,900" rel="stylesheet">

	<!-- Custom stlylesheet -->
	<link type="text/css" rel="stylesheet" href="css/errorstyle.css" />

</head>

<body>

	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>Opps!</h1>
			</div>
			<h2>${errorMsg}</h2>
			<p>Unfortunately we're having trouble loading the page you are looking for. Please come back in a while.</p>
			<a href="javascript:goBack()">Go Back</a>  <a href="/">Go To Homepage</a>
		</div>
	</div>
	
	<script>
		function goBack() {
		  window.history.back();
		}
	</script>

</body>

</html>