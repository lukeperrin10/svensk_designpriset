<?
	// =======================================================================// 
	// Settings                 
	// =======================================================================//  

	/*error_reporting(E_ALL ^ E_NOTICE); 
	ini_set("display_errors","1");*/ 
	
	$_CFG['debug_mode'] = false;	// Affects target email


	// =======================================================================// 
	// Globals                 
	// =======================================================================//  

	$q = $_SERVER['SERVER_NAME'];
	
	switch ($q) {
		
		// case "localhost" :
		// 	// Dev
		// 	$_CFG['host'] = "localhost";
		// 	$_CFG['user'] = "root";
		// 	$_CFG['password'] = "root";
		// 	$_CFG['database'] = "ffda_designpriset";
		// 	$_CFG['site_url'] = "http://localhost:8888/svdp";
		// break;

		case "localhost":
			$_CFG['host'] = "localhost:3306";
			$_CFG['user'] = "wopii";
			$_CFG['password'] = "secret";
			$_CFG['database'] = "designpriset";
			$_CFG['site_url'] = "http://localhost:8011/clone";
		break;

		// default :
		// 	$_CFG['host'] = "localhost";
		// 	$_CFG['user'] = "despri_new";
		// 	$_CFG['password'] = "dKghik";
		// 	$_CFG['database'] = "despri_new";
		// 	$_CFG['site_url'] = "http://www.designpriset.se";
		// break;
		default:
			$_CFG['host'] = "mysql";
			$_CFG['user'] = "wopii";
			$_CFG['password'] = "secret";
			$_CFG['database'] = "designpriset";
			$_CFG['site_url'] = "http://localhost:8011/clone";
		break;
	}

	if ( dirname($_SERVER['REQUEST_URI']) == "/dev" ) {
		$_CFG['site_url'] = "http://www.designpriset.se/dev";
	}


	// =======================================================================// 
	// Content settings                 
	// =======================================================================//  

	$THIS_YEAR = "2018";
	
	$SIDEBAR_SPLASH_YEAR = "2018";
	$FAS1_END_DATE = "2018-06-16"; // Date when closed (day after last day) - used by anmalan.php
	$FAS3_START_DATE = "2018-09-03"; // Date when vote starts - used by rostning.php
	$FAS5_START_TIME = "2018-10-25 21:00";
	$FINAL_DATE = "2018-10-25";
	$_CFG['pris_per_bidrag'] = 3995;
	$AWARD_PLACE = "Berns - i Stockholm"; // Place where award ceremony will be held

	// Important date titles
	// Fas 1 
	$register_deadline_date = "15 juni";
	// Fas 2 - Nominee part
	$final_date = "25 oktober";
	$vote_start_date = "3 september";
	$press_date = "29 augusti";
	$last_change_date = "30 augusti";

	// Fas 3 + 4 Vote part + winner part
	$vote_page_readonly_mode = false;

	// Winner gallery
	$CURRENT_WINNER_GALLERY_YEAR = (date('Y-m-d H') > '2018-10-25 22') ?  '2018' : "2017";
	$WINNER_GALLERY_PREVIEW_CODE = "5235457274184363635234";

	// =======================================================================// 
	// Email settings                 
	// =======================================================================//  

	$_CFG['email_from']        	= "no-reply@designpriset.se";
	$_CFG['email_designpriset']	= "designpriset@gmail.com";
	$_CFG['email_admin'] 		= null;
	$_CFG['email_debug'] 		= "j@fullyflared.se";

	if( $_CFG['debug_mode'] == true ) {

		$_CFG['email_designpriset'] = $_CFG['email_debug'];
	}
?>