package org.glacerie.calculdepenses.repository;

import org.glacerie.calculdepenses.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String>{
    User findByUsername(String username);
}