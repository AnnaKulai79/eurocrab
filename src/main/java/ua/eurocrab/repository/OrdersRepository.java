package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.OrdersEntity;

import java.util.List;

@Repository
public interface OrdersRepository extends JpaRepository<OrdersEntity,Long> {
    @Query("Select o from orders o where o.email=?1")
    OrdersEntity existsByEmail(String email);

    @Query("Select COUNT(o) from orders o where o.email=?1")
    Long existsCountByEmail(String email);

    @Query("Select o from orders o where o.confirmed='1'")
    List<OrdersEntity> findAllConfirmed();

    @Query("Select o from orders o where o.confirmed='0'")
    List<OrdersEntity> findAllNoConfirmed();


//    @Query("SELECT o FROM OrdersEntity o inner join BuyProductsEntity b WHERE o.pay='accepted' AND o.id=b.orders.id")
//    List<OrdersEntity> findAllOrdersByBuyId();

}
