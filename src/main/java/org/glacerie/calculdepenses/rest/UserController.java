package org.glacerie.calculdepenses.rest;

import org.glacerie.calculdepenses.dao.User;
import org.glacerie.calculdepenses.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    UserService userService;
    @PostMapping("/create")
    public User createUser(@RequestBody  User userDTO){

        return userService.createUser(userDTO);
    }
}
