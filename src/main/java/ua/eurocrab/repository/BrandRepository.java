package ua.eurocrab.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.eurocrab.entity.BrandEntity;
import ua.eurocrab.entity.CategoryEntity;

import java.util.List;

@Repository
public interface BrandRepository extends JpaRepository<BrandEntity,Long> {
    @Query("Select v from brands v where v.categories=?1")
    List<BrandEntity> findAllByCategory(CategoryEntity category);

    @Query("Select count(b) from brands b where b.brand=?1 and b.categories=?2")
    Long existsByBrand(String brand, CategoryEntity categories);

    @Query("Select count(b) from brands b where b.categories=?1")
    Long existsByCategory(CategoryEntity categories);
}
