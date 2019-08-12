package ua.eurocrab.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.eurocrab.domain.AdminDTO;
import ua.eurocrab.entity.AdminEntity;
import ua.eurocrab.repository.AdminRepository;
import ua.eurocrab.service.AdminService;
import ua.eurocrab.utils.ObjectMapperUtils;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ObjectMapperUtils modelMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public AdminEntity getOne(AdminDTO admin) {
        AdminEntity adminEntity = modelMapper.map(admin, AdminEntity.class);
        List<AdminEntity> adminRepositoryByLogin = adminRepository.findByLogin(adminEntity.getLogin());
        for (AdminEntity a : adminRepositoryByLogin) {
            if (passwordEncoder.matches(admin.getPass(), a.getPass())) {
                return a;
            }
//            if (admin.getPass().equals( a.getPass())) {
//                return a;
//            }
        }
        throw new IllegalArgumentException();
    }

    @Override
    public List<AdminDTO> findAllAdmins() {
        List<AdminEntity> admins = adminRepository.findAll();
        List<AdminDTO> adminDTOs = modelMapper.mapAll(admins, AdminDTO.class);
        return adminDTOs;
    }

    @Override
    public void saveAdmin(AdminDTO adminDTO) {
        AdminEntity admin = modelMapper.map(adminDTO, AdminEntity.class);
        adminRepository.save(admin);
    }

    @Override
    @Transactional
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public AdminDTO findAdminById(Long id) {
        return modelMapper.map(adminRepository.findById(id).get(),AdminDTO.class);
    }

    @Override
    @Transactional
    public AdminDTO updateAdmin(Long id, AdminDTO adminToUpdate) {
        boolean exists = adminRepository.existsById(id);
        if (!exists) {
            return null;
        }
        AdminEntity adminFromDB = modelMapper.map(adminToUpdate,AdminEntity.class);
        adminFromDB.setId(id);
        adminRepository.save(adminFromDB);

        AdminDTO admin = modelMapper.map(adminFromDB,AdminDTO.class);

        return admin;
    }

}
