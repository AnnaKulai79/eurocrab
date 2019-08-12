package ua.eurocrab.service;

import ua.eurocrab.domain.AdminDTO;
import ua.eurocrab.entity.AdminEntity;

import java.util.List;

public interface AdminService {
    AdminEntity getOne(AdminDTO admin);

    List<AdminDTO> findAllAdmins();

    void saveAdmin(AdminDTO adminDTO);

    void deleteAdmin(Long id);

    AdminDTO findAdminById(Long id);

    AdminDTO updateAdmin(Long id, AdminDTO adminDTO);

}
