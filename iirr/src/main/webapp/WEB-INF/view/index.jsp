<style>
.carousel-wrapper {
	padding: 0px 0 0px 0px;
	background: url(img/bg-img/carousel-bg.png) repeat;
	border-top: 1px solid #d2d2d2;
	max-width: 100%;
	margin-top: 30px;
}
.carousel-inner {
height: 714px;
}  
.scroll-img {
	/* border: 1px solid red;
  width: 1550px;
  max-width: 100%; */
	height: 180px;
	overflow: hidden;
	font-size: 0;
}

.scroll-img ul {
	width: 1800px;
	height: 180px;
	margin: 0;
}

.scroll-img ul li {
	display: inline-block;
	margin: 10px 0 10px 10px;
}

.carousel-wrapper {
	padding: 0px 0 0px 0px;
	background: url(img/bg-img/carousel-bg.png) repeat;
	border-top: 1px solid #d2d2d2;
}

.break-section {
	background-color: #596a07 !important;
}
}
</style>


<%@include file="header.jsp"%>

<div id="carouselExampleIndicators" class="carousel slide"
	data-bs-ride="carousel">
	<div class="carousel-indicators">
		<button type="button" data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="0" class="active" aria-current="true"
			aria-label="Slide 1"></button>
		<button type="button" data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="1" aria-label="Slide 2"></button>
		<button type="button" data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="2" aria-label="Slide 3"></button>
		<button type="button" data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="3" aria-label="Slide 4"></button>
		<button type="button" data-bs-target="#carouselExampleIndicators"
			data-bs-slide-to="4" aria-label="Slide 5"></button>
	</div>
	<div class="carousel-inner">
		<div class="carousel-item active">
			<img src="img/bg-img/img-3.jpg" class="d-block w-100" alt="...">
		</div>
		<div class="carousel-item">
			<img src="img/bg-img/img-1.jpg" class="d-block w-100" alt="...">
		</div>
		<div class="carousel-item">
			<img src="img/bg-img/rice.jpg" class="d-block w-100" alt="...">
		</div>
		<div class="carousel-item">
			<img src="img/bg-img/img-5.jpg" class="d-block w-100" alt="...">
		</div>
		<div class="carousel-item">
			<img src="img/bg-img/img-4.jpg" class="d-block w-100" alt="...">
		</div>
	</div>
	<button class="carousel-control-prev" type="button"
		data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
		<span class="carousel-control-prev-icon" aria-hidden="true"></span> <span
			class="visually-hidden">Previous</span>
	</button>
	<button class="carousel-control-next" type="button"
		data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
		<span class="carousel-control-next-icon" aria-hidden="true"></span> <span
			class="visually-hidden">Next</span>
	</button>
</div>


<div class="site-main-container">
	<div class="latest-post-area">
		<div class="container no-padding">
			<div class="row">
				<div class="col-12 bg-dark2">
					<marquee data-aos="zoom-in" direction="left" scrollamount="4"
						onmouseover="this.stop();" onmouseout="this.start();"
						class="aos-init aos-animate">
						<div class="scroll">
							<p>
								<a href="" target="_blank" style="color: white;">Welcome to
									IIRR (Rice Pest Pheno - Forecasting Portal)</a>
							</p>
						</div>
					</marquee>
				</div>
			</div>
		</div>
	</div>
</div>


<div class="site-main-container">
	<section class="latest-post-area pb-120">
		<div class="container no-padding">
			<div class="row">
				<div class="col-sm-12 post-list">
					<div class="col-lg-12 pt-10">
						<div class="row">
							<!-- <div class="col-lg-8 col-sm-8 post-class">
								<div class="relavent-story-post-wrap">
									<div class="page-header title-head">
										<div class="float-start">
											<h4 class="title text-left"></h4>
										</div>
										<div class="float-end">
											<h6 class="title1 text-right">
												<a href="#">View More</a>
											</h6>
										</div>
										<div class="clearfix"></div>
									</div>
									<div class="relavent-story-list-wrap">
										<div class="single-relavent-post row align-items-center">
											<div class="col-lg-12 box1">
												<div class="row ">
													<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
														<p class="rtejustify"></p>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div> -->
							<div class="col-lg-12 ">
								<div class="sidebars-area relavent-story-post-wrap">
									<div class="col-lg-12 top-post-right">
										<section class="feature4">
											<ul class="nav nav-tabs news-tabs" id="myTab" role="tablist">
												<li class="nav-item" role="presentation"><a
													class="nav-link active" id="home-tab" data-bs-toggle="tab"
													href="#home" role="tab" aria-controls="home"
													aria-selected="true">News</a></li>
												<li class="nav-item" role="presentation"><a
													class="nav-link" id="profile-tab" data-bs-toggle="tab"
													href="#profile" role="tab" aria-controls="profile"
													aria-selected="false">Events</a></li>
												<li class="nav-item" role="presentation"><a
													class="nav-link" id="contact-tab" data-bs-toggle="tab"
													href="#contact" role="tab" aria-controls="contact"
													aria-selected="false">Press Release</a></li>
											</ul>
										</section>
										<section>
											<div class="tab-content" id="myTabContent"
												style="margin-top: 15px; margin-bottom: 15px;">
												<div class="tab-pane fade show active" id="home"
													role="tabpanel" aria-labelledby="home-tab">
													<div id="marquee1" class="mar"
														onmouseover="zxcMarquee.scroll('marquee1',0);"
														onmouseout="zxcMarquee.scroll('marquee1',-1);"
														style="position: relative; height: 380px; overflow: hidden;">
														<div
															style="position: absolute; width: 100%; padding: 5px; top: 450px; height: 450px; left: 0px;">
															<p class="excert1">
																<a
																	href="https://www.icar-iirr.org/Lockdown%20circular%20w.e.f%2012.5.2021...pdf">
																	<!-- organized on 02/07/2020 --> COVID-19 circulars
																</a>
															</p>
															<hr class="style3">
															<p class="excert1">
																<a
																	href="news/kvknews_virtual_annualzonal_workshop_atarihyderabad.pdf?lang=en">
																	<!-- organized on 02/07/2020 --> Virtual 56 ARGM
																	Entomology Group Meeting 8 April, 2021, Hyderabad
																</a>
															</p>
															<hr class="style3">
															<p class="excert1">
																<a href="news/online_inaguration_dg.pdf?lang=en"> <!-- organized on 02/07/2020 -->
																	Development of Decision Support System for the
																	Management of Rice Leaf Folder, Cnaphalocrocis
																	medinalis Guenee, DRR, Hyderabad
																</a>
															</p>
															<hr class="style3">
														</div>
													</div>
												</div>
												<div class="tab-pane fade" id="profile" role="tabpanel"
													aria-labelledby="profile-tab">No Information
													found............</div>
												<div class="tab-pane fade" id="contact" role="tabpanel"
													aria-labelledby="contact-tab">No Information
													found.............</div>
											</div>
										</section>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>





<div class="container-fluid p-1 my-1 bg-secondary text-primary">
	<h3 class="title text-center">Crop Pest DSS-Partners</h3>
	<div class="container">
		<div class="row">
			<div class="col-sm-12"></div>
		</div>
	</div>
</div>


<!-- ======= Clients Section ======= -->
<section id="clients"
	class="clients clients align-items-center justify-content-center ">
	<div class="container">
		<div class="row">
			<div class="mt-30 clients-slider swiper-container">
				<div class="swiper-wrapper align-items-center">
					<div class="swiper-slide">
						<a href="http://crida.in" target="_BLANK"><img
							class="img-fluid" src="img/gov-img/crida.png" alt="CRIDA"
							title="CRIDA"></a>
					</div>
					<div class="swiper-slide">
						<a href="http://www.drricrar.org" target="_BLANK"><img
							class="img-fluid" src="img/gov-img/iirr.png"
							alt="Directorate Of Rice Research"
							title="Directorate Of Rice Research"></a>
					</div>
					<div class="swiper-slide">
						<a href="http://www.ncipm.org.in/" target="_BLANK"><img
							class="img-fluid" src="img/gov-img/ncipm.png"
							alt="National Centre For Integrated Pest Management"
							title="NICPM"></a>
					</div>
					<div class="swiper-slide">
						<a href="http://www.sac.gov.in" target="_BLANK"><img
							class="img-fluid" src="img/gov-img/sac.png"
							alt="Space Application Centre" title="SAC"></a>
					</div>
					<div class="swiper-slide">
						<a href="http://agricoop.gov.in ?lang=en" target="_BLANK"><img
							class="img-fluid" src="img/gov-img/logo_swach.jpg"
							alt="150 Years of Celebrating Mahatma Gandhi"
							title="150 Years of Celebrating Mahatma Gandhi"></a>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</section>
<!-- End Clients Section -->




<!-- BEGIN PAGE LEVEL PLUGINS -->

<script>
	var zxcMarquee = {
		init : function(o) {
			var mde = o.Mode, mde = typeof (mde) == 'string'
					&& mde.charAt(0).toUpperCase() == 'H' ? [ 'left',
					'offsetWidth', 'top', 'width' ] : [ 'top', 'offsetHeight',
					'left', 'height' ], id = o.ID, srt = o.StartDelay, ud = o.StartDirection, p = document
					.getElementById(id), obj = p.getElementsByTagName('DIV')[0], sz = obj[mde[1]], clone;
			p.style.overflow = 'hidden';
			obj.style.position = 'absolute';
			obj.style[mde[0]] = '0px';
			obj.style[mde[3]] = sz + 'px';
			clone = obj.cloneNode(true);
			clone.style[mde[0]] = sz + 'px';
			clone.style[mde[2]] = '0px';
			obj.appendChild(clone);
			o = this['zxc' + id] = {
				obj : obj,
				mde : mde[0],
				sz : sz
			}
			if (typeof (srt) == 'number') {
				o.dly = setTimeout(function() {
					zxcMarquee.scroll(id, typeof (ud) == 'number' ? ud : -1);
				}, srt);
			} else {
				this.scroll(id, 0)
			}
		},

		scroll : function(id, ud) {
			var oop = this, o = this['zxc' + id], p;
			if (o) {
				ud = typeof (ud) == 'number' ? ud : 0;
				clearTimeout(o.dly);
				p = parseInt(o.obj.style[o.mde]) + ud;
				if ((ud > 0 && p > 0) || (ud < 0 && p < -o.sz)) {
					p += o.sz * (ud > 0 ? -1 : 1);
				}
				o.obj.style[o.mde] = p + 'px';
				o.dly = setTimeout(function() {
					oop.scroll(id, ud);
				}, 30);
			}
		}
	}
	function init() {

		zxcMarquee.init({
			ID : 'marquee1', // the unique ID name of the parent DIV.                        (string)
			Mode : 'Vertical', //(optional) the mode of execution, 'Vertical' or 'Horizontal'. (string, default = 'Vertical')
			StartDelay : 2000, //(optional) the auto start delay in milli seconds'.            (number, default = no auto start)
			StartDirection : -1
		//(optional) the auto start scroll direction'.                  (number, default = -1)
		});

	}
	if (window.addEventListener)
		window.addEventListener("load", init, false)
	else if (window.attachEvent)
		window.attachEvent("onload", init)
	else if (document.getElementById)
		window.onload = init
</script>

<%@include file="footer.jsp"%>

<script
	src="https://cdn.jsdelivr.net/gh/wmh/jquery-scrollbox@1.4.2/jquery.scrollbox.min.js"></script>

<script>
	if ($(window).width() < 575) {
		console.log($(window).width());
		$('.img-s').removeClass('img-s');
	}

</script>

</body>
</html>