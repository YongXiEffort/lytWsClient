/**
 * Created By: Comwave Project Team Created Date: 2014-4-30
 */
package com.lyt.wsclient.util;

import com.lyt.wsclient.domain.User;
import com.lyt.wsclient.model.UserDetail;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;


/**
 * The Class UserUtil.
 *
 * @author James
 * @version 1.0
 */
@Component("userUtils")
public class UserUtil {

	public static User getCurrUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		if (authentication instanceof AnonymousAuthenticationToken) {
			return null;
		}
		UserDetail userDetails = (UserDetail) authentication.getPrincipal();
		if (userDetails != null) {
			return userDetails.getUser();
		}
		return null;
	}

	public static UserDetail getCurrUserDetails() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		if (authentication instanceof AnonymousAuthenticationToken) {
			return null;
		}
		UserDetail userDetails = (UserDetail) authentication.getPrincipal();
		if (userDetails != null) {
			return userDetails;
		}
		return null;
	}
}





