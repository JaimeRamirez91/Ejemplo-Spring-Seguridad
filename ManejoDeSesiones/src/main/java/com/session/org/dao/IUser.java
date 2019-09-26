package com.session.org.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.security.core.userdetails.User;

import com.session.org.entity.UserEntity;

public interface IUser extends CrudRepository<UserEntity, String> {

	UserEntity findByUser(String userName);

}
