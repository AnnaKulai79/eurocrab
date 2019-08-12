package ua.eurocrab.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ua.eurocrab.domain.AdminDTO;
import ua.eurocrab.entity.AdminEntity;
import ua.eurocrab.security.TokenUtils.TokenTool;
import ua.eurocrab.service.AdminService;
import ua.eurocrab.utils.ObjectMapperUtils;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin
public class AdminController {

    private static final Logger logger = LogManager.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Autowired
    private TokenTool tokenTool;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/administrators")
    public ResponseEntity<?> findAllAdmins() {
        List<AdminDTO> adminDTOs = adminService.findAllAdmins();
        if (adminDTOs.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(adminDTOs, HttpStatus.OK);
    }

    @GetMapping("/administrator/{id}")
    public ResponseEntity<?> findAdminById(@PathVariable("id") Long id) {
        AdminDTO admin = adminService.findAdminById(id);
        return new ResponseEntity<>(admin, HttpStatus.OK);
    }

    @PostMapping("administrator")
    public ResponseEntity<?> saveAdmin(@RequestBody AdminDTO adminDTO) {
        String oldNotHashedPassword = adminDTO.getPass();
        String newHashedPassword =
                passwordEncoder.encode(oldNotHashedPassword);
        adminDTO.setPass(newHashedPassword);

        adminService.saveAdmin(adminDTO);
        logger.info("Admin was saved");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @RequestMapping(value = "/loginadmin", method = RequestMethod.POST)
    public String login(@RequestBody AdminDTO admin) throws Exception {
        AdminEntity admin1 = adminService.getOne(admin);
        if (admin1 == null) {
            throw new Exception("User with such creds doesn't exists");
        }
        return tokenTool.createToken(admin1.getLogin(), admin1.getRole().name());
    }

    @DeleteMapping(value = "/administrator/{id}")
    public boolean deleteAdmin(@PathVariable("id") Long id) {
        adminService.deleteAdmin(id);
        return true;
    }

    @PutMapping("/administrator/{id}")
    public ResponseEntity<?> updateAdmin(@PathVariable("id") Long id, @RequestBody AdminDTO adminDTO) {
        String oldNotHashedPassword = adminDTO.getPass();
        String newHashedPassword =
                passwordEncoder.encode(oldNotHashedPassword);
        adminDTO.setPass(newHashedPassword);
        AdminDTO admin = adminService.updateAdmin(id,adminDTO);
        if (admin==null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(admin,HttpStatus.OK);
    }
}
