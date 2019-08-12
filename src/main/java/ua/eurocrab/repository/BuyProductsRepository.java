package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.BuyProductsEntity;

import java.util.List;

@Repository
public interface BuyProductsRepository extends JpaRepository<BuyProductsEntity,Long> {
    @Query(value = "SELECT * FROM buy_products WHERE orders_id=?1",nativeQuery = true)
    List<BuyProductsEntity> findAllByOrderId(Long id);

    @Query(value = "SELECT * FROM buy_products ORDER BY products_id ASC",nativeQuery = true)
    List<BuyProductsEntity> findAllSortByProductId();
}
