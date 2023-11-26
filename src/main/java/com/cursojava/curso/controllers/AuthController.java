package com.cursojava.curso.controllers;

import com.cursojava.curso.dao.UserDao;
import com.cursojava.curso.models.User;
import com.cursojava.curso.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})

public class AuthController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public ResponseEntity<Object> login(@RequestBody User user, HttpServletResponse response) {
        User isUser = userDao.verifyCredentials(user);
        if (isUser != null) {
            String tokenJwt = jwtUtil.create(String.valueOf(isUser.getId()), isUser.getEmail());
            Cookie cookie = new Cookie("token", tokenJwt);
            cookie.setHttpOnly(true);
            response.addCookie(cookie);

            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "Authentication successful");
            successResponse.put("token", tokenJwt);

            return ResponseEntity.ok(successResponse);
        }

        // En caso de fallo de autenticación, devuelve un ResponseEntity con un mensaje de error.
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed. Invalid username or password.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
}
