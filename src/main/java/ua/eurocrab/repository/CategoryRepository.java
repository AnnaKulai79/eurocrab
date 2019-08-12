package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.CategoryEntity;

@Repository
public interface CategoryRepository extends JpaRepository <CategoryEntity,Long> {
    @Query("Select count(c) from categories c where c.type=?1")
    Long existsByType(String type);

    @Query(value = "SELECT * from categories where type=?1",nativeQuery = true)
    CategoryEntity findByType(String type);
}
