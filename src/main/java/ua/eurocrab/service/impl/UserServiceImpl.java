package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.UserDTO;
import ua.eurocrab.entity.UserEntity;
import ua.eurocrab.repository.UserRepository;
import ua.eurocrab.service.UserService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public void saveUser(UserDTO userDTO) {
        UserEntity user = modelMapper.map(userDTO, UserEntity.class);
        userRepository.save(user);
    }

    @Override
    public UserDTO checkUser(UserDTO userDTO) {
        List<UserEntity> usersWithSuchLoginOrMail = userRepository.findByLoginOrEmail(userDTO.getLogin());
        for(UserEntity u : usersWithSuchLoginOrMail) {
            if(passwordEncoder.matches(userDTO.getPass(), u.getPass())) {
                return modelMapper.map(u,UserDTO.class);
            }
        }
        return null;
    }

    @Override
    public UserDTO findUserById(Long id) {
        return modelMapper.map(userRepository.findById(id).get(), UserDTO.class);
    }

    @Override
    @Transactional
    public UserDTO updateUser(UserDTO userDTO) {
        return modelMapper.map(userRepository.save(modelMapper.map(userDTO, UserEntity.class)), UserDTO.class);
    }

    @Override
    public List<UserDTO> findAllUsers() {
        return modelMapper.mapAll(userRepository.findAll(), UserDTO.class);
    }
}
