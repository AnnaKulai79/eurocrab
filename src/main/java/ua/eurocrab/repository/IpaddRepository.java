package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.IpaddEntity;

import java.util.List;

@Repository
public interface IpaddRepository extends JpaRepository<IpaddEntity,Long> {
    IpaddEntity findAllByIp(String ipadd);

    @Query("Select count(c) from ipadd c where c.ip=?1")
    int findCountAllByIp(String ipadd);
}
