<%@ include file="header.jsp"%>

<script>
      require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/widgets/TimeSlider",
        "esri/widgets/Expand",
        "esri/widgets/Legend"
      ], (Map, MapView, FeatureLayer, TimeSlider, Expand, Legend) => {
        const layer = new FeatureLayer({
          url: "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0"
        });

        const map = new Map({
          basemap: "hybrid",
          layers: [layer]
        });

        const view = new MapView({
          map: map,
          container: "viewDiv",
          zoom: 4,
          center: [-100, 30]
        });

        // time slider widget initialization
        const timeSlider = new TimeSlider({
          container: "timeSlider",
          view: view,
          timeVisible: true, // show the time stamps on the timeslider
          loop: true
        });

        // add the UI for a title
        view.ui.add("titleDiv", "top-right");

        view.whenLayerView(layer).then((lv) => {
          // around up the full time extent to full hour
          timeSlider.fullTimeExtent =
            layer.timeInfo.fullTimeExtent.expandTo("hours");
          timeSlider.stops = {
            interval: layer.timeInfo.interval
          };
        });

        const legend = new Legend({
          view: view
        });
        const legendExpand = new Expand({
          expandIconClass: "esri-icon-legend",
          expandTooltip: "Legend",
          view: view,
          content: legend,
          expanded: false
        });
        view.ui.add(legendExpand, "top-left");
      });
    </script>


<div class="site-main-container">
	<section class="latest-post-area pb-120">
		<div class="container no-padding">
			<div class="row">
				<div class="col-lg-12 col-md-12 col-sm-12 post-list">
					<div class="relavent-story-post-wrap pt-10">
						<div class="relavent-story-list-wrap">
							<div class="content-wrap" style="padding: 15px">
								<div class="page-title-content">
									<ol class="breadcrumb text-right">
										<li class="link home">Home</li>
										<li class="link home">Insectpests</li>
										<li class="active">BPH</li>
									</ol>
									<div class="clearfix"></div>
								</div>
								<div class="item item1">
									<div class="content pd_0px">
										<h2 class="margin-15px-bottom mn">
											Brown Planthopper (BPH),<i> Nilaparvata lugens (Stal.)</i>
										</h2>
									</div>
								</div>

								<!-- ======= Features Section ======= -->
								<section id="features" class="features">
									<div class="container" data-aos="fade-up">
										<!-- Feature Tabs -->
										<div class="row feture-tabs" data-aos="fade-up">
											<div class="col-lg-12 col-md-12">
												<!-- Tabs -->
												<ul class="nav nav-pills mb-3">
													<li><a class="nav-link active" data-bs-toggle="pill"
														href="#tab1">Life cycle </a></li>
													<li><a class="nav-link" data-bs-toggle="pill"
														href="#tab2">Symptoms of damage</a></li>
													<li><a class="nav-link" data-bs-toggle="pill"
														href="#tab3">Host - plant interaction</a></li>
													<li><a class="nav-link" data-bs-toggle="pill"
														href="#tab4">Distribution</a></li>
													<li><a class="nav-link" data-bs-toggle="pill"
														href="#tab5">Forecasting</a></li>
													<li><a class="nav-link" data-bs-toggle="pill"
														href="#tab6">IPM - strategies</a></li>
												</ul>
												<!-- End Tabs -->
												<!-- Tab Content -->
												<div class="tab-content">
													<div class="tab-pane fade show active" id="tab1">
														<div class="row">
															<div class="col-lg-12 col-sm-12  mt-4">
																<div class="row">

																	<div class="col-lg-5 col-md-4 col-sm-12"
																		style="text-align: center">
																		<img src="img/life cycles/bph.png"
																			class="img-responsive"
																			style="width: 100%; height: 100%;">
																		<h6 class="text-center"></h6>
																	</div>
																	<div class="col-lg-7 col-md-8 col-sm-12 content">
																		<ul class="pt-10">
																			<li><p>Adult planthoppers are dimorphic.
																					Winged (Macropterous form) as well as half winged
																					males and females (Brachypterous form) along with
																					wingless nymphs occur as mixed populations in
																					fields.</p></li>

																			<li><p>Macropterous forms are the first to
																					appear in the newly planted field and begin
																					colonization. They lay less number of eggs while
																					brachypterous females lay about 300-500 eggs. Eggs
																					are inserted in the tissue of the lower part of the
																					rice plant, mainly near midrib of leaf sheaths and
																					also in leaf blades. The eggs are covered with a
																					dome shaped egg plug secreted by the female. Only
																					the tips of eggs are seen on the plant surface.
																					Eggs are banana-shaped and newly laid eggs are
																					whitish; turn darker when about to hatch. Before
																					hatching, two distinct eye spots appear on the egg.
																					Egg period ranges between 7-11 days. The nymph has
																					triangular head with a narrow vertex. Its body is
																					creamy white with a pale brown tinge.</p></li>

																			<li><p>Nymphal period is generally completed
																					in 12-20 days with five nymphal instars. The
																					nymphal period varies depending on the food
																					conditions, density during development and the
																					prevailing temperature.</p></li>

																			<li><p>Adult BPH has brownish body varying
																					from light brown to dark brown. The adult survives
																					for 10 to 25 days. Thus, total life cycle is
																					completed in 29 - 56 days.</p></li>

																		</ul>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<!-- End Tab 1 Content -->

													<div class="tab-pane fade show" id="tab2">
														<div class="row">
															<div class="col-lg-12 col-sm-12  mt-4">
																<div class="row">
																	<div class="col-lg-4 col-md-4 col-sm-12"
																		style="text-align: center">
																		<img src="img/insectpest/bph.jpg"
																			class="img-thumbnail img-responsive"
																			style="width: 100%; height: 100%;">
																		<h6 class="text-center"></h6>
																	</div>
																	<div class="col-lg-8 col-md-8 col-sm-12 content">

																		<p>Both adults and nymphs suck the sap from the
																			base of the tillers, resulting in yellowing and
																			drying of the plants. At early stages, round yellow
																			patches appear which soon turn brownish due to drying
																			up of the plants. The patch of infestation spreads in
																			concentric circles within the field and in severe
																			cases the affected field gives a burnt appearance.
																			This condition is known as 'hopper burn' resulting in
																			100% crop loss. The hopper populations can multiply
																			very fast and migrate over long distances causing
																			widespread infestation in short time. Apart from
																			direct damage, BPH is also a vector of viral diseases
																			viz., grassy stunt, ragged stunt and wilted stunt.</p>

																	</div>
																</div>
															</div>
														</div>
													</div>
													<!-- End Tab 2 Content -->

													<div class="tab-pane fade show" id="tab3"></div>
													<!-- End Tab 3 Content -->

													<div class="tab-pane fade show" id="tab4">
														<div id="viewDiv"></div>
														<div id="timeSlider"></div>
														<div id="titleDiv" class="esri-widget">
															<div id="titleText">Precipitation forecast for next
																72 hours</div>
														</div>
													</div>
													<!-- End Tab 4 Content -->

													<div class="tab-pane fade show" id="tab5"></div>
													<!-- End Tab 5 Content -->

													<div class="tab-pane fade show" id="tab6"></div>
													<!-- End Tab 6 Content -->

												</div>
											</div>
										</div>
										<!-- End Feature Tabs -->
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>


<%@ include file="footer.jsp"%>