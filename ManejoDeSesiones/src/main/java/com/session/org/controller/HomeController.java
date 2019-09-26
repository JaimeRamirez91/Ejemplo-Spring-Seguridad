/*
 * Fecha: 09-23-2019
 * @Jaime_Ramirez
 */
package com.session.org.controller;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
// TODO: Auto-generated Javadoc
/**
 * The Class EmpleadoPerfilController.
 */
@Controller
public class HomeController {

	/**
	 * Home.
	 *
	 * @return the string
	 */
	@GetMapping(value = "/")
	public String home() { 
		return "administration/index";

	}
	
	/**
	 * Login.
	 *
	 * @param model the model
	 * @param principal the principal
	 * @param flash the flash
	 * @param logout the logout
	 * @return the string
	 */
	@GetMapping(value = {"/login"} )
	public String login(Model model, Principal principal, RedirectAttributes flash,@RequestParam(value="logout", required = false) String logout) { 
		if(principal != null) {
			flash.addFlashAttribute("Info","La sesión ya esta iniciada");
			return "redirect:/";
		}
		return "administration/login";

	}

	/**
	 * Logout page.
	 *
	 * @param request the request
	 * @param response the response
	 * @return the string
	 */
	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/login?logout=true";
	}

}
