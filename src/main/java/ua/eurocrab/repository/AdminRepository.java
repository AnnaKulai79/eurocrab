package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;
import ua.eurocrab.entity.AdminEntity;

import java.util.List;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity,Long> {
    @Query(value = "Select a from AdminEntity a where a.login=:login and a.pass=:pass")
    AdminEntity findByLoginAndPassword(@Param("login") String login, @Param("pass") String pass);

    @Query(value = "Select a from AdminEntity a where a.login=:login")
    List<AdminEntity> findByLogin(@Param("login") String login);
}
