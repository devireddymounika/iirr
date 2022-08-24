<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix='c' uri='http://java.sun.com/jsp/jstl/core'%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%-- <%@ page session="false"%> --%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="Rice Pest ">
<meta name="Keywords"
	content="karif, horticulture, agriculture, cooperation, kishan, krishi, vikas">
<meta name="viewport"
	content="width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no">
<meta name="title" content="Rice Pest">
<!-- <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'unsafe-eval' localhost/ localhost:8080/ localhost:9090/ 3.23.188.229/ *.googletagmanager.com/gtag/ cdnjs.cloudflare.com/ajax/libs/ cdn.jsdelivr.net/ stackpath.bootstrapcdn.com/bootstrap/ https://www.google-analytics.com/ fonts.googleapis.com/ cdn.linearicons.com/ https://fonts.gstatic.com/s/ https://www.youtube.com/ https://www.google.com/; object-src 'self'; frame-src 'self' https://www.google.com/ https://www.youtube.com/; form-action 'none'; img-src 'self' https://hitwebcounter.com/counter/ http://www.hitwebcounter.com/counter/ https://www.google-analytics.com/;"> -->
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

<!-- Title -->
<title>Ricepest</title>

<!-- Favicons -->
<link href="favicon.png" rel="icon">

<!-- Style sheet -->
<link rel="stylesheet" type="text/css" href="css/custom-style.css" />
<link rel="stylesheet" type="text/css" href="css/main.css" />
<link rel="stylesheet" type="text/css" href="css/footer.css">
<link href="css/high.css" rel="alternate stylesheet" type="text/css" media="screen" title="change">
<link href="assets/img/apple-touch-icon.png" rel="apple-touch-icon">


<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
	rel="stylesheet">

<!-- Vendor CSS Files -->
<link href="assets/vendor/bootstrap-icons/bootstrap-icons.css"
	rel="stylesheet">
<link href="assets/vendor/boxicons/css/boxicons.min.css"
	rel="stylesheet">
<link href="assets/vendor/glightbox/css/glightbox.min.css"
	rel="stylesheet">
<link href="assets/vendor/remixicon/remixicon.css" rel="stylesheet">
<link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">




<style type="text/css">
h1 {
	color: green;
}

.xyz {
	background-size: auto;
	text-align: center;
	padding-top: 100px;
}

.btn-circle.btn-sm {
	width: 30px;
	height: 30px;
	padding: 6px 0px;
	border-radius: 15px;
	font-size: 8px;
	text-align: center;
}

.btn-circle.btn-md {
	width: 50px;
	height: 50px;
	padding: 7px 10px;
	border-radius: 25px;
	font-size: 10px;
	text-align: center;
}

.btn-circle.btn-xl {
	width: 70px;
	height: 70px;
	padding: 10px 16px;
	border-radius: 35px;
	font-size: 12px;
	text-align: center;
}

.dropdown:hover>.dropdown-menu {
	display: block;
}

.dropdown>.dropdown-toggle:active {
	/*Without this, clicking will make it sticky*/
	pointer-events: none;
}
</style>

<!-- Ajax libs -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.3.2/jquery-migrate.min.js"></script> --> 

<!-- <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
<script src="https://code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
<link href="https://code.jquery.com/ui/1.10.4/themes/ui-lightness/jquery-ui.css" rel="stylesheet"> -->


</head>

<body>
	  

	<c:set var="lang" value="${param.lang}" />

	<c:if test="${empty fn:trim(lang)}">
		<c:set var="lang" value="${'en'}" />
	</c:if>

	<script>
		function getval(sel) {
			window.location.replace('?lang=' + sel.value);
		}

		$(document).ready(function() {
			var originalSize = $('div').css('font-size');
			// reset        
			$(".resetMe").click(function() {
				$('div').css('font-size', originalSize);
			});

			// Increase Font Size          
			$(".increase").click(function() {
				var currentSize = $('div').css('font-size');
				var currentSize = parseFloat(currentSize) * 1.2;
				$('div').css('font-size', currentSize);
				return false;
			});

			// Decrease Font Size       
			$(".decrease").click(function() {
				var currentFontSize = $('div').css('font-size');
				var currentSize = $('div').css('font-size');
				var currentSize = parseFloat(currentSize) * 0.8;
				$('div').css('font-size', currentSize);
				return false;
			});
		});
	</script>


	<header>
		<div class="header-top">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 col-md-12 col-sm-12 col-6 header-top-left">
						<ul class="top-nav">
							<li><a data-toggle="tooltip" title="Visit contact page"
								href="/iirr/contact"><span class="lnr lnr-phone"></span><span
									class="cont-show"></span> Contact</a></li>
							<li><a href="" data-toggle="tooltip" data-placement="bottom"
								title="IIRR Sitemap"> <i class="bi bi-diagram-3"></i> <span>
										Sitemap</span></a></li>
						</ul>
					</div>
					<div class="col-lg-6 col-md-12 col-sm-12 col-6 header-top-right">
						<ul class="top-nav">
							<li>
								<button data-toggle="tooltip" title="Increase font size"
									type="button" class="btn btn-light btn-circle btn-sm increase">
									<span style="font-size: 11px;">A<sup>+</sup></span>
								</button>
								<button data-toggle="tooltip" title="Reset font size"
									type="button" class="btn btn-light btn-circle btn-sm resetMe">
									<span style="font-size: 11px;">A<sup>=</sup></span>
								</button>
								<button data-toggle="tooltip" title="Decrease font size"
									type="button" class="btn btn-light btn-circle btn-sm decrease">
									<span style="font-size: 11px;">A<sup>-</sup></span>
								</button>
								<button data-toggle="tooltip" title="High contrast"
									type="button" class="btn btn-dark btn-circle btn-sm dark">
									<span style="font-size: 11px; color: #fff600;">A</span>
								</button>
								<button data-toggle="tooltip" title="Normal contrast"
									type="button" class="btn btn-dark btn-circle btn-sm light"
									style="display: none;">
									<span style="font-size: 11px; color: #fff600;">A</span>
								</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="logo-wrap atari-banner">
			<div class="container">
				<div class="row justify-content-between align-items-center">
					<div class="col-md-1 col-sm-1 text-*-left icarimage">
						<a href="http://localhost" title="Home" rel="home" class="sw-logo">
							<img src="img/logos/iirr-logo.png" alt="IIRR logo"
							class="img-fluid">
						</a>
					</div>
					<div class="col-md-10 col-sm-12" style="text-align: center;">
						<span class="heading5" style="color: #ad1244e0;">Rice Pest
							Pheno - Forecasting Portal</span><br> <span
							style="color: #1c3387e0; font-size: 30px; text-transform: none;">Insect-Pest
							and Disease Forecasting and Decision Support Systems in Rice</span>
					</div>
					<div class="col-md-1 sblogo">
						<span style="float: right"> <a target="_blank" href="#"
							title="ICAR, External link"> <img
								src="img/logos/icarlogo.png" alt="Swachh Bharat"
								class="img-fluid" style="width: auto; height: 100px;">
						</a>
						</span>
					</div>
				</div>
			</div>
		</div>
		<!-- BEGIN main navigation -->
		<%@include file="menubar.jsp"%>
		<!-- END main navigation -->
	</header>

