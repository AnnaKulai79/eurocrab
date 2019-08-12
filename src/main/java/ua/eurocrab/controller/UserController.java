package ua.eurocrab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.UserDTO;
import ua.eurocrab.service.UserService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public ResponseEntity<?> findAllUsers() {
        List<UserDTO> users = userService.findAllUsers();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> findUserById(@PathVariable("id") Long id) {
        UserDTO users = userService.findUserById(id);
        return new ResponseEntity<>(users,HttpStatus.OK);
    }


    @PostMapping
    public ResponseEntity<?> saveUser(@RequestBody UserDTO userDTO) {
        String oldNotHashedPassword = userDTO.getPass();
        String newHashedPassword =
                passwordEncoder.encode(oldNotHashedPassword);
        userDTO.setPass(newHashedPassword);

        userService.saveUser(userDTO);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkUser(@RequestBody UserDTO userDTO) {
        UserDTO user = userService.checkUser(userDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserDTO userDTO) {
        String oldNotHashedPassword = userDTO.getPass();
        String newHashedPassword =
                passwordEncoder.encode(oldNotHashedPassword);
        userDTO.setPass(newHashedPassword);
        UserDTO user = userService.updateUser(userDTO);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
