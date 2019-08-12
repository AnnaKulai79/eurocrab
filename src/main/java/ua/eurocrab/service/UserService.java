package ua.eurocrab.service;

import ua.eurocrab.domain.UserDTO;

import java.util.List;

public interface UserService {
    void saveUser(UserDTO userDTO);

    UserDTO checkUser(UserDTO userDTO);

    UserDTO findUserById(Long id);

    UserDTO updateUser(UserDTO userDTO);

    List<UserDTO> findAllUsers();
}

