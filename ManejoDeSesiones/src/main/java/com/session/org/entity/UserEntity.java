/*
 * Fecha: 09-24-2019
 * @Jaime_Ramirez
 */
package com.session.org.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * The Class User.
 */
@Entity
@Table(name="users")
public class UserEntity implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The user name. */
	@Id
	@Column(name="user")
	private String user;
	
	/** The password. */
	@Column(name="password")
	private String password;
	
	/** The role. */
	@Column(name="role")	
	private String role;

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}



}
