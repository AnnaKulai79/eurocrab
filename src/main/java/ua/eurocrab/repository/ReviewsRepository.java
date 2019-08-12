package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.ProductsEntity;
import ua.eurocrab.entity.ReviewsEntity;

import java.util.List;

@Repository
public interface ReviewsRepository extends JpaRepository<ReviewsEntity,Long> {
    @Query("Select r from reviews r where r.products=?1")
    List<ReviewsEntity> findAllByProductId(ProductsEntity product);
}
