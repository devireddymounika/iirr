package com.iirr.app.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class IndexController {

	// inject via application.properties
	//@Value("${welcome.message:test}")
	//private String message = "Hello World";
	
	@RequestMapping(value = { "/", "/locale" }, method = RequestMethod.GET)
    public String home(Map<String, Object> model,
    		@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
        model.put("lang", locale);
        return "index";
    }
	
	@RequestMapping("/index") 
	public String index(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "index";
	}
	
	@RequestMapping("/sitemap") 
	public String sitemap(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "sitemap";
	}
	
	@RequestMapping("/about") 
	public String about(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "about";
	}
	
	@RequestMapping("/insectpests") 
	public String insectpests(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "insectpests";
	}
	
	@RequestMapping("/insectpest2") 
	public String insectpest2(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "insectpest2";
	}
	
	@RequestMapping("/bph") 
	public String bph(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "bph";
	}
	
	@RequestMapping("/wbph") 
	public String wbph(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "wbph";
	}
	
	@RequestMapping("/stemborer") 
	public String stemborer(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "stemborer";
	}
	
	@RequestMapping("/leaffolder") 
	public String leaffolder(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "leaffolder";
	}
	
	@RequestMapping("/gallmidge") 
	public String gallmidge(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "gallmidge";
	}
	
	@RequestMapping("/gundhibug") 
	public String gundhibug(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "gundhibug";
	}
	
	@RequestMapping("/ricehispa") 
	public String ricehispa(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "ricehispa";
	}
	
	@RequestMapping("/caseworm") 
	public String caseworm(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "caseworm";
	}
	
	@RequestMapping("/cutworm") 
	public String cutworm(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "cutworm";
	}
	
	@RequestMapping("/paniclemite") 
	public String paniclemite(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "paniclemite";
	}
	
	@RequestMapping("/whorlmaggot") 
	public String whorlmaggot(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "whorlmaggot";
	}
	
	@RequestMapping("/mealybug") 
	public String mealybug(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "mealybug";
	}
	
	@RequestMapping("/leafhopper") 
	public String leafhopper(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "leafhopper";
	}
	
	@RequestMapping("/diseases") 
	public String diseases(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "diseases";
	}
	
	@RequestMapping("/weeds") 
	public String weeds(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "weeds";
	}
	
	@RequestMapping("/thermoforecasting") 
	public String thermoforecasting(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
		System.out.println();
	  model.put("lang", locale);
	  return "thermoforecasting";
	}
	
	
	
	@RequestMapping("/team") 
	public String team(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "team"; 
	}
	
	@RequestMapping("/publications") 
	public String publications(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "publications"; 
	}
	@RequestMapping("/maps") 
	public String maps(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "maps"; 
	}
	
	@RequestMapping("/login") 
	public String login(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "login"; 
	}
	
	@RequestMapping("/contact") 
	public String contact(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "contact"; 
	}
	
	@RequestMapping("/downloads") 
	public String downloads(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "downloads"; 
	}
	
	@RequestMapping("/app") 
	public String app(Map<String, Object> model,
			@RequestParam(value = "lang", required = false, defaultValue = "en") String locale,
    		HttpServletRequest request, HttpServletResponse response) {
	  model.put("lang", locale);
	  return "app"; 
	}
		
 
}