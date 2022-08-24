<%@ include file="header.jsp"%>

<link rel="stylesheet" href="https://openlayers.org/en/v6.4.3/css/ol.css" />
<script src="https://openlayers.org/en/v6.4.3/build/ol.js"></script>

<link rel="stylesheet" type="text/css" href="css/map.css">

<!-- Openlayers  -->
<link rel="stylesheet" type="text/css" href="ol/ol.css" />
<link rel="stylesheet" type="text/css" href="ol/ol.css.map" />
<link rel="stylesheet" type="text/css" href="layerswitcher/dist/ol-layerswitcher.css" />
	
<!-- ol-layerswitcher -->
<!-- <link rel="stylesheet" href="https://unpkg.com/ol-layerlist@1.1.8/src/ol-layerlist.css" />  -->
<link rel="stylesheet" href="https://unpkg.com/ol-layerswitcher@3.5.0/src/ol-layerswitcher.css" />
<script src="https://unpkg.com/ol-layerswitcher@3.5.0"></script>
<script src="https://unpkg.com/ol-layerlist@1.1.8"></script>


<link rel="stylesheet" href="https://code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>


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
										<li class="link home">application</li>
									</ol>
									<div class="clearfix"></div>
								</div>

								<div class="container">
									<div id="map" class="map">
										<div id="legend"></div>
									</div>
								</div>

								<form>
									<div class="row">
										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="inputPest">Pest</label> <select
													class="form-control" id="inputPest">
													<option value="SelectPest">-- Select Pest --</option>
													<option value="Bph"></option>
													<option value="Wbph"></option>
												</select>
											</div>
										</div>
										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="inputState">State</label> <select
													class="form-control" id="inputState"
													onchange="IIRR.getDist();">
													<option value="SelectState">-- Select State --</option>
													<option value="AP">AndhraPradesh</option>
													<option value="KA">Karnataka</option>
													<option value="PB">Punjab</option>
													<option value="TS">Telangana</option>
												</select>
											</div>
										</div>
										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="inputDistrict">District</label> <select
													class="form-control" id="inputDistrict"
													onchange="IIRR.getDistExtent();">
													<option value="0">-- Select District--</option>
												</select>
											</div>
										</div>

										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="inputParams">Parameters</label> <select
													class="form-control" id="inputParams">
													<option value="SelectPest">-- Select Parameters --</option>
													<option value="">Maximum Temperature</option>
													<option value="">Minimum Temperature</option>
													<option value="">Precipitation</option>
													<option value="">Relative Humidity</option>
													<option value="">Maximum Windspeed</option>
													<option value="">Minimum Windspeed</option>
												</select>
											</div>
										</div>
										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="from">From Date 
												<input type="text"
													name="date1" id="from" placeholder="Select From Date"
													class="form-control datepicker">
												</label>
											</div> 										
										</div>

										<div class="col-lg-2 col-md-3 col-sm-12">
											<div class="form-group">
												<label for="to">To Date
											<input type="text" name="date2" id="to" placeholder="Select To Date" class="form-control datepicker">
												</label>  
											</div>
										</div> 

									</div>
								</form>


							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</div>

<script>
  $( function() {
    var dateFormat = "dd/mm/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          changeYear : true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        changeYear : true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );
  </script>
<script src="js/extent.js"></script>
<script src="js/map.js"></script>
<script src="ol/ol.js"></script>
<script src="layerswitcher/dist/ol-layerswitcher.js"></script>
<script src="js/proj4.js"></script>
  



<%@ include file="footer.jsp"%>