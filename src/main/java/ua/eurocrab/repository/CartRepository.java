package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.CartEntity;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository <CartEntity,Long> {
    @Query(value = "SELECT * FROM cart WHERE ip=?2  AND products_id=?1", nativeQuery = true)
    CartEntity findAllByIdAndUser(Long idTovar, String ipUser);

    @Query(value = "SELECT COUNT(*) FROM cart WHERE ip=?2  AND products_id=?1", nativeQuery = true)
    Long countByIdAndUser(Long idTovar, String ipUser);

    @Query(value = "SELECT * FROM cart WHERE ip=?1", nativeQuery = true)
    List<CartEntity> findAllByUser(String ip);
}
