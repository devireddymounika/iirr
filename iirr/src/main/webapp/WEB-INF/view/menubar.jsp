<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<div class="container-fluid main-menu" id="main-menu">
	<div class="container" id="main-menu">
		<div class="row align-items-center justify-content-between">
			<nav id="navbar" class="navbar">
				<ul class="nav">
					<li class="nav__item"><a class="nav__link active" href="index">HOME</a></li>
					<li class="dropdown nav__item"><a class="nav__link" href="#"><span>About Us</span> <i class="bi bi-chevron-down"></i></a>
						<ul class="nav">
							<li><a class="nav__link" href="#">Objectives</a></li>
							
						</ul>
					</li>
					<li class="nav__item"><a class="nav__link" href="insectpests">Insectpests</a></li>																
					<li class="nav__item"><a class="nav__link" href="#">Diseases</a></li>
					<li class="nav__item"><a class="nav__link" href="#">Weeds</a></li>
					<li class="dropdown nav__item"><a class="nav__link" href="#"><span>Forecasting</span><i class="bi bi-chevron-down"></i></a>
					<ul>
						<li class="nav__item"><a class="nav__link" href="app">Thermal Maps</a></li>
						<li class="nav__item"><a class="nav__link" href="">Pheno-Forecast Maps</a></li>
						
					</ul>
					</li>
					<li class="nav__item"><a class="nav__link" href="team">Team</a></li>
					<li class="nav__item"><a class="nav__link" href="#">Publications</a></li>
					<!-- <li class="dropdown"><a href="#"><span>Maps</span> <i class="bi bi-chevron-down"></i></a>
					<ul>
						<li><a href="#">Thermal Maps</a></li>
						<li><a href="#">Pheno-Forecast Maps</a></li>
						</ul>
						</li> -->
					<li class="nav__item"><a class="nav__link" href="login">Login</a></li>
					<li class="nav__item"><a class="nav__link" href="contact">Contact</a></li>
				</ul>
				<i class="bi bi-list mobile-nav-toggle"></i>
			</nav>

			
			<div class="navbar-right"></div>
		</div>
	</div>
</div> 

<!-- <script>
$('.nav>li').click(function(){
    $('.active').toggleClass("active");
    $(this).toggleClass("active");
})
</script> -->

<script>
document.addEventListener('DOMContentLoaded', function() {
	const selector = '.nav__link';
	const elems = Array.from( document.querySelectorAll( selector ) );
	const navigation = document.querySelector( 'nav' );

	function makeActive( evt ) {
	  const target = evt.target;
	  
	  if ( !target || !target.matches( selector ) ) {
	    return;
	  }
	  
	  elems.forEach( elem => elem.classList.remove( 'active' ) );
	    
	    evt.target.classList.add( 'active' );
	};

	navigation.addEventListener( 'mousedown', makeActive );

	} );
</script>
<script>

	$(document).ready(function() {
		/* $('.navbar li a').click(function() {
			alert("hello");
			$(this).addClass('active').siblings().removeClass('active');
		}); */
		
		/* $('.navbar li a').load(function() {
			alert("hello");
			$(this).addClass('active').siblings().removeClass('active');
		}); */
		
		$(".navbar li:eq(0) a").addClass('active').siblings().removeClass('active');
		
		/* $('.navbar li a').addClass('active').siblings().removeClass('active');
		alert("hello"); */

		
		/* $('.navbar').on('click', 'a', function() {
			$('.navbar a.active').removeClass('active');
			$(this).addClass('active');
			alert("hello");
		}); */
	});
</script>
