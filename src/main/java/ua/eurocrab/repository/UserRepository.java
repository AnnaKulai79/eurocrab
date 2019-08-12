package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.UserEntity;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    @Query(value = "SELECT * FROM user WHERE (login=?1 OR email=?1)",nativeQuery = true)
//    @Query("Select u from user u where (u.login=:login OR u.email=:login)")
    List<UserEntity> findByLoginOrEmail(String login);
}
